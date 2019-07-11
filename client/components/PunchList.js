import React from "react";
import { connect } from 'react-redux';
import {Text, View, ScrollView, StyleSheet, FlatList} from "react-native";
import { getPunches } from '../redux/actions/appActions';
import SinglePunch from './SinglePunch';
import FormatStamp from '../util/FormatStamp';

export default class PunchList extends React.Component {

   render() {
      let { punches } = this.props;
      if (!punches || !punches.length){
          punches = [];
      }
      punches.reverse();
      const listItems = punches.map((punch) => (
          <View style={styles.punchRow}>
             <SinglePunch punch={punch} style={styles.punch}/>
          </View>
      ));
  		return (
  			<ScrollView>
  				{ listItems }
  			</ScrollView>
  		);
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
    },
    total: {
        padding: 10
    },
    punchList: {
      marginTop: 40,
      marginBottom: 60
    },
    punchRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center', 
      alignContent: 'stretch',
    },
    punch: {
      margin: 10,
      padding: 10,
      flex: 1,
      backgroundColor: '#ffffff',
      backgroundColor: '#f2f2f2',
      borderRadius: 5
    }
});