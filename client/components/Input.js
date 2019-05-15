import React from 'react';
import {TextInput} from 'react-native';

class Input extends React.Component {
   render(){
      return (
         <TextInput
           style={styles}
           onChangeText={(text) => this.setState({text})}
           value={this.state.text}
         />
      );
   }
}

const styles = StyleSheet.create({height: 40, borderColor: 'gray', borderWidth: 1});