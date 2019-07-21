import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export default class CLink extends React.Component {
	 render(){
	 		let { color } = this.props;
	 		if (!color)
	 			color = "#333";
			return (
				<TouchableOpacity style={styles.container} onPress={this.props.onPress} >
					<Text style={{ color: color }} >{ this.props.title }</Text>
				</TouchableOpacity>
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