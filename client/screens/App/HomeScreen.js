import React from "react";
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Platform, ScrollView, TouchableOpacity } from "react-native";
import { Constants, Location, Permissions } from 'expo';
import MapView from 'react-native-maps';
import Loading from '../../components/Loading';
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

   componentDidMount() {
       this._getLocationAsync();
       this.props.initPunchedState();
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

   // this should be handled by a redux function at some point
   // the function should update a last db variable so
   // we can keep a count even when the user is logged out
   _stubTogglePunch = async () => {
       let date = new Date();
       this.setState({
           date: date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear(),
           time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
       }, () => {
           console.log(this.state.date);
           let email = this.props.user.email;
           let loc = await this._getLocationAsync();
           this.props.addPunch(this.props.punchedIn, loc, email);
       });
   };

    render() {
      const user = this.props.user;
      let buttonText = (this.props.punchedIn) ? "Punch Out":"Punch In";        
      return (
        <View style={styles.content}>
            <Text> Welcome, { user.username }</Text>
            <Text> { (user.isAdmin) ? "Employeer":"Employee"} at {user.company}</Text>
            <Text> Location: {this.state.lat}, {this.state.long} </Text>
            <MapView
                initialRegion={{
                    latitude: this.state.lat,
                    longitude: this.state.long,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
            <TouchableOpacity
               style={styles.punchBtn}
               onPress={this._stubTogglePunch}
            >
            <Text>{ buttonText }</Text>
            </TouchableOpacity>
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