import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';

export default class CButton extends React.Component {
  render(){
    const { onPress, title, loading, color } = this.props;
    let finalColor = (color) ? color:"#00b5ec";
    return (
      <TouchableOpacity style={[styles.container, {"backgroundColor": finalColor}]} onPress={onPress} >
        <View style={styles.inner} >
          <Text style={styles.text}>{ title }</Text>
          { (loading) ? <ActivityIndicator style={styles.loader}size="small" color="#ffffff" />:null }
        </View>
      </TouchableOpacity>
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
  },
  inner: {
    flexDirection: 'row',
  },
  text: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  loader: {
    position: 'relative',
    top: 0,
    left: 10,
  }
});