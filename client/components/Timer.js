import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FormatStamp from '../util/FormatStamp';

export default class Timer extends React.Component {

	state = {
		now: Date.now()
	}

	componentDidMount(){
		this.interval = setInterval(() => this.setState({ now: Date.now() }), 1000);
	}

	componentWillUnmount(){
		clearInterval(this.interval);
	}

	render(){
		let { now } = this.state;
		let { lastPunch, punchedIn } = this.props;
		let counter;
		let timeDisplay;
		if (lastPunch && punchedIn){
			counter = FormatStamp.getCounter(now, lastPunch);
			timeDisplay = FormatStamp.getTime(lastPunch) + " - " + FormatStamp.getTime(now);
		} else {
			counter = "00:00";
			timeDisplay = FormatStamp.getTime(now);
		}
		return (
			<View style={styles.timer}>
				<Text style={styles.counter}>{ counter }</Text>
				<Text style={styles.timeDisplay}>{ timeDisplay }</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	timer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5
	},
	counter: {
		fontSize: 60
	},
	timeDisplay: {
		fontSize: 30
	}
});