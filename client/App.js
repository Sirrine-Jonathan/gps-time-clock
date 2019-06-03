import React from "react";
import { View, AsyncStorage, Text } from "react-native";
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import AppNavigator from './navigation/AppStack';
import AuthNavigator from './navigation/AuthStack';
import { Provider } from 'react-redux';
import { store } from './redux/createStore';

const initialState = {};

export default class App extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
      this._checkAuthAsync();
    }

    _checkAuthAsync = async () => {
        const userID = this._getID();
        if (userID){
            this.setState({ isAuthenticated: true, isLoading: false })
        } else {
            this.setState({ isAuthenticated: false, isLoading: false })
        }
    }



   render(){
      let isAuthenticated = store.getState().userID;
      return (
         <Provider store={store}>
               {(isAuthenticated) ? <AppNavigator /> : <AuthNavigator />}
         </Provider>
      )
   }
}
