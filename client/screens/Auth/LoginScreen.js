import React from "react";
import { connect } from 'react-redux';
import Input from '../../components/Input';
import FormDiv from '../../components/FormDiv';
import CButton from '../../components/CButton';
import { View, StyleSheet, Text } from "react-native";

import { login } from '../../redux/actions/authActions'
// link for deciding on ui kits
// https://blog.bitsrc.io/11-react-native-component-libraries-you-should-know-in-2018-71d2a8e33312

class LoginScreen extends React.Component {
    
    state = {
        username: '',
        email: '',
        password: '',
        usernameErr: false,
        emailErr: false,
        passwordErr: false,
        loginErr: false,
    }

    static navigationOptions = {
        title: 'Login',
    };

    _login = () => {
      let { email, password } = this.state;
      if (this.state.emailErr || this.state.passwordErr)
         return false;

      console.log('redux starting login');
      this.props.login(email, password);
    }


    _usernameErr = (username) => {
      let usernameErr = this._isEmptyStr(username);
      this.setState({ usernameErr, username });
      return usernameErr;
    }

    _emailErr = (email) => {
      //let regex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      //let emailErr = !regex.test(email);
      let emailErr = this._isEmptyStr(email);
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

    _navToRegister = () => {
        this.props.navigation.navigate('Register');
    }

    _navToForgotPassword = () => {
        this.props.navigation.navigate('ForgotPassword');
    }

    render() {
        const { emailErr, passwordErr } = this.state;
        const { loginError } = this.props;
        return (
            <FormDiv>
                <Input placeholder="Email/Username" error={emailErr} onChangeText={(email) => this._emailErr(email)} />
                <Input placeholder="Password" error={passwordErr} onChangeText={(password) => this._passwordErr(password)} />
                { (loginError) ? <Text style={styles.error}>Login Failed</Text>:null }
                <CButton title="Sign in" onPress={this._login}/>
                <CButton title="Register" onPress={this._navToRegister} />
                <CButton title="Forgot Password" onPress={this._navToForgotPassword} />
            </FormDiv>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password)),
  }
}

const mapStateToProps = (state) => {
  return {
    loginError: state.loginError,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
    error: {
        textAlign: 'center',
        color: '#8b0000',
    }
});