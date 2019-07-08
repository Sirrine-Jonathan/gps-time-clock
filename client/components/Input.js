import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, TextInput } from "react-native";

const icons = {
	"key": {
		"hosted": "https://png.icons8.com/key-2/ultraviolet/50/3498db",
		"local": require("../assets/key.png")
	},
	"msg": {
		"hosted": "https://png.icons8.com/message/ultraviolet/50/3498db",
		"local": require("../assets/msg.png")
	}
}


export default class Input extends React.Component {

	_mapImage = (src, type) => {
		if (icons[src] && icons[src][type])
			return icons[src][type];
		else 
			return "https://png.icons8.com/message/ultraviolet/50/3498db"
	}

	/*
		Param 'type' can be 'hosted' or 'local'
	*/
	_getImageSource = (type) => {
		let key = this.props.imageSrc;
		let url = this._mapImage(key, type);
		if (type == "local"){
			return url;
		} else {
			return { uri: url };
		}
	}

   render(){
   	const TYPE = "hosted";
   	console.log("images are being served by: " + TYPE);
      return (
        <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={this._getImageSource(TYPE)}/>
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
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems:'center'
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