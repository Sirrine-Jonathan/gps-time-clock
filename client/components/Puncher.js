import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import Timer from './Timer';
import Abutton from 'react-native-really-awesome-button/src/themes/rick';
const punchOut = require("../assets/stop.png");
const punchIn = require("../assets/play.png");
export default class Puncher extends React.Component {
   render(){
   	  let buttonText = "";
   	  let src = "";
   	  if (this.props.punchedIn){
   	  	src = punchOut;
   	  	buttonText ="Punch Out";
   	  } else {
   	  	src = punchIn;
   	  	buttonText = "Punch In";
   	  }

   	  
      return (
         <View style={this.props.style}>
            <TouchableOpacity 
              style={styles.btn}
              onPress={this.props.togglePunch}
            >
      			  <Image style={styles.icon} source={src}/>
      			  {/*<Text style={styles.text}>{ buttonText }</Text>*/}
            </TouchableOpacity>
         </View>
      );
   }
}

/* backup of old view contents */
/*
            <Abutton
              stretch={true}
              backgroundColor={"#00b5ec"}
              onPress={this.props.togglePunch}
              textColor={'white'}
            >
              <Image style={styles.icon} source={src}/>
              <Text style={styles.text}>{ buttonText }</Text>
            </Abutton>
*/

const styles = StyleSheet.create({
	icon: {
    color: '#fff',
  },
	text: {
    color: '#fff',
    fontSize: 60
	},
  btn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  }
});