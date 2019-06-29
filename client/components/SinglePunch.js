import React from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import TimerStamp from '../util/TimerStamp';
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
         if (TimerStamp.getPrettyTime(punch.timestampOut) != 'Invalid Date'){
            this.setState({showMapOut: !this.state.showMapOut})
         }
   };

   _toggleMap = () => {
      this._toggleMapIn();
      this._toggleMapOut();
   };

   render() {
      let { punch } = this.props;
      let timeOut = TimerStamp.getPrettyTime(punch.timestampOut);

      if (timeOut == 'Invalid Date') {
         timeOut =  '';
      }

      return (
         <TouchableOpacity style={this.props.style} onPress={this._toggleMap}>
            {(this.state.showMapIn) ? <Map coords={punch.locationIn}/> :null}
            {(this.state.showMapOut) ? <Map coords={punch.locationOut}/> :null}
            <View style={styles.punchInfoBox}>
               <View style={styles.textRow}>
                  <Text>In:</Text>
                  <Text>{ TimerStamp.getPrettyTime(punch.timestampIn) }</Text>
               </View>
               <View style={styles.textRow}>
                  <Text>Out:</Text>
                  <Text>{ timeOut }</Text>
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