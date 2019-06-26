import React from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import TimerStamp from '../util/TimerStamp';


export default class SingleUser extends React.Component {

   _viewUser = () => {
      console.log(this.props.user);
   }

   render() {
      let { user } = this.props;
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
            </View>
         </TouchableOpacity>
      );
   }

}

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