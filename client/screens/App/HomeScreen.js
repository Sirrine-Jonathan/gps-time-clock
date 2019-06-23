import React from "react";
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Platform, ScrollView, TouchableOpacity } from "react-native";
import { Constants, Location, Permissions } from 'expo';
import MapView from 'react-native-maps';
import Loading from '../../components/Loading';
import CButton from '../../components/CButton';
import FormDiv from '../../components/FormDiv';
import Timer from '../../components/Timer';
import { addPunch, initPunchedState } from '../../redux/actions/appActions';



class HomeScreen extends React.Component {

   static navigationOptions = {
      drawerLabel: 'Home'
   };

   state = {
       hasLocationPermissions: false,
       locationResult: null,
       lat: null,
       long: null,
       date: null,
       time: null,
   };

   componentWillMount() {
    this._getLocationAsync();
    console.log('HomeScreen mounted');
    console.log('calling initPunchedState');
    this.props.initPunchedState(); 
   }
   componentDidMount() {

   }

   _getLocationAsync = async() => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
         this.setState({
            locationResult: 'Permission to access location was denied',
         });
      } else {
         this.setState( {locationResult: JSON.stringify(location)});
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({ locationResult: JSON.stringify(location) });

      this.setState({lat: JSON.stringify(location.coords.latitude)});
      this.setState({long: JSON.stringify((location.coords.longitude))});

      // center the map
      this.setState({mapRegion: { latitude: location.coords.latitude , longitude:
      location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});

      return {
         lat: JSON.stringify(location.coords.latitude),
         long: JSON.stringify(location.coords.longitude)
      }
   };

   _togglePunch = async () => {
      let loc = await this._getLocationAsync();
      console.log('calling togglePunch in component');
      this.props.addPunch(loc);
   };

    render() {
      const user = this.props.user;
      let buttonText = (this.props.punchedIn) ? "Punch Out":"Punch In";    
      let lastPunch = this.props.lastPunch;
      let lastPunchTime = null;
      if (lastPunch)
        lastPunchTime = new Date(this.props.lastPunch).toLocaleString();
      else    
        lastPunchTime = "None found";

      return (
        <View style={styles.content}>
            <FormDiv>
              <Text> Welcome, { user.username }</Text>
              <Text> Email: { user.email }</Text>
              <Text> Last Punch: { lastPunchTime }</Text>
              <Text> { (user.isAdmin) ? "Employeer":"Employee"} at {user.company}</Text>
              <Text> Location: {this.state.lat}, {this.state.long} </Text>
              <Timer />
              <TouchableOpacity
                style={styles.punchBtn}
                onPress={this._togglePunch}
              >
                <Text>{ buttonText }</Text>
              </TouchableOpacity>
            </FormDiv>
            <MapView
                initialRegion={{
                    latitude: this.state.lat,
                    longitude: this.state.long,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
      );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {  
      addPunch: (punchedIn) => dispatch(addPunch(punchedIn)), 
      initPunchedState: () => dispatch(initPunchedState())
  }
}

const mapStateToProps = (state) => {
  return {
      logoutError: state.logoutError,
      user: state.user,
      punchedIn: state.punchedIn,
      lastPunch: state.lastPunch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  content: {
    marginTop: 25,
  },
  punchBtn: {
    fontSize: 3,
    borderWidth: 2,
    borderColor: "black",
    alignItems: 'center',
    padding: 10
  }
});