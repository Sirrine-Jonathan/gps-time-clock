import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { DrawerItems, SafeAreaView} from 'react-navigation';
import CButton from './CButton';

import { logout } from '../redux/actions/authActions'

class DrawerContents extends React.Component {

   _logout = () => {
      this.props.logout();
   }

   render() {
      const clonedProps = {
        ...this.props,
        items: this.props.items.filter((item) => {
          if (this.props.user.isAdmin){
            return true;
          } else {
            if (item.key == "Admin")
              return false;
            else 
              return true;
          }
        })
      }
      return (
         <ScrollView style={styles.content}>
            <SafeAreaView>
               <DrawerItems {...clonedProps} />
            </SafeAreaView>
         </ScrollView>
      )
   }
}

const styles = StyleSheet.create({
  content: {
    marginTop: 25,
  }
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