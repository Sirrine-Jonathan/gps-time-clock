import React from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import FormatStamp from '../util/FormatStamp';
import Map from './Map';


export default class SinglePunch extends React.Component {

   state = {
      showMapIn: false,
      showMapOut: false,
   };

   _toggleMapIn = () => {
         this.setState({showMapIn: !this.state.showMapIn});
   };

   _toggleMapOut = () => {
         // only show one map if the user is currently clocked in
         let { punch } = this.props;
         if (FormatStamp.getTime(punch.timestampOut) != 'Invalid Date'){
            this.setState({showMapOut: !this.state.showMapOut})
         }
   };

   _toggleMap = () => {
      this._toggleMapIn();
      this._toggleMapOut();
   };

   render() {

      let { punch } = this.props;
      let timeOut = FormatStamp.getTime(punch.timestampOut);
      let timeIn = FormatStamp.getTime(punch.timestampIn);
      let hours = FormatStamp.getHours(punch.timestampIn, punch.timestampOut);
      let dayString = FormatStamp.getDateString(punch.timestampIn);
      return (
         <TouchableOpacity style={this.props.style} onPress={this._toggleMap}>
            {(this.state.showMapIn) ? <Map coords={punch.locationIn}/> :null}
            {(this.state.showMapOut) ? <Map coords={punch.locationOut}/> :null}
            <View style={styles.punchInfoBox}>
               <View style={styles.dateRow}>
                  <Text>{ dayString }</Text>
               </View>
               <View style={styles.textRow}>
                  <Text>In:</Text>
                  <Text>{ timeIn }</Text>
               </View>
               <View style={styles.textRow}>
                  <Text>Out:</Text>
                  <Text>{ timeOut }</Text>
               </View>
               <View style={styles.textRow}>
                  <Text>Total Hours:</Text>
                  <Text>{ hours }</Text>
               </View>
            </View>
         </TouchableOpacity>
      );
   }

}

const styles = StyleSheet.create({
   punchInfoBox: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      alignItems: 'center',
      shadowColor: "#000000",
      shadowOpacity: 0.5,
      shadowRadius: 2,
      shadowOffset: {
         height: 2,
         width: 2
      }
   },
   textRow: {
      display: 'flex',
      flexDirection: 'row',
      width: '70%',
      justifyContent: 'space-between' 
   },
   dateRow: {
      display: 'flex',
      flexDirection: 'row',
      width: '70%',
      justifyContent: 'center'
   },
   mapContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center' 
   }
});