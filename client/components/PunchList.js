import React from "react";
import { connect } from 'react-redux';
import {Text, View, ScrollView, StyleSheet, FlatList} from "react-native";
import { getPunches } from '../redux/actions/appActions';
import SinglePunch from './SinglePunch';


class PunchList extends React.Component {

   state = {
       punches: null,
       punchList: null,
   };

   componentWillMount(){
      this._getPunches(this.props.email);
   }

   _getPunches = async (email) => {
      let punches = await this.props.getPunches(email);
      this.setState({ punches });
   };

   _getPunchList = (date1, date2) => {
       console.log(this.state.punches);
       let punchArray = [];
       if(this.state.punchList == null) return;
       this.state.punches.forEach(function(element) {
           console.log('here');
           if (date1 >= element.timestampIn && date2 <= element.timestampOut) {
               punchArray.push(element);
           }
       });
       this.setState({punchList: punchArray});
   };

   render() {
       this._getPunchList(this.props.firstDate, this.props.secondDate);
      let { punchList } = this.state;
      if (!punchList || !punchList.length)
         punchList = [];
      punchList.reverse();
      const listItems = punchList.map((punch) =>
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
      backgroundColor: '#e0e0e0',
      borderRadius: 5
    }
});