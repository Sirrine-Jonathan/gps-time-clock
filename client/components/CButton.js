import React from 'react';
import { TouchableHighlight, Text, StyleSheet, ActivityIndicator, View } from 'react-native';

export default class CButton extends React.Component {
  render(){
    const { onPress, title, loading } = this.props;
    return (
      <TouchableHighlight style={styles.container} onPress={onPress} >
        <View style={styles.inner} >
          <Text style={styles.text}>{ title }</Text>
          { (loading) ? <ActivityIndicator style={styles.loader}size="small" color="#ffffff" />:null }
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00b5ec",
  },
  inner: {
    flexDirection: 'row',
  },
  text: {
    color: "#ffffff",
    fontSize: 20
  },
  loader: {
    position: 'relative',
    top: 0,
    left: 10,
  }
});