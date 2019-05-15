import React from "react";
import { View, TextInput, Button } from "react-native";
// link for deciding on ui kits
// https://blog.bitsrc.io/11-react-native-component-libraries-you-should-know-in-2018-71d2a8e33312

export default class LoginScreen extends React.Component {
    
    state = {
        email: '',
        password: ''
    }

    static navigationOptions = {
        title: 'Please sign in',
    };

    _signInAsync = async () => {
        // sign in here
        this.props.navigation.navigate('App');
    }

    _navToRegister = () => {
        this.props.navigation.navigate('Register');
    }

    _navToForgotPassword = () => {
        this.props.navigation.navigate('ForgotPassword');
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <TextInput onTextChange={(email) => this.setState({email})} value={this.state.email}/>
                <TextInput onTextChange={(password) => this.setState({password})} value={this.state.password}/>
                <Button title="Login" onPress={this._signInAsync} />
                <Button title="Register" onPress={this._navToRegister} />
                <Button title="Forgot Password" onPress={this._navToForgotPassword} />
            </View>
        );
    }
}