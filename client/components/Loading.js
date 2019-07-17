import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

export default class Loading extends React.Component {
   render(){
      return (
         <View>
            <ActivityIndicator size="large" color="#00b5ec" />
         </View>
      );
   }
}