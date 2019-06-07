import React from "react";
import AppNavigator from './navigation/AppStack';
import AuthNavigator from './navigation/AuthStack';
import { connect } from 'react-redux';

class AppSwitch extends React.Component {
   render(){
      let { userID } = this.props; console.log("switch userID: " + userID);
      if (userID)
         return (<AppNavigator />);
      else 
         return (<AuthNavigator />);
   }
};


const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

const mapStateToProps = (state) => {
  return {
    userID: state.userID,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppSwitch);