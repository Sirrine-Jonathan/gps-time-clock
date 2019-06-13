import React from 'react';
import {StyleSheet, Text} from 'react-native';

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


/*
<ActivityIndicator size="large" color="#0000ff" />
*/