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

   render(){
      // remove true and uncomment line after to restore production state
      let isAuthenticated = store.getState().userID;
      return (
         <Provider store={store}>
            {(isAuthenticated) ? <AppNavigator /> : <AuthNavigator />}
         </Provider>
      )
   }
}
