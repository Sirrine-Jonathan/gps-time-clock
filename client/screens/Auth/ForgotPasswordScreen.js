import React from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from "react-native";
import CButton from '../../components/CButton';
import Input from '../../components/Input';
import BackgroundImage from '../../components/BackgroundImage';
import { sendRecoveryEmail, stageEmail } from '../../redux/actions/authActions'

class ForgotPasswordScreen extends React.Component {

    state = {
        emailErr: false,
        messageFromServer: { message: "" }
    }

    static navigationOptions = {
        title: 'Forgot Password'
    };

    _sendEmail = async () => {
		let { email } = this.props;
		if (this.state.emailErr)
			 return false;
		let note = await this.props.sendRecoveryEmail(email);
		this.setState({
			messageFromServer: note
		})
    }

	_emailErr = (email) => {
		let emailErr = this._isEmptyStr(email);
		this.setState({ emailErr });
		this.props.stageEmail(email);
		return emailErr;
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

    render() {
    	let { emailErr, messageFromServer } = this.state;
    	let { email } = this.props;
        return (
        	<BackgroundImage>
            <View style={styles.container}>
            	<Text style={styles.info}>
            		We get it. It's easy to forget things. 
            		Submit your email to receive a link to reset your password
            	</Text>
				<Input 
					imageSrc="letter_box"
					placeholder="Email"
					containsError={emailErr}
					onChangeText={(email) => this._emailErr(email)}
					value={email}
				/>
				<Text style={styles.error}>{ messageFromServer.message }</Text>
                <CButton title="Send Email" onPress={this._sendEmail} />
            </View>
            </BackgroundImage>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
	 return {
		sendRecoveryEmail: (email) => dispatch(sendRecoveryEmail(email)),
		stageEmail: (email) => dispatch(stageEmail(email)),
	 }
}

const mapStateToProps = (state) => {
	 return {
		email: state.email,
		recoveryError: state.recoveryError
	 }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	error: {
		textAlign: 'center',
		color: '#8b0000',
		marginBottom:20,
	},
	info: {
		color: "#fff",
		width: '80%',
		fontSize: 20,
		marginBottom: 60,
		textAlign: 'center'
	}
})