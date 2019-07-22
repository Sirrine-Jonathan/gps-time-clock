import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';

export default class ExportButton extends React.Component {

    render() {
        let hide = this.props.hide;
        let loading = this.props.loading;
        if (hide) {
            return null;
        }
        else {
            return (
                <TouchableOpacity style={styles.buttonStyle} onPress={this.props.onPress}>
                    <View style={styles.inner}>
                        <Text style={styles.textStyle}> {this.props.text} </Text>
                        { (loading) ? <ActivityIndicator style={styles.loader}size="small" color="#ffffff" />:null}
                    </View>
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
    inner: {
        flexDirection: 'row',
    },
    buttonStyle: {
        height:45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#00b5ec",
    },
    loader: {
        position: 'relative',
        top: 0,
        left: 10,
    }
});