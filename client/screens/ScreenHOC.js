import React from "react";
import { View } from 'react-native';
import { Header } from "react-native-elements";


const ScreenHOC = (Screen) => {
   return class extends React.Component {
      render(){
         return (
            <View>
               <Header
                 placement="left"
                 centerComponent={{ text: 'GPS-Time-Clock', style: { color: '#fff' } }}
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