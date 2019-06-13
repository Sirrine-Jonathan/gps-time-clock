import React from "react";
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Platform } from "react-native";
import { Constants, Location, Permissions } from 'expo';
import Loading from '../../components/Loading';

class HomeScreen extends React.Component {

   static navigationOptions = {
      drawerLabel: 'Home'
   };

    render() {
      console.log('in home');
      return (
        <View style={styles.content}>
          <Loading />
        </View>
      );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  }
}

const mapStateToProps = (state) => {
  return {
    logoutError: state.logoutError,
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});