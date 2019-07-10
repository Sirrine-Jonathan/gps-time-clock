import React from "react";
import { View, StyleSheet } from 'react-native';
import { Header } from "react-native-elements";


const ScreenHOC = (Screen, title) => {
   return class extends React.Component {
      render(){
         return (
            <View style={styles.container}>
               <Header
                 placement="left"
                 centerComponent={{ text: title, style: { color: '#fff' } }}
                 rightComponent={{ icon: 'menu', color: '#fff', onPress:
                  () => {
                    this.props.navigation.toggleDrawer();
                  }
                 }}
               />
                  <Screen { ...this.props } />
            </View>
         )
      }
   }
}

export default ScreenHOC;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#DCDCDC',
	}
});