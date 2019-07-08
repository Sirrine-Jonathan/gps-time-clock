import React from "react";
import { View, StyleSheet } from "react-native";
import CButton from '../../components/CButton';
import Input from '../../components/Input';


export default class ForgotPasswordScreen extends React.Component {

    state = {
        email: '',
        emailErr: false
    }

    static navigationOptions = {
        title: 'Forgot Password'
    };

    _sendEmail = () => {
        console.log(this.state.email);
    }

	_emailErr = (email) => {
		let emailErr = this._isEmptyStr(email);
		this.setState({ emailErr });
		this.props.stageEmail(email);
		return emailErr;
	}

    render() {
    	let { emailErr } = this.state;
        return (
            <View style={styles.container}>
				<Input 
					placeholder="Email"
					containsError={emailErr}
					onChangeText={(email) => this._emailErr(secret)}
				/>
                <CButton title="Send Email" onPress={this._sendEmail} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
	container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#DCDCDC',
	}
})