import React from 'react';
import { View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/App/HomeScreen';
import SettingsScreen from '../screens/App/SettingsScreen';
import DrawerContents from '../components/DrawerContents';
import ScreenHOC from '../screens/ScreenHOC';





const AppStack = createDrawerNavigator({ 
   Home: ScreenHOC(HomeScreen), 
   Settings: ScreenHOC(SettingsScreen) 
},
{
   contentComponent: DrawerContents,
   drawerBackgroundColor: '#ffffff',
   drawerType: 'slide',
   edgeWidth: 80,
   initialRouteName: 'Home',
});

export default AppStack;