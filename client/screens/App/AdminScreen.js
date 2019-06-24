import React from "react";
import { connect } from 'react-redux';
import {Text, View, StyleSheet} from "react-native";

class AdminScreen extends React.Component {
    

    static navigationOptions = {
        drawerLabel: 'Admin',
        title: 'Admin'
    };

    render() {
        return (
            <View style={styles.content}>
                <Text>Admin</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen);

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});