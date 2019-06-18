import React from "react";
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Platform, ScrollView, TouchableOpacity } from "react-native";
import { Constants, Location, Permissions } from 'expo';
import MapView from 'react-native-maps';
import Loading from '../../components/Loading';


class HomeScreen extends React.Component {

   static navigationOptions = {
      drawerLabel: 'Home'
   };

   state = {
       punchedIn: false,
       hasLocationPermissions: false,
       locationResult: null,
       lat: null,
       long: null,
       date: null,
       time: null,
   };

   addPunch() {
       let url = null;
       if (this.state.punchedIn) {
           url = 'http://gps-time.herokuapp.com/time/addpunchin';
       } else {
           url = 'http://gps-time.herokuapp.com/time/addpunchout'
       }

       fetch(url, {
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               email: this.props.user.email,
               date: this.state.date,
               location: this.state.lat + ", " + this.state.long,
               time: this.state.time,
           }),
       }).then((response) => {
           console.log(response);
       });
   }

   componentDidMount() {
       this._getLocationAsync();
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
   };


    // this should be handled by a redux function at some point
   // the function should update a last db variable so
   // we can keep a count even when the user is logged out
   _stubTogglePunch = () => {
       let date = new Date();
       this.setState({
           punchedIn: !this.state.punchedIn,
           date: date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear(),
           time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
       }, () => {
           console.log(this.state.date);
           this.addPunch();
       });
   };


    render() {
      const user = this.props.user;
      const { punchedIn } = this.state;
      let buttonText = (punchedIn) ? "Punch Out":"Punch In";        
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
  return {}
}

const mapStateToProps = (state) => {
  return {
    logoutError: state.logoutError,
    user: state.user,
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