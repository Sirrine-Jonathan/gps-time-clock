import React from "react";
import { connect } from 'react-redux';
import {Text, View, StyleSheet} from "react-native";
import PunchList from '../../components/PunchList';
import RangeButton from '../../components/RangeButton';
import DateTimePicker from "react-native-modal-datetime-picker";
import { getPunches } from '../../redux/actions/appActions';

class ReportsScreen extends React.Component {

   state = {
      isDatePickerVisible: false,
      isFirstButton: null,
      firstDate: null,
      secondDate: null,
      firstDateDisplay: 'Select Date',
      secondDateDisplay: 'Select Date',
      puches: [],
      user: null,
      totalHours: 0,
   };

   static navigationOptions = {
      drawerLabel: 'Reports',
      title: 'Reports'
   };


   componentWillMount(){
      let user = this.props.navigation.getParam("user", this.props.user);
      this._getPunches(user.email);
      this.setState({user});
   }

   _getPunches = async (email) => {
      let punches = await this.props.getPunches(email);
      await this.setState({ punches });
      this._handleDateChange();
   };

   _firstButtonActions = () => {
      this.setState({ isFirstButton: true});
      this.setState({ isDateTimePickerVisible: true });
   };

   _secondButtonActions = () => {
      this.setState({ isFirstButton: false});
      this.setState({ isDateTimePickerVisible: true });
   };

   _hideDateTimePicker = () => {
      this.setState({ isDateTimePickerVisible: false });
      this.setState({ isFirstButton: null });
   };

   _handleDatePicked = (date) => {
      console.log("A date has been picked: ", date);
      // make sure a button is actually selected and not null
      if (this.state.isFirstButton) {
         this.setState({firstDateDisplay: (date.getMonth() + 1).toString() + "-" + date.getDate().toString() + "-" + date.getFullYear().toString()})
         this.setState({firstDate: date});
      }
      if (!this.state.isFirstButton) {
         this.setState({secondDateDisplay: (date.getMonth() + 1).toString() + "-" + date.getDate().toString() + "-" + date.getFullYear().toString()})
         this.setState({secondDate: date})
      }
      this._hideDateTimePicker();
      this._handleDateChange();
   };

   _handleDateChange = () => {
   	   let date1 = this.state.firstDate;
   	   let date2 = this.state.secondDate;
   	   let { punches } = this.state;
       let punchArray = [];

       if (punches == null) return;
       console.log("_getPunchList called");
       punches = punches.filter((element) => {
         if (!date1 && !date2){
            return true;
         } else if (!date1 && date2){
         	return (date2 <= element.timestampOut);
         } else if (date1 && !date2){
         	return (date1 >= element.timestampIn);
         } else {
         	return (date1 >= element.timestampIn && date2 <= element.timestampOut);
         }
       });
       this.setState({punches});
       this._getTotal();
   };

   _getTotal = () => {
      let  { punches } = this.state;
      let totalHours = 0;
      punches.forEach((punch) => {
           let punchHours = FormatStamp.getHoursUnformatted(punch.timestampIn, punch.timestampOut);
           if (!isNaN(punchHours)) {
               totalHours += FormatStamp.getHoursUnformatted(punch.timestampIn, punch.timestampOut);
           }
      });
      totalHours = totalHours.toFixed(2)
      this.setState({ totalHours });
   }

   render() {
   	let { punches, user } = this.state;
      return (
         <View style={styles.content}>
            <View>
               <View style={styles.range}>
                  <View style={styles.userInfo}>
                     <Text style={styles.username}>{ user.username }</Text>
                     <Text style={styles.company}>{ user.company }</Text>
                  </View>
                  <RangeButton onPress={this._firstButtonActions} title={this.state.firstDateDisplay}/>
                  <Text style={styles.text}> - </Text>
                  <RangeButton onPress={this._secondButtonActions} title={this.state.secondDateDisplay}/>
                 <View style={styles.total}>
                     <Text>Total Hours: { this.state.totalHours }</Text>
                 </View>
               </View>
            </View>
            <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
            />
            <PunchList punches={punches}/>
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
      user: state.user,
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportsScreen);

const styles = StyleSheet.create({
   total: {
      padding: 10,
   },
   header: {
   	paddingTop: 15,
   },
   userInfo: {
   	alignItems: 'center',
   	paddingTop: 10,
   	padding: 5,
   },
   content: {

   },
   title: {
      fontSize: 20,
      textAlign: 'center',
   },
   range: {
      flexDirection: 'row',
      width: '100%',
      paddingTop: 20,
      paddingLeft: 10,
      paddingRight: 10,
      padding: 10,
   },
   text: {
      fontSize: 24,
   },
   username: {
   	fontSize: 25,
   },
   company: {
   	fontSize: 20,
   }
});