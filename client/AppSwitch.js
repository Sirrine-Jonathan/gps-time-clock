import React from "react";
import AppNavigator from './navigation/AppStack';
import AuthNavigator from './navigation/AuthStack';
import { connect } from 'react-redux';

class AppSwitch extends React.Component {
	 render(){
			let { user } = this.props;
			if (user){
				 return (<AppNavigator />);
			} else { 
				 return (<AuthNavigator />);
			}
	 }
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps, {})(AppSwitch);