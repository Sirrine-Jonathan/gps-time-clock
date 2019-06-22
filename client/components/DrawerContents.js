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

   componentDidMount(){
    console.log(this.props.navigation);
    /*
    let links = {};
    let navLinks = this.props.navigation._childNavigation;
    for (let link in navLinks){
      if (link == "Admin"){
        if (this.props.user.isAdmin)
          links[link] = navLinks[link];
      } else {
        links[link] = navLinks[link];
      }
    }
    this.fakeProps = this.props;
    this.fakeProps.navigation.childNavigation = links;
    */
   }

   render() {
      return (
         <ScrollView>
            <SafeAreaView>
               <DrawerItems {...this.props} />
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