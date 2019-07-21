import React from "react";
import { connect } from 'react-redux';
import CButton from '../../components/CButton';
import Input from '../../components/Input';
import BackgroundImage from '../../components/BackgroundImage';
import {Text, View, StyleSheet, ScrollView } from "react-native";
import { updateUserInfo, updateCompanyInfo } from '../../redux/actions/appActions'

class SettingsScreen extends React.Component {

    static navigationOptions = {
      drawerLabel: 'Settings',
      title: 'Settings'
    };

    state = {
      email: this.props.user.email,
      username: this.props.user.username,
      password: null,
      usernameErr: false,
      company: this.props.user.company,
      secret: null,
      emailErr: false,
      passwordErr: false,
      updateErr: false,
      companyErr: false,
      secretErr: false
    }

    _usernameErr = (username) => {
      let usernameErr = this._isEmptyStr(username);
      this.setState({ usernameErr, username });
      return usernameErr;
    }

    _companyErr = (company) => {
      let companyErr = this._isEmptyStr(company);
      this.setState({ companyErr, company });
      return companyErr;
    }

    _emailErr = (email) => {
      let regex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      let emailErr = !regex.test(email);
      this.setState({ emailErr, email });
      this.props.stageEmail(email);
      return emailErr;
    }

    _passwordErr = (password) => {
      let passwordErr = this._isEmptyStr(password);
      this.setState({ passwordErr, password });
      this.props.stagePassword(password);
      return passwordErr;
    }

    _secretErr = (secret) => {
      let secretErr = this._isEmptyStr(secret);
      this.setState({ secretErr, secret });
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

    _updateUser = () => {
      if (this.state.emailErr || 
          this.state.passwordErr ||
          this.state.usernameErr)
      {
          return false;
      }
      let { email, username, password } = this.state;
      this.props.updateUserInfo(email, username, password);
    }

    _updateCompany = () => {
      if (this.state.companyErr ||
         this.state.secretErr)
      {
         return false;
      }
      let { company, secret } = this.state;
      this.props.updateCompanyInfo(company, secret);
    }

    render() {
      let { username, email, password, company, secret } = this.state;
      let { usernameErr, emailErr, passwordErr, companyErr, secretErr } = this.state;
      return (
          <BackgroundImage>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <View>
                  <Text style={styles.title}>Update Account Information</Text>
                  <View style={styles.form}>
                    <Input
                      imageSrc="idcard" 
                      placeholder="New Username" 
                      error={usernameErr} 
                      onChangeText={(username) => this._usernameErr(username)} 
                      value={username} 
                    />
                    <Input 
                      imageSrc="at"
                      placeholder="New Email" 
                      error={emailErr} 
                      onChangeText={(email) => this._emailErr(email)} 
                      value={email} 
                    />
                    <Input 
                      imageSrc="key"
                      placeholder="New Password" 
                      error={passwordErr} 
                      onChangeText={(password) => this._passwordErr(password)} 
                      value={password} 
                    />
                    { (this.props.updateError) ? <Text style={styles.error}>Update Failed</Text>:null }
                    <CButton title="Update User" onPress={this._updateUser} />
                  </View>
                </View>
                { (this.props.user.isAdmin) ? (
                  <View>
                     <Text style={styles.title}>Update Company Information</Text>
                     <View style={styles.form}>
                        <Input 
                          imageSrc="building"
                          placeholder="Company" 
                          error={companyErr} 
                          onChangeText={(company) => this._companyErr(company)} 
                          value={company} 
                        />
                        <Input 
                          imageSrc="locked_quote"
                          placeholder="Secret" 
                          error={secretErr} onChangeText={(secret) => this._secretErr(secret)} 
                          value={secret} 
                        />
                        { (this.props.updateError) ? <Text style={styles.error}>Update Failed</Text>:null }
                        <CButton title="Update Company" onPress={this._updateCompany} />
                     </View>
                  </View>
                  ):null}
            </View>
          </ScrollView>
          </BackgroundImage>
      );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (email, username, password) => dispatch(updateUserInfo(email, username, password)),
    updateCompanyInfo: (email, company, secret) => dispatch(updateUserInfo(email, company, secret)),
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    updateError: state.updateError
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

const styles = StyleSheet.create({
	scrollContainer: {
	},
  container: {
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
	title: {
		textAlign: 'center',
		fontSize: 20,
    padding: 20,
    marginBottom: 20,
    flex: 1,
    color: "#fff"
	},
  error: {
    textAlign: 'center',
    color: '#8b0000',
  },
});