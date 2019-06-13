import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Avatar } from 'react-native-elements';
import CButton from './CButton';

import { logout } from '../redux/actions/authActions'

class DrawerContents extends React.Component {

   _logout = () => {
      this.props.logout();
   }

   render() {
      console.log('in drawerContents');
      return (
         <ScrollView>
            <SafeAreaView style={{ marginTop: 40}}>
               <View>
                 <Avatar 
                    rounded
                    icon={{ name: 'person', type: 'material'}}
                 />
               </View>
               <DrawerItems {...this.props} />
               <CButton onPress={this._logout} value="Logout" title="Logout" />
            </SafeAreaView>
         </ScrollView>
      )
   }
}

const styles = StyleSheet.create({
  
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  }
}

const mapStateToProps = (state) => {
  return {
    logoutError: state.logoutError,
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContents);