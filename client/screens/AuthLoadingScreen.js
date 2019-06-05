import React from "react";
import {
  StyleSheet,
  View,
  Text, 
  AsyncStorage
} from 'react-native';
export default class AuthLoadingScreen extends React.Component {

    state = {
        userID: null
    }

    constructor(props){
        super(props);
        this._checkAuthAsync();
    }

    _checkAuthAsync = async () => {
        const userID = this._getID();
        if (userID){
            this._handleLogin(userID);
        } else {
            this._handleLogout();
        }
    }

    _handleLogin = (userID) => {
        this._setID(userID);
        this.props.navigation.navigate('App', { 
            userID: userID,
            login: this._handleLogin,
            logout: this._handleLogout
        })
    }

    _handleLogout = () => {
        this._setID(null);
        this.props.navigation.navigate('Auth', {
            userID: null,
            login: this._handleLogin,
            logout: this._handleLogout
        })
    }

    _setID = async (id) => {
        this.setState({ userID: id })
        try {
            await AsyncStorage.setItem('@gps_time_clock_id', id);
        } catch (e) {
            console.log(e);
        }
    }

    _getID = async () => {
        try {
            const userID = await AsyncStorage.getItem('@gps_time_clock_id');
            this.setState({ userID });
            return userID;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    render() {
        return (
          <View>
            <Text>Loading</Text>
          </View>
        );
    }
}