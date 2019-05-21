import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default class CButton extends React.Component {
   render(){
      return (
         <TextInput
           style={styles}
           onChangeText={this.props.onChangeText}
           value={this.props.value}
           placeholder={this.props.placeholder}
         />
      );
   }
}

const styles = StyleSheet.create({
  height: 40, 
  borderColor: '#f2f2f2', 
  borderWidth: 1,
  borderRadius: 5,
  padding: 5,
  margin: 5,
});