import React from "react";
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Platform, ScrollView, TouchableOpacity } from "react-native";
import { Constants, Location, Permissions } from 'expo';
import Loading from '../../components/Loading';

class HomeScreen extends React.Component {

   static navigationOptions = {
      drawerLabel: 'Home'
   };

   state = {
    punchedIn: false,
   }

   // this should be handled by a redux function at some point
   // the function should update a last db variable so
   // we can keep a count even when the user is logged out
   _stubTogglePunch = () => {
      this.setState({
        punchedIn: !this.state.punchedIn,
      })
   }

    render() {
      const user = this.props.user;
      const { punchedIn } = this.state;
      let buttonText = (punchedIn) ? "Punch Out":"Punch In";        
      return (
        <View style={styles.content}>
          <Text>Welcome, { user.username }</Text>
          <TouchableOpacity
            style={styles.punchBtn}
            onPress={this._stubTogglePunch}
          >
            <Text>{ buttonText }</Text>
          </TouchableOpacity>
        </View>
      );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {}
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
    marginTop: 25,
  },
  punchBtn: {
    fontSize: 3,
    borderWidth: 2,
    borderColor: "black",
    alignItems: 'center',
    padding: 10
  }
});