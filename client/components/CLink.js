import React from 'react';
import {TouchableHighlight, Text, StyleSheet} from 'react-native';

export default class CLink extends React.Component {
	 render(){
			return (
				<TouchableHighlight style={styles.container} onPress={this.props.onPress} >
					<Text style={styles.text} >{ this.props.title }</Text>
				</TouchableHighlight>
			);
	 }
}

const styles = StyleSheet.create({
	container: {
		height: 45,
		marginBottom:20,
		width:250,
		borderRadius:30
	},
	text: {
		color: '#333'
	}
});