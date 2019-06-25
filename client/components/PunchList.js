import React from "react";
import { connect } from 'react-redux';
import {Text, View, ScrollView, StyleSheet, FlatList} from "react-native";
import { getPunches } from '../redux/actions/appActions';
import SinglePunch from './SinglePunch';


class PunchList extends React.Component {

   state = {
      punches: null
   }

   componentWillMount(){
      this._getPunches(this.props.email);
   }

   _getPunches = async (email) => {
      let punches = await this.props.getPunches(email);
      this.setState({ punches });
   }

   render() {

      let { punches } = this.state;
      if (!punches || !punches.length)
         punches = [];
      const listItems = punches.map((punch) => 
         (
            <View style={styles.punchRow}>
               <SinglePunch punch={punch} style={styles.punch}/>
            </View>
         )
      );

      return (
         <ScrollView style={styles.punchList}>
            { listItems }
         </ScrollView>
      );
   }

}

const mapDispatchToProps = (dispatch) => {
  return {  
      getPunches: (email) => dispatch(getPunches(email)), 
  }
}

const mapStateToProps = (state) => {
   return {

   }
}

export default connect(mapStateToProps, mapDispatchToProps)(PunchList);

const styles = StyleSheet.create({
    punchList: {

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
      backgroundColor: '#e0e0e0',
      borderRadius: 5
    }
});