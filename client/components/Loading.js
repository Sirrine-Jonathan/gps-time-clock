import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

export default class Loading extends React.Component {
    render(){
        let {onChangeText, placeholder, value, error} = this.props;
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});