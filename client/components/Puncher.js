import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Timer from './Timer';

export default class Puncher extends React.Component {
   render(){
      return (
         <View style={this.props.containerStyle}>
            <Timer 
               lastPunch={this.props.lastPunch} 
               punchedIn={this.props.punchedIn}
               timerStyle={this.props.timerStyle} 
               counterStyle={this.props.counterStyle}
               lastPunchStyle={this.props.lastPunchStyle}
            />
            <TouchableOpacity
             style={this.props.btnStyle}
             onPress={this.props.togglePunch}
            >
             <Text>{(this.props.punchedIn) ? "Punch Out":"Punch In"}</Text>
            </TouchableOpacity>
         </View>
      );
   }
}