import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class ExportButton extends React.Component {

    render() {
        let hide = this.props.hide;
        if (hide) {
            return null;
        }
        else {
            return (
                <TouchableOpacity style={styles.buttonStyle} onPress={this.props.onPress}>
                    <Text style={styles.textStyle}>
                        {this.props.text}
                    </Text>
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        height:45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#00b5ec",
    }
});