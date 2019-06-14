import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { DrawerItems} from 'react-navigation';
import CButton from './CButton';

import { logout } from '../redux/actions/authActions'

class DrawerContents extends React.Component {

   _logout = () => {
      this.props.logout();
   }

   render() {
      return (
         <ScrollView>
            <SafeAreaView>
               <Text>hey</Text>
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