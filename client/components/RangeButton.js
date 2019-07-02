import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export default class RangeButton extends React.Component {
    render(){
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={this.props.onPress}
            >
                <Text styles={styles.buttonText} >{ this.props.title }</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#00b5ec",
        height:35,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        borderRadius:5,

    },
    buttonText: {
        fontSize: 24,
        color: "#ffffff",
    }
});