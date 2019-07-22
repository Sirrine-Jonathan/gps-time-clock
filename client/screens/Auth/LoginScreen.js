import React from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text, AsyncStorage, Alert, Linking } from "react-native";
import CButton from '../../components/CButton';
import CLink from '../../components/CLink';
import Input from '../../components/Input';
import BackgroundImage from '../../components/BackgroundImage';
import { 
	login, 
	stageEmail, 
	stagePassword, 
	updateLoginLoading 
} from '../../redux/actions/authActions';
import ENV from '../../environment';

const EMAIL = 'EMAIL';
const PASSWORD = 'PASSWORD';

class LoginScreen extends React.Component {
		
		state = {
			usernameErr: false,
			emailErr: false,
			passwordErr: false,
			loginErr: false,
			emailCache: null,
			passwordCache: null
		}

		static navigationOptions = {
			title: 'Login',
		};

		componentWillMount = () => {
			this._retrieveData();
		}

	_login = () => {
			if (this.state.emailCache !== null && this.state.passwordCache !== null) {
				let { emailCache, passwordCache} = this.state;
				this.setState({emailCache: null, passwordCache: null});
				this.props.login(emailCache, passwordCache);
			}
			else {
				let {email, password} = this.props;
				this._storeData(email, password);
				if (this.state.emailErr || this.state.passwordErr)
					return false;
				this.props.login(email, password);
			}
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

		_storeData = async(email, password) => {
			try {
				await AsyncStorage.setItem(EMAIL, email);
				await AsyncStorage.setItem(PASSWORD, password);
			} catch (error) {
				console.log(error);
			}
		}

		_retrieveData = async () => {
			try {
				const email = await AsyncStorage.getItem(EMAIL);
				const password = await AsyncStorage.getItem(PASSWORD);
				if (email !== null && password !== null) {
					this.setState({emailCache: email, passwordCache: password})
					this._login();
				}
			} catch (error) {
				console.log(error);
			}
		}

		version = "1.0.0";
		release_date = "7/21/19";
		
		new_stuff = "What's new in Version " + this.version + "\n" + 
		"- This is the first release\n" + 
		"- Explore the app and discover features\n" +
		"\n";

		fixes = "Bug Fixes\n" +
		"- Fixed punch button offset\n" + 
		"- Fixed the scrolling\n" + 
		"\n";

		release_notes = this.release_date + '\n\n' + this.new_stuff + this.fixes;

		_showReleaseNotes = () => {
	      Alert.alert(
	        "Release Notes", 
	        this.release_notes,
	        [
	          { text: '✉ Email the Devs', onPress: () => {
	          	Linking.openURL('mailto:' + ENV.email + '?subject=GPS-Time-Clock%20Support&body=How%20can%20we%20help%20you?');
	          }},
	          { text: 'Close' },
	        ]
	      )
		}

		render() {
			const { emailErr, passwordErr } = this.state;
			const { loginError, email, password, loading } = this.props;
			return (
				<BackgroundImage>
				<View style={styles.container}>
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

					<CButton title="Login" onPress={this._login} loading={loading}/>
					<CLink color="#fff" title="Register" onPress={this._navToRegister} />
					<CLink color="#fff" title="Forgot Password" onPress={this._navToForgotPassword} />
					<CLink color="#fff" title={"v" + this.version} onPress={this._showReleaseNotes}/>
				</View>
				</BackgroundImage>
				
			);
		}
}

const mapDispatchToProps = (dispatch) => {
	 return {
			login: (email, password) => dispatch(login(email, password)),
			stageEmail: (email) => dispatch(stageEmail(email)),
			stagePassword: (password) => dispatch(stagePassword(password)),
			updateLoading: (isLoading) => dispatch(updateLoginLoading(isLoading))
	 }
}

const mapStateToProps = (state) => {
	 return {
		loginError: state.loginError,
		email: state.email,
		password: state.password,
		loading: state.loginLoading
	 }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	error: {
		textAlign: 'center',
		color: "#ff4747",
		marginBottom:20,
	}
});