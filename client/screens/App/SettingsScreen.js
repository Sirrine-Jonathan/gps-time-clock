import React from "react";
import {Text, View} from "react-native";

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Settings'
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Settings Screen</Text>
            </View>
        );
    }
}