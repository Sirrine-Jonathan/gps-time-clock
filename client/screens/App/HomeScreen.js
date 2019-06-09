import React from "react";
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Platform } from "react-native";
import { Constants, Location, Permissions, MapView } from 'expo';
import Loading from '../../components/Loading';

class HomeScreen extends React.Component {
   static navigationOptions = {
      drawerLabel: 'Home'
   };

   state = {
      location: null,
      errorMessage: null,
   }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

    render() {
         let { location } = this.state;
         console.log('location', location);

         let content = (<Loading />);
         if (this.state.errorMessage)
            content = (<Text>{this.state.errorMessage}</Text>);
         else if (location){
            content = (
               <View>
                  <Text>Map</Text>
                  <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                      latitude: 37.78825,
                      longitude: -122.4324,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  />
               </View>
            );
         }

         return (
            <View style={styles.content}>
               { content }
            </View>
         );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  }
}

const mapStateToProps = (state) => {
  return {
    logoutError: state.logoutError,
    userID: state.userID,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
   content: {
      marginTop: 20,
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
   }
});