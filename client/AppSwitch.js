import React from "react";
import AppNavigator from './navigation/AppStack';
import AuthNavigator from './navigation/AuthStack';
import { connect } from 'react-redux';

class AppSwitch extends React.Component {
   render(){
      console.log('AppSwitch: ')
      let { user } = this.props; console.log(user);
      if (user){
         console.log("App Navigator Starting");
         return (<AppNavigator />);
      } else { 
         console.log("Auth Navigator Starting")
         return (<AuthNavigator />);
      }
   }
};


const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppSwitch);