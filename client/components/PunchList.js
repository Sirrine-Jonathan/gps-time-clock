import React from "react";
import { connect } from 'react-redux';
import {Text, View, ScrollView, StyleSheet, FlatList} from "react-native";
import { getPunches } from '../redux/actions/appActions';
import SinglePunch from './SinglePunch';
import FormatStamp from '../util/FormatStamp';

class PunchList extends React.Component {

   state = {
       punchList: null,
       totalHours: 'Select Dates',
   };

   componentWillMount(){
      this._getPunches(this.props.email);
   }

   _getPunches = async (email) => {
      let punchList = await this.props.getPunches(email);
      punchList.reverse();
      this.setState({ punchList });
   };



   render() {
        let { punchList } = this.state;
        let displayHour = this.state.totalHours;
        let hours = 0;
        if (!punchList || !punchList.length)
            punchList = [];

        const listItems = punchList.map((punch) => {

            if (this.props.firstDate != null && this.props.secondDate != null) {
                let timeIn =  punch.timestampIn;
                if (timeIn >= this.props.firstDate.getTime() && timeIn <= this.props.secondDate.getTime()) {
                    // used to add the total hours
                    let punchHours = FormatStamp.getHoursUnformatted(punch.timestampIn, punch.timestampOut);
                    if (!isNaN(punchHours)) {
                        hours += FormatStamp.getHoursUnformatted(punch.timestampIn, punch.timestampOut);
                    }
                   return (
                       <View style={styles.punchRow}>
                        <SinglePunch punch={punch} style={styles.punch}/>
                    </View>
                   )
                }

            } else {
                return (
                    <View style={styles.punchRow}>
                        <SinglePunch punch={punch} style={styles.punch}/>
                    </View>
                )
            }
        }
      );
        if (hours > 0) {
            displayHour = hours.toFixed(2);
        }

      return (
          <View style={styles.container}>
              <View style={styles.total}>
                  <Text>Total Hours: { displayHour }</Text>
              </View>
              <ScrollView style={styles.punchList}>
                  { listItems }
              </ScrollView>
          </View>
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
      backgroundColor: '#f2f2f2',
      borderRadius: 5
    }
});