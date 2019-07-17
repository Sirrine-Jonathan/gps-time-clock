import React from "react";
import { connect } from 'react-redux';
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import { getLastPunch, setReportsUser } from '../redux/actions/appActions';

class SingleUser extends React.Component {

   _viewUser = () => {
      let { user } = this.props;
      this.props.setReportsUser(user);
      this.props.navigation.navigate("History", { user: user })
   }

   render() {
      let { user } = this.props;
      let { lastPunch, punchedIn } = this.props.getLastPunch(user.email);
      
      return (
         <TouchableOpacity style={this.props.style} onPress={this._viewUser}>
            <View style={styles.userInfoBox}>
               <View style={styles.textRow}>
                  <Text>username:</Text>
                  <Text>{ user.username }</Text>
               </View>
               <View style={styles.textRow}>
                  <Text>email:</Text>
                  <Text>{ user.email }</Text>
               </View>
               {
                  (lastPunch) ? (
                     <View>
                        <Text>Last Punch</Text>
                        <Text>{ lastPunch }</Text>
                     </View>
                  ):null
               }
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
      flexDirection: 'column',
      alignContent: 'center',
      alignItems: 'center'
   },
   textRow: {
      display: 'flex',
      flexDirection: 'row',
      width: '70%',
      justifyContent: 'space-between' 
   },
   mapContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center' 
   }
});