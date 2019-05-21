import React from 'react';
import {View, StyleSheet} from 'react-native';

export default class FormDiv extends React.Component {
   render(){
      return (
        <View style={styles}>
          {this.props.children}
        </View>
      );
   }
}

const styles = StyleSheet.create({
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "center",
  padding: 5,
});