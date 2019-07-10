import React from "react";
import { connect } from 'react-redux';
import { ScrollView, View, StyleSheet, Text } from "react-native";
import CButton from '../../components/CButton';
import CLink from '../../components/CLink';
import Input from '../../components/Input';
import { login, stageEmail, stagePassword } from '../../redux/actions/authActions'

class LoginScreen extends React.Component {
		
		state = {
			usernameErr: false,
			emailErr: false,
			passwordErr: false,
			loginErr: false,
		}

		static navigationOptions = {
			title: 'Login',
		};

		_login = () => {
			let { email, password } = this.props;
			if (this.state.emailErr || this.state.passwordErr)
				 return false;
			this.props.login(email, password);
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

		render() {
				const { emailErr, passwordErr } = this.state;
				const { loginError, email, password } = this.props;
				return (
					<ScrollView style={styles.container}>
						<Input 
							imageSrc="msg"
							placeholder="Username / Email"
							keyboardType="email-address"
							containsError={emailErr}
							onChangeText={(email) => this._emailErr(email)}
							value={email}
						/>
						<Input 
							imageSrc="key"
							placeholder="Password"
							secureTextEntry={true}
							containsError={passwordErr}
							onChangeText={(password) => this._passwordErr(password)}
							value={password}
						/>

						<Text style={styles.error}>{ loginError }</Text>

						<CButton title="Login" onPress={this._login} />
						<CLink title="Register" onPress={this._navToRegister} />
						<CLink title="Forgot Password" onPress={this._navToForgotPassword} />
						<CLink title="v1.6.5" />
					</ScrollView>
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
				backgroundColor: '#DCDCDC',
		},
		inputContainer: {
				borderBottomColor: '#F5FCFF',
				backgroundColor: '#FFFFFF',
				borderRadius:30,
				borderBottomWidth: 1,
				width:250,
				height:45,
				marginBottom:20,
				flexDirection: 'row',
				alignItems:'center'
		},
		inputs:{
				height:45,
				marginLeft:16,
				borderBottomColor: '#FFFFFF',
				flex:1,
		},
		inputIcon:{
				width:30,
				height:30,
				marginLeft:15,
				justifyContent: 'center'
		},
		buttonContainer: {
				height:45,
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				marginBottom:20,
				width:250,
				borderRadius:30,
		},
		loginButton: {
				backgroundColor: "#00b5ec",
		},
		loginText: {
				color: 'white',
		},
		error: {
			textAlign: 'center',
			color: '#8b0000',
			marginBottom:20,
		}
});