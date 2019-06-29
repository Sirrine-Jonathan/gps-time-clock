import React from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";

const Row = (component) => {
   render() {
      return (
         <TouchableOpacity style={styles.item} onPress={this.props.onPress}>
            { this.props.children }
         </TouchableOpacity>
      );
   }
}

export default Row;

const styles = StyleSheet.create({
   item: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center', 
      alignContent: 'stretch',
   }
});