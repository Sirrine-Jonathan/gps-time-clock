import React from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import TimerStamp from '../util/TimerStamp';


export default class SinglePunch extends React.Component {

   state = {
      showMap: false
   }

   _toggleMap = () => {
      this.setState({ showMap: !this.state.showMap });
   }

   render() {
      let { punch } = this.props;
      return (
         <TouchableOpacity style={this.props.style} onPress={this._toggleMap}>
            <View style={styles.punchInfoBox}>
               <View style={styles.textRow}>
                  <Text>In:</Text>
                  <Text>{ TimerStamp.getPrettyTime(punch.timestampIn) }</Text>
               </View>
               <View style={styles.textRow}>
                  <Text>Out:</Text>
                  <Text>{ TimerStamp.getPrettyTime(punch.timestampOut) }</Text>
               </View>
            </View>
            <View style={styles.mapContainer}>
             {(this.state.showMap) ? <Text>-Map Component Here-</Text>:null}
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