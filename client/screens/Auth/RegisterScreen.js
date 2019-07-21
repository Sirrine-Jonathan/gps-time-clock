import React from "react";
import { connect } from 'react-redux';
import Input from '../../components/Input';
import CButton from '../../components/CButton';
import BackgroundImage from '../../components/BackgroundImage';
import { View, StyleSheet, Text } from "react-native";
import { 
	register, 
	stageUsername,
	stageEmail, 
	stagePassword,
	stageCompany,
	stageSecret,
  updateRegisterLoading
} from '../../redux/actions/authActions';

class RegisterScreen extends React.Component {

    state = {
        usernameErr: false,
        secretErr: false,
        companyErr: false,
        emailErr: false,
        passwordErr: false,
    }

    static navigationOptions = {
      title: 'Register',
    };

    _register = () => {
      if (this.state.emailErr || 
          this.state.passwordErr ||
          this.state.usernameErr ||
          this.state.companyErr ||
          this.state.secretErr)
      {
          return false;
      }
      let { username, email, password, company, secret} = this.props;
      console.log('calling redux register');
      this.props.register(username, email, company, password, secret);
    }

    _companyErr = (company) => {
      let companyErr = this._isEmptyStr(company);
      this.setState({ companyErr });
      this.props.stageCompany(company);
      return companyErr;
    }

    _usernameErr = (username) => {
      let usernameErr = this._isEmptyStr(username);
      this.setState({ usernameErr });
      this.props.stageUsername(username);
      return usernameErr;
    }

    _emailErr = (email) => {
      let regex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      let emailErr = !regex.test(email);
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

    _secretErr = (secret) => {
      let secretErr = this._isEmptyStr(secret);
      this.setState({ secretErr });
      this.props.stageSecret(secret);
      return secretErr;
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
        const { usernameErr, emailErr, passwordErr, companyErr, secretErr } = this.state;
        const { registerErr, username, email, password, company, secret, loading } = this.props;
        return (
          <BackgroundImage>
          <View style={styles.container}>
            <Input 
              imageSrc="idcard"
              placeholder="Username"
              containsError={usernameErr}
              onChangeText={(username) => this._usernameErr(username)}
              value={username}
            />
            <Input 
              imageSrc="at"
              placeholder="Email"
              keyboardType="email-address"
              containsError={emailErr}
              onChangeText={(email) => this._emailErr(email)} 
              value={email}
            />
            <Input 
              imageSrc="key"
              placeholder="Password"
              secureTextEntry={true}
              containsError={passwordErr}
              onChangeText={(password) => this._passwordErr(password)}
              value={password}
            />
            <Input 
              imageSrc="building"
              placeholder="Company"
              containsError={companyErr}
              onChangeText={(company) => this._companyErr(company)}
              value={company}
            />
            <Input 
              imageSrc="locked_quote"
              placeholder="Secret"
              secureTextEntry={true}
              containsError={secretErr}
              onChangeText={(secret) => this._secretErr(secret)}
              value={secret}
            />

            <Text style={styles.error}>{ registerErr }</Text>

            <CButton title="Register" onPress={this._register} loading={loading} />
          </View>
          </BackgroundImage>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (username, email, company, password, secret) => dispatch(register(username, email, company, password, secret)),
    stageUsername: (username) => dispatch(stageUsername(username)),
    stageEmail: (email) => dispatch(stageEmail(email)),
    stagePassword: (password) => dispatch(stagePassword(password)),
    stageCompany: (company) => dispatch(stageCompany(company)),
    stageSecret: (secret) => dispatch(stageSecret(secret)),
    updateLoading: (isLoading) => dispatch(updateRegisterLoading(isLoading))
  }
}

const mapStateToProps = (state) => {
  return {
    registerErr: state.registerError,
    username: state.username,
    email: state.email,
    password: state.password,
    company: state.company,
    secret: state.secret,
    loading: state.registerLoading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    textAlign: 'center',
    color: '#8b0000',
    marginBottom:20,
  }
});