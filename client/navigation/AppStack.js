import React from 'react';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/App/HomeScreen';
import SettingsScreen from '../screens/App/SettingsScreen';
import ScreenHOC from '../screens/ScreenHOC';
import ReportsScreen from "../screens/App/ReportsScreen";


let AppStack = createDrawerNavigator({ 
   Home: ScreenHOC(HomeScreen),
   Reports: ScreenHOC(ReportsScreen),
   Settings: ScreenHOC(SettingsScreen)
},
{
   //contentComponent: DrawerContents,
   drawerBackgroundColor: '#ffffff',
   drawerType: 'slide',
   edgeWidth: 90,
   initialRouteName: 'Home',
});

const AppNavigator = createAppContainer(AppStack);

export default AppNavigator;