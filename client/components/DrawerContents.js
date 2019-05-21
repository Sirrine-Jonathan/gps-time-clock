import React from 'react';
import { ScrollView, Text, View} from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Avatar } from 'react-native-elements';
import CButton from './CButton';


export default class DrawerContents extends React.Component {

   _logout = () => {
      // logout user and this below should happen automatically
      this.props.navigation.navigate('Login');
   }

   render() {
      return (
         <ScrollView>
            <SafeAreaView style={{ marginTop: 40}}>
               <Avatar 
                  rounded
                  icon={{ name: 'person', type: 'material'}}
               />
               <DrawerItems {...this.props} />
               <CButton onPress={this._logout} value="Logout" title="Logout" />
            </SafeAreaView>
         </ScrollView>
      )
   }
}