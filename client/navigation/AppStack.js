import React from 'react';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/App/HomeScreen';
import SettingsScreen from '../screens/App/SettingsScreen';
import ScreenHOC from '../screens/ScreenHOC';
import ReportsScreen from "../screens/App/ReportsScreen";
import AdminScreen from "../screens/App/AdminScreen";
import DrawerContents from "../components/DrawerContents";


let AppStack = createDrawerNavigator({ 
   Admin: ScreenHOC(AdminScreen, "Admin"),
   Home: ScreenHOC(HomeScreen, "GPS-Time-Clock"),
   Reports: ScreenHOC(ReportsScreen, "Reports"),
   Settings: ScreenHOC(SettingsScreen, "Settings")
},
{
   contentComponent: DrawerContents,
   drawerBackgroundColor: '#ffffff',
   drawerType: 'slide',
   edgeWidth: 90,
   initialRouteName: 'Home',
});

const AppNavigator = createAppContainer(AppStack);

export default AppNavigator;