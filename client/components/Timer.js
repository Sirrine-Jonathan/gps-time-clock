import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import TimerStamp from '../util/TimerStamp';

class Timer extends React.Component {

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
      let lastPunchTime = new Date().toLocaleTimeString() + ' - ' + new Date().toLocaleTimeString();
      let counter = "00:00";
      if (lastPunch && punchedIn){
         counter = TimerStamp.getCounter(now, lastPunch);
         lastPunchTime = new Date(lastPunch).toLocaleTimeString() + ' - ' + new Date().toLocaleTimeString();
      }
      return (
         <View>
            <Text>{ counter }</Text>
            <Text>{ lastPunchTime }</Text>
         </View>
      )
   }
}

const mapDispatchToProps = (dispatch) => {
  return {  

  }
}

const mapStateToProps = (state) => {
  return {
      lastPunch: state.lastPunch,
      punchedIn: state.punchedIn,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);