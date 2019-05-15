import React from 'react';
import { View, Button } from 'react-native';
import {NavigationActions} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/App/HomeScreen';
import SettingsScreen from '../screens/App/SettingsScreen';

class drawerContentComponents extends React.Component {

   _logout = () => {
      const navigateAction = NavigationActions.navigate({
         routeName: 'Login'
      })
      this.props.navigation.dispatch(navigateAction);
   }

   render() {
      return (
         <View>
            <Button onClick={_logout} value="Logout" />
         </View>
      )
   }
}

const AppStack = createDrawerNavigator({ 
   Home: HomeScreen, 
   Settings: SettingsScreen 
},
{
   contentComponent: drawerContentComponents
});

export default AppStack;