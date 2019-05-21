import React from "react";
import Input from '../../components/Input';
import FormDiv from '../../components/FormDiv';
import CButton from '../../components/CButton';
import { View, StyleSheet } from "react-native";

export default class ForgotPasswordScreen extends React.Component {

    state = {
        email: ''
    }

    static navigationOptions = {
        title: 'Forgot Password'
    };

    _sendEmail = () => {
        console.log(this.state.email);
    }

    render() {
        return (
            <FormDiv>
                <Input placeholder="Email" onTextChange={(email) => this.setState({email})} />
                <CButton title="Send Email" onPress={this._sendEmail} />
            </FormDiv>
        );
    }
}