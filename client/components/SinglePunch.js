import React from "react";
import {Text, View, StyleSheet} from "react-native";


export default class SinglePunch extends React.Component {

   render() {
      let { punch } = this.props;
      return (
         <View style={styles.content}>
             <Text>Time In: { punch.timestampIn }</Text>
             <Text>Time Out: { punch.timestampOut }</Text>
         </View>
      );
   }

}

const styles = StyleSheet.create({
    content: {

    }
});