import React from "react";
import {Text, View, TextInput, Button} from "react-native";

export default class ForgotPasswordScreen extends React.Component {

    state = {
        email: ''
    }

    static navigationOptions = {
        drawerLabel: 'Forgot Password'
    };

    _sendEmail = () => {
        console.log(this.state.email);
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <TextInput onTextChange={(email) => this.setState({email})} value={this.state.email}/>
                <Button title="Send Email" onPress={this._sendEmail} />
            </View>
        );
    }
}