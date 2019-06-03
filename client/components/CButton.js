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
    backgroundColor: '#DDDDDD',
    padding: 15,
    margin: 5,
    marginTop: 10,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
  }
});