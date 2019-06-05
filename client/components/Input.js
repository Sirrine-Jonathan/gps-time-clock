import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default class Input extends React.Component {
   render(){
      let {onChangeText, placeholder, value, error} = this.props;
      return (
         <TextInput
           style={[styles.base, error ? styles.error:styles.valid]}
           onChangeText={onChangeText}
           value={value}
           placeholder={placeholder}
         />
      );
   }
}

const styles = StyleSheet.create({
  base: {
    height: 40, 
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  valid: {
    borderColor: '#f2f2f2', 
  },
  error: {
    borderColor: '#f44b4b'
  }
});