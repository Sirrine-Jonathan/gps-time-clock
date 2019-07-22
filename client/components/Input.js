import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, TextInput } from "react-native";

const icons = {
	"key": require("../assets/key.png"),
	"msg": require("../assets/msg.png"),
	"at": require("../assets/at.png"),
	"building": require("../assets/building.png"),
	"idcard": require("../assets/idcard.png"),
	"letter": require("../assets/letter.png"),
	"letter_box": require("../assets/letter_box.png"),
	"locked_quote": require("../assets/locked_quote.png")
}

const normalColor = "#ffffff";
const warningColor = "#ff4747";


export default class Input extends React.Component {

	_mapImage = (src) => {
		return (icons[src]) ? icons[src]:icons["msg"];
	}

   render(){
   	const { imageSrc, containsError } = this.props;
   	let warningStyle = {
        "borderColor": normalColor
    }
   	if (containsError){
   		warningStyle = { 
        "borderColor": warningColor
      }
   	}
      return (
        <View style={[styles.inputContainer, warningStyle]}>
            <Image style={styles.inputIcon} source={this._mapImage(imageSrc)}/>
            <TextInput
					style={styles.input}
					placeholder={this.props.placeholder}
					keyboardType={this.props.keyboardType}
					secureTextEntry={this.props.secureTextEntry}
					onChangeText={this.props.onChangeText}
					underlineColorAndroid='transparent'
					value={this.props.value}
            />
        </View>
      );
   }
}

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    borderWidth: 3,
    borderBottomWidth: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems:'center',
  },
  inputIcon: {
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  input: {
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1
  },
  valid: {
    borderColor: '#f2f2f2'
  },
  error: {
    borderColor: '#f44b4b'
  }
});

Input.propTypes = {
	imageSrc: PropTypes.string,
	placeholder: PropTypes.string,
	keyboardType: PropTypes.string,
	onChangeText: PropTypes.func.isRequired,
	secureTextEntry: PropTypes.bool,
	containsError: PropTypes.bool,
	value: PropTypes.string
}

Input.defaultProps = {
	imageSrc: "msg",
	placeholder: 'Input',
	keyboardType: 'default',
	onChangeText: console.log,
	secureTextEntry: false,
	containsError: false,
	value: ''
}