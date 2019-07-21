import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { DrawerItems, SafeAreaView, NavigationEvents } from 'react-navigation';
import { getPunches } from '../redux/actions/appActions';
import CButton from './CButton';
import BackgroundImage from './BackgroundImage';
const logoutSrc = require("../assets/exit.png");

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
            if (item.key == "Employees")
              return false;
            else 
              return true;
          }
        })
      }

      const { user } = this.props;


      return (
         <BackgroundImage src="gplaypattern">
         <ScrollView style={styles.content}>
            <SafeAreaView style={{flex: 1}}>
               <View style={styles.userInfo}>
	               <Text style={styles.username}>{ user.username }</Text>
	               <Text style={styles.company}>{ user.company }</Text>
               </View>
               <DrawerItems {...clonedProps} />
               <View style={styles.logoutContainer}>
                 <TouchableOpacity style={styles.buttonDiv} onPress={this._logout}>
                    <Image style={styles.icon} source={logoutSrc}/>
                    <Text style={styles.buttonText}>Logout</Text>
                 		{/*<CButton onPress={this._logout} title="Logout"/>*/}
                 </TouchableOpacity>
               </View>
            </SafeAreaView>
         </ScrollView>
         </BackgroundImage>
      )
   }
}

const styles = StyleSheet.create({
  content: {
    marginTop: 25,
  },
  logoutContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-end'
  },
  buttonDiv: {
  	flex: 1,
  	flexDirection: 'row',
  	justifyContent: 'space-around',
    padding: 10,
  },
  buttonText: {
    fontSize: 40,
    color: "#333"
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
  },
  icon: {

  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    setReportsUser: (user) => dispatch(setReportsUser(user))
  }
}

const mapStateToProps = (state) => {
  return {
    logoutError: state.logoutError,
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContents);