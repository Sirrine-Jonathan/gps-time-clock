import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export default class CButton extends React.Component {
   render(){
      return (
        <TouchableOpacity
          style={styles}
          onPress={this.props.onPress}
        >
          <Text>{ this.props.title }</Text>
        </TouchableOpacity>
      );
   }
}

const styles = StyleSheet.create({
  backgroundColor: '#DDDDDD',
  padding: 10,
  margin: 5,
  marginTop: 10,
});