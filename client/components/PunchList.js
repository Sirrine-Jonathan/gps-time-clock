import React from "react";
import { connect } from 'react-redux';
import {Text, View, ScrollView, StyleSheet, FlatList} from "react-native";
import { getPunches } from '../redux/actions/appActions';
import SinglePunch from './SinglePunch';


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
			<ScrollView style={styles.scroll}>
				{ listItems }
			</ScrollView>
		);
    }
}

const styles = StyleSheet.create({
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
      borderRadius: 5
    },
    scroll: {
      height: '100%',
    }
});