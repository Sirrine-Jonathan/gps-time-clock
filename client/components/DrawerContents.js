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
          if (item.key == "EmployeeHistory"){
            return false;
          } else if (this.props.user.isAdmin){
            return true;
          } else {
            if (item.key == "Admin")
              return false;
            else 
              return true;
          }
        })
      }

      const { user } = this.props;


      return (
         <ScrollView style={styles.content}>
            <SafeAreaView>
               <View style={styles.userInfo}>
	               <Text style={styles.username}>{ user.username }</Text>
	               <Text style={styles.company}>{ user.company }</Text>
               </View>
               <DrawerItems {...clonedProps} />
               <View style={styles.buttonDiv}>
               		<CButton onPress={this._logout} title="Logout"/>
               </View>
            </SafeAreaView>
         </ScrollView>
      )
   }
}

const styles = StyleSheet.create({
  content: {
    marginTop: 25,
  },
  buttonDiv: {
  	flex: 1,
  	flexDirection: 'row',
  	justifyContent: 'center',
  },
  userInfo: {
  	flex: 1,
  	alignItems: 'center',
  	paddingTop: 10,
  	padding: 5,
  },
  username: {
  	fontSize: 25,
  },
  company: {
  	fontSize: 20,
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