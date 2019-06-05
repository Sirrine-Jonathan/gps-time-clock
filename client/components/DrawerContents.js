import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View} from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Avatar } from 'react-native-elements';
import CButton from './CButton';

import { logout } from '../redux/actions/authActions'


class DrawerContents extends React.Component {

   _logout = () => {
      this.props.logout();
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

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  }
}

const mapStateToProps = (state) => {
  return {
    logoutError: state.logoutError,
    userID: state.userID,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContents);