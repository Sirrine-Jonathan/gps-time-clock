import React from 'react';
import {StyleSheet, View, Image, TextInput} from 'react-native';

export default class CButton extends React.Component {
    render(){
        return (
            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={this.props.imageUri}/>
                <TextInput style={styles.inputs}
                           placeholder={this.props.placeHolder}
                           underlineColorAndroid='transparent'
                           secureTextEntry={this.props.security}
                           error={this.props.error}
                           value={this.props.email}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
    },
});