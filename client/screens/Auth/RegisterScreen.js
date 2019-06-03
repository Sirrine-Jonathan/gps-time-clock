import React from "react";
import { connect } from 'react-redux';
import Input from '../../components/Input';
import CButton from '../../components/CButton';
import FormDiv from '../../components/FormDiv';
import { View, StyleSheet, Text } from "react-native";

import { register } from '../../redux/actions/authActions'

class RegisterScreen extends React.Component {

    state = {
        company: '',
        username: '',
        email: '',
        password: '',
        companyErr: false,
        usernameErr: false,
        emailErr: false,
        passwordErr: false,
    }
    
    static navigationOptions = {
        title: 'Register',
    };

    _register = () => {
        console.log('_register checking for errors before calling redux fn');
        if (this.state.emailErr || 
            this.state.passwordErr ||
            this.state.usernameErr ||
            this.state.companyErr)
        {
            return false;
        }
        console.log('redux starting register');
        let { username, email, company, password } = this.state;
        this.props.register(username, email, company, password);
    }

    _companyErr = (company) => {
      let companyErr = this._isEmptyStr(company);
      this.setState({ companyErr, company });
      return companyErr;
    }

    _usernameErr = (username) => {
      let usernameErr = this._isEmptyStr(username);
      this.setState({ usernameErr, username });
      return usernameErr;
    }

    _emailErr = (email) => {
      let regex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      let emailErr = !regex.test(email);
      this.setState({ emailErr, email });
      return emailErr;
    }

    _passwordErr = (password) => {
       let passwordErr = this._isEmptyStr(password);
      this.setState({ passwordErr, password });
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

    _navToSignin = () => {
        this.props.navigation.navigate('Signin');
    }

    _navToForgotPassword = () => {
        this.props.navigation.navigate('ForgotPassword');
    }

    render() {
        const { usernameErr, emailErr, passwordErr, companyErr } = this.state;
        const { registerError } = this.props;
        return (
            <FormDiv>
                <Input placeholder="Company" error={companyErr} onChangeText={(company) => this._companyErr(company)} />
                <Input placeholder="Username" error={usernameErr} onChangeText={(username) => this._usernameErr(username)} />
                <Input placeholder="Email" error={emailErr} onChangeText={(email) => this._emailErr(email)} />
                <Input placeholder="Password" error={passwordErr} onChangeText={(password) => this._passwordErr(password)} />
                { (registerError) ? <Text style={styles.error}>Register Failed</Text>:null }
                <CButton title="Register" onPress={this._register} />
            </FormDiv>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (username, email, company, password) => dispatch(register(username, email, company, password)),
  }
}

const mapStateToProps = (state) => {
  return {
    registerError: state.registerError,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

const styles = StyleSheet.create({
    error: {
        textAlign: 'center',
        color: '#8b0000',
    }
});