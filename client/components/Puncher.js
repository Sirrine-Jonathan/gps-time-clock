import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Timer from './Timer';
import Abutton from 'react-native-really-awesome-button/src/themes/rick';

export default class Puncher extends React.Component {
   render(){
      return (
         <View style={this.props.style}>
            <Abutton
              stretch={true}
              backgroundColor={"#00b5ec"}
              onPress={this.props.togglePunch}
              textColor={'white'}
            >
              <Text>
              {
                (this.props.punchedIn) 
                ? "Punch Out"
                : "Punch In"
              }
              </Text>
            </Abutton>
         </View>
      );
   }
}

const styles = StyleSheet.create({

});