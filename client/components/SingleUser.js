import React from "react";
import { connect } from 'react-redux';
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import { getLastPunch, setReportsUser } from '../redux/actions/appActions';
import { Entypo } from '@expo/vector-icons';

class SingleUser extends React.Component {

   _viewUser = () => {
      let { user } = this.props;
      this.props.setReportsUser(user);
      this.props.navigation.navigate("History", { user: user })
   }

   render() {
      let { user } = this.props;
      let { lastPunch, punchedIn } = this.props.getLastPunch(user.email);
      let dot = (<Entypo name="dot-single" size={28} color="green" />);
      console.log(user);
      return (
         <TouchableOpacity style={this.props.style} onPress={this._viewUser}>
            <View style={styles.userInfoBox}>
               <View style={styles.textColumn}>
                  { dot }
               </View>
               <View style={styles.textColumn}>
                  { user.username }
                  { user.email }
               </View>
            </View>
         </TouchableOpacity>
      );
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      getLastPunch: (email) => dispatch(getLastPunch(email)),
      setReportsUser: (user) => dispatch(setReportsUser(user))
   }
}

const mapStateToProps = (state) => {
   return {

   }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);

const styles = StyleSheet.create({
   userInfoBox: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center'
   },
   textColumn: {
      display: 'flex',
      flexDirection: 'column',
      width: '70%',
      justifyContent: 'space-between' 
   },
   mapContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center' 
   }
});