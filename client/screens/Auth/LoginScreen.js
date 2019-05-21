import React from "react";
import Input from '../../components/Input';
import FormDiv from '../../components/FormDiv';
import CButton from '../../components/CButton';
import { View, StyleSheet, Text } from "react-native";
// link for deciding on ui kits
// https://blog.bitsrc.io/11-react-native-component-libraries-you-should-know-in-2018-71d2a8e33312

export default class LoginScreen extends React.Component {
    
    state = {
        email: 'testUser',
        password: 'password'
    }

    static navigationOptions = {
        title: 'GPS-Time-Clock',
    };

    _signInAsync = async () => {
        // sign in here
        let res = null;
        fetch("https://gps-time.herokuapp.com/api/authenticate", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
               console.log(responseJson);
                res = responseJson;
            })
            .catch((error) => {
                console.error(error);
            });

        if (res != null || !res)
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
            <FormDiv>
                <Input placeholder="Email" onTextChange={(email) => this.setState({email})} />
                <Input placeholder="Password" onTextChange={(password) => this.setState({password})}  />
                <CButton title="Sign in" onPress={this._signInAsync} />
                <CButton title="Register" onPress={this._navToRegister} />
                <CButton title="Forgot Password" onPress={this._navToForgotPassword} />
            </FormDiv>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        margin: 15, 
    }
});