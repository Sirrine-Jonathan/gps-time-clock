import React from "react";
import { connect } from 'react-redux';
import FormDiv from '../../components/FormDiv';
import {Text, View, StyleSheet} from "react-native";

class SettingsScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Settings'
    };

    state = {
      email: this.props.user.email,
      username: this.props.user.username,
      password: null,
      usernameErr: false,
      emailErr: false,
      passwordErr: false,
    }

    _usernameErr = (username) => {
      let usernameErr = this._isEmptyStr(username);
      this.setState({ usernameErr, username });
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

    _isEmptyStr = (str) => {
      let arr = str.split('');
      let empty = true;
      arr.forEach((each) => {
        if (each != ' ')
          empty = false;
      });
      return empty;
    }

    _update = () => {
      if (this.state.emailErr || 
          this.state.passwordErr ||
          this.state.usernameErr ||
          this.state.companyErr)
      {
          return false;
      }
      let { email, username, password } = this.state;
      this.props.register(email, username, password);
    }

    render() {
        let { username, email, password } = this.state;
        return (
            <View style={styles.content}>
                <Text>Settings</Text>
                <Text>Update Account Information</Text>
                <FormDiv>
                  <Input placeholder="Username" error={usernameErr} onChangeText={(username) => this._usernameErr(username)} value={username} />
                  <Input placeholder="Email" error={emailErr} onChangeText={(email) => this._emailErr(email)} value={email} />
                  <Input placeholder="Password" error={passwordErr} onChangeText={(password) => this._passwordErr(password)} value={password} />
                  { (loginError) ? <Text style={styles.error}>Login Failed</Text>:null }
                  <CButton title="Update" onPress={this._update}/>
                </FormDiv>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    update: (email, username, password) => dispatch(update(email, username, password)),
  }
}

const mapStateToProps = (state) => {
  return {
    loginError: state.loginError,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

const styles = StyleSheet.create({
   content: {
      marginTop: 20,
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
   }
});