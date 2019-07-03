import React from "react";
import { connect } from 'react-redux';
import Input from '../../components/Input';
import FormDiv from '../../components/FormDiv';
import CButton from '../../components/CButton';
import { View, StyleSheet, Text, Image, TextInput, Button, TouchableHighlight, Alert } from "react-native";

import { login, stageEmail, stagePassword } from '../../redux/actions/authActions'
// link for deciding on ui kits
// https://blog.bitsrc.io/11-react-native-component-libraries-you-should-know-in-2018-71d2a8e33312

class LoginScreen extends React.Component {
    
    state = {
        username: 'testUser',
        usernameErr: false,
        emailErr: false,
        passwordErr: false,
        loginErr: false,
    }

    static navigationOptions = {
        title: 'Login',
    };

    _login = () => {
      let { email, password } = this.props;
      if (this.state.emailErr || this.state.passwordErr)
         return false;
      this.props.login(email, password);
    }


    _usernameErr = (username) => {
      let usernameErr = this._isEmptyStr(username);
      this.setState({ usernameErr, username });
      return usernameErr;
    }

    _emailErr = (email) => {
      let emailErr = this._isEmptyStr(email);
      this.setState({ emailErr });
      this.props.stageEmail(email);
      return emailErr;
    }

    _passwordErr = (password) => {
      let passwordErr = this._isEmptyStr(password);
      this.setState({ passwordErr });
      this.props.stagePassword(password);
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
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                    <TextInput style={styles.inputs}
                               placeholder="Email / Username"
                               keyboardType="email-address"
                               underlineColorAndroid='transparent'
                               onChangeText={(email) => this._emailErr(email)} value={this.props.email}/>
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                    <TextInput style={styles.inputs}
                               placeholder="Password"
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(password) => this._passwordErr(password)} value={this.props.password}/>
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this._login}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>

                <Text style={styles.error}>{ loginError }</Text>


                <TouchableHighlight style={styles.buttonContainer} onPress={this._navToForgotPassword}>
                    <Text>Forgot your password?</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer}onPress={this._navToRegister} >
                    <Text>Register</Text>
                </TouchableHighlight>
                <Text>v1.3.1</Text>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
   return {
      login: (email, password) => dispatch(login(email, password)),
      stageEmail: (email) => dispatch(stageEmail(email)),
      stagePassword: (password) => dispatch(stagePassword(password))
   }
}

const mapStateToProps = (state) => {
   return {
      loginError: state.loginError,
      email: state.email,
      password: state.password
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    },
    error: {
        textAlign: 'center',
        color: '#8b0000',
        marginBottom:20,
    }
});