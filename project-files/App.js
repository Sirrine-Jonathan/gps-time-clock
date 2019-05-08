import React from 'react';
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
// https://reactnavigation.org/docs/en/stack-navigator.html      -- link to see more configuration
const AppDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Login: {
            screen: LoginScreen
        }
    },
    {
        initialRouteName: "Login"
    }
);

const AppContainer = createAppContainer(AppDrawerNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />
    }
}