import React from "react";
import {Button, View, TextInput} from "react-native";
import Input from '../../components/Input';
import CButton from '../../components/CButton';
import FormDiv from '../../components/FormDiv';

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
            <FormDiv>
                <Input placeholder="Email" onChangeText={(email) => this.setState({email})} value={this.state.email}/>
                <Input placeholder="Password" onChangeText={(password) => this.setState({password})} value={this.state.password}/>
                <CButton title="Register" onPress={this._signUpAsync} />
            </FormDiv>
        );
    }
}