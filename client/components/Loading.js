import React from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';

export default class Loading extends React.Component {
   render(){
      console.log('in loading');
      return (
         <View>
            <Text>Loading...</Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   
});

/*
<ActivityIndicator size="large" color="#0000ff" />
*/