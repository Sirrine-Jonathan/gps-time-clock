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
      let lastPunchTime = new Date().toLocaleTimeString('en-US') + ' - ' + new Date().toLocaleTimeString('en-US');
      let counter = "00:00";
      if (lastPunch && punchedIn){
         counter = TimerStamp.getCounter(now, lastPunch);
         lastPunchTime = new Date(lastPunch).toLocaleTimeString('en-US') + ' - ' + new Date().toLocaleTimeString('en-US');
      }
      return (
         <View style={this.props.timerStyle}>
            <Text style={this.props.counterStyle}>{ counter }</Text>
            <Text style={this.props.lastPunchStyle}>{ lastPunchTime }</Text>
         </View>
      )
   }
}