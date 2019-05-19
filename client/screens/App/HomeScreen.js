import React from "react";
import {Text, View} from "react-native";

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Home'
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>GPS Time Clock</Text>
            </View>
        );
    }
}