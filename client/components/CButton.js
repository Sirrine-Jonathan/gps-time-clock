import React from 'react';
import {TouchableHighlight, Text, StyleSheet} from 'react-native';

export default class CButton extends React.Component {
	render(){
		return (
			<TouchableHighlight style={styles.container} onPress={this.props.onPress} >
					<Text style={styles.text}>{ this.props.title }</Text>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height:45,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom:20,
		width:250,
		borderRadius:30,
		backgroundColor: "#00b5ec",
	},
	text: {
		color: "#ffffff"
	}
});