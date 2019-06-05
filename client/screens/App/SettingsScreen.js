import React from "react";
import {Text, View, StyleSheet} from "react-native";

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Settings'
    };

    render() {
        return (
            <View style={styles.content}>
                <Text>Settings</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
   content: {
      marginTop: 20,
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
   }
});