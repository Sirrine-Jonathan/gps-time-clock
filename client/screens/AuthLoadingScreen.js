import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
    
    constructor(props){
        super(props);
        this._checkAuthAsync();
    }

    _checkAuthAsync = async () => {
        // get auth state from storage or something
        const userToken = false // start out not logged in for testing
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }

    render() {
        return (
          <View>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
          </View>
        );
    }
}