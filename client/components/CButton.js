import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export default class CButton extends React.Component {
   render(){
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={this.props.onPress}
        >
          <Text styles={styles.text} >{ this.props.title }</Text>
        </TouchableOpacity>
      );
   }
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: "#00b5ec",
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
  },
  text: {
      fontSize: 24,
      color: 'white',
  }
});