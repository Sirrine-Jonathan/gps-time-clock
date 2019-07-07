import React from "react";
import { connect } from 'react-redux';
//import CButton from '../../components/CButton';
//import CLink from '../../components/CLink';
//import Input from '../../components/Input';
//import { View, StyleSheet, Text, Image, TextInput, Button, TouchableHighlight, Alert } from "react-native";
import { login, stageEmail, stagePassword } from '../../redux/actions/authActions'

class LoginScreen extends React.Component {
		/*
		state = {
				username: 'testUser',
				usernameErr: false,

				emailErr: false,
				passwordErr: false,
				loginErr: false,
		}

		_login = () => {
			let { email, password } = this.props;
			if (this.state.emailErr || this.state.passwordErr)
				 return false;
			this.props.login(email, password);
		}

		_usernameErr = (username) => {
			let usernameErr = this._isEmptyStr(username);
			this.setState({ usernameErr, username });
			return usernameErr;
		}

		_emailErr = (email) => {
			let emailErr = this._isEmptyStr(email);
			this.setState({ emailErr });
			this.props.stageEmail(email);
			return emailErr;
		}

		_passwordErr = (password) => {
			let passwordErr = this._isEmptyStr(password);
			this.setState({ passwordErr });
			this.props.stagePassword(password);
			return passwordErr;
		}

		_isEmptyStr = (str) => {
			let arr = str.split('');
			let empty = true;
			arr.forEach((each) => {
				if (each != ' ')
					empty = false;
			});
			return empty;
		}

		_navToRegister = () => {
			this.props.navigation.navigate('Register');
		}

		_navToForgotPassword = () => {
			this.props.navigation.navigate('ForgotPassword');
		}
		*/

		render() {
			//const { emailErr, passwordErr } = this.state;
			//const { loginError } = this.props;
			return (
				<Text>Hello</Text>
			);
		}
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: (email, password) => dispatch(login(email, password)),
		stageEmail: (email) => dispatch(stageEmail(email)),
		stagePassword: (password) => dispatch(stagePassword(password))
	}
}

const mapStateToProps = (state) => {
	return {
		loginError: state.loginError,
		email: state.email,
		password: state.password
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#DCDCDC'
	},
	error: {
		textAlign: 'center',
		color: '#8b0000',
		marginBottom: 20
	}
});