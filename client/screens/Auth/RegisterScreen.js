import React from "react";
import {Button, View, TextInput} from "react-native";

export default class RegisterScreen extends React.Component {

    state = {
        email: '',
        password: ''
    }
    
    static navigationOptions = {
        title: 'Register',
    };

    _signUpAsync = async () => {
        // register new user here 
        this.props.navigation.navigate('App');
    }

    _navToSignin = () => {
        this.props.navigation.navigate('Signin');
    }

    _navToForgotPassword = () => {
        this.props.navigation.navigate('ForgotPassword');
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <TextInput onTextChange={(email) => this.setState({email})} value={this.state.email}/>
                <TextInput onTextChange={(password) => this.setState({password})} value={this.state.password}/>
                <Button title="Register" onPress={this._signUpAsync} />
            </View>
        );
    }
}