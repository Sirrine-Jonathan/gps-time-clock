import React from 'react';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/App/HomeScreen';
import SettingsScreen from '../screens/App/SettingsScreen';
import ScreenHOC from '../screens/ScreenHOC';
import ReportsScreen from "../screens/App/ReportsScreen";
import AdminScreen from "../screens/App/AdminScreen";
import EmployeeReportScreen from '../screens/App/EmployeeReportScreen';
import DrawerContents from "../components/DrawerContents";
import { store } from '../redux/createStore';
import ExportCSV from "../screens/App/ExportCSV";


const getCompany = () => {
	const user = store.getState().user;
	let company = "Employees";
	if (user){
		company = user.company;
	}
	return company;
}

let AppStack = createDrawerNavigator({ 
   Home: ScreenHOC(HomeScreen, "GPS-Time-Clock"),
   History: ScreenHOC(ReportsScreen, "History"),
   Employees: ScreenHOC(AdminScreen, getCompany()),
   EmployeeHistory: ScreenHOC(EmployeeReportScreen, "Employee History"),
   Settings: ScreenHOC(SettingsScreen, "Settings"),
   ExportCSV: ScreenHOC(ExportCSV, "Export Hours")
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