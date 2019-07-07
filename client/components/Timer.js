import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TimerStamp from '../util/TimerStamp';

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
			counter = TimerStamp.getCounter(now, lastPunch);
			timeDisplay = TimerStamp.getPrettyTimeTimmed(lastPunch) + " - " + TimerStamp.getPrettyTimeTrimmed(now);
		} else {
			counter = "00:00";
			timeDisplay = TimerStamp.getPrettyTimeTrimmed(now);
		}
		return (
			<View style={styles.timer}>
				<Text style={styles.counter}>{ counter }</Text>
				<Text style={styles.lastPunch}>{ timeDisplay }</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  timer: {
	 
  },
  counter: {

  },
  lastPunch: {

  }
});