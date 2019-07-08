import React from 'react';
import PropTypes from 'prop-types';
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
		width: 250,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	text: {
		color: '#333'
	}
});

CLink.propTypes = {
	title: PropTypes.string,
	onPress: PropTypes.func.isRequired,
}

CLink.defaultProps = {
	title: "Link",
	onPress: () => {console.log('empty link')}
}