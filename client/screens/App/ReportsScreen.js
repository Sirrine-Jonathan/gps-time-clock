import React from "react";
import { connect } from 'react-redux';
import {Text, View, StyleSheet} from "react-native";
import { NavigationEvents } from "react-navigation";
import PunchList from '../../components/PunchList';
import RangeButton from '../../components/RangeButton';
import BackgroundImage from '../../components/BackgroundImage';
import DateTimePicker from "react-native-modal-datetime-picker";
import FormatStamp from "../../util/FormatStamp";
import { getPunches, setReportsUser } from '../../redux/actions/appActions';

class ReportsScreen extends React.Component {

   state = {
      isDatePickerVisible: false,
      isFirstButton: null,
      firstDate: null,
      secondDate: null,
      firstDateDisplay: 'Select Date',
      secondDateDisplay: 'Select Date',
      totalHours: 0,
   };

   static navigationOptions = {
      drawerLabel: 'Reports',
      title: 'Reports'
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
   };

   _filterPunches = (punches) => {
   	   let start = FormatStamp.getUnix(this.state.firstDate); console.log('startDate: ', start);
   	   let end = FormatStamp.getUnix(this.state.secondDate); console.log("endDate: ", end);
       if (!punches){
          punches = this.props.getPunches(this.props.globalUser.email);
       };
       if (!punches){
          return [];
       };

       punches = punches.filter((element) => {
          if (!start && !end){
              return true;
          } else if (!start && end){
          	  return (element.timestampOut && end >= element.timestampOut);
          } else if (start && !end){
          	  return (start <= element.timestampIn);
          } else {
          	  return (start <= element.timestampIn && ((element.timestampOut && end >= element.timestampOut) || !element.timestampOut));
          }
       });
       return punches;
   };

   _getTotal = (punches) => {
      let totalHours = 0;
      if (!punches){ 
         return 0;
      }

      punches.forEach((punch) => {
           let punchHours = FormatStamp.getHoursUnformatted(punch.timestampIn, punch.timestampOut);
           if (!isNaN(punchHours)) {
               totalHours += FormatStamp.getHoursUnformatted(punch.timestampIn, punch.timestampOut);
           }
      });

      let milliseconds = totalHours * 60000 * 60;
      return FormatStamp.getPrettyTotal(milliseconds);
   }

   // this is just a paranoia check
   _filterUser = (user) => {
      if (user){
        return user; 
      } else {
      	console.log("Reports Screen couldn't find requested user");
      	console.log('Fell back got current user: ');
        return this.props.globalUser;
      }
      console.log(user);
   }

   render() {
   	let { user, punches, setReportsUser } = this.props;
    user =this._filterUser(user);
    punches = this._filterPunches(punches);
    let total = this._getTotal(punches);
      return (
         <BackgroundImage>
         <View style={styles.content}>
           <NavigationEvents 
            onWillBlur={() => {
              console.log('didBlur');
              setReportsUser(this.props.globalUser)
            }}
          />
         	<View style={styles.header}>
	            <View style={styles.userInfo}>
	               <Text style={styles.username}>{ user.username }</Text>
	               <Text style={styles.company}>{ user.company }</Text>
	            </View>
	            <View style={styles.range}>
	               <RangeButton onPress={this._firstButtonActions} title={this.state.firstDateDisplay}/>
	               <Text style={styles.text}> - </Text>
	               <RangeButton onPress={this._secondButtonActions} title={this.state.secondDateDisplay}/>
	            </View>
               <View style={styles.total}>
                  <Text style={styles.totals}>{ total }</Text>
               </View>
            </View>
            <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
            />
            <PunchList punches={punches}/>
         </View>
         </BackgroundImage>
      );
   }

}

const mapDispatchToProps = (dispatch) => {
  return {  
    getPunches: (email) => dispatch(getPunches(email)), 
    setReportsUser: (user) => dispatch(setReportsUser(user))
  }
}

const mapStateToProps = (state) => {
  return {
    globalUser: state.user,
    user: state.reportsUser,
    punches: state.reportsUsersPunches
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
   },
   text: {
      color: "#fff",
      fontSize: 24,
   },
   totals: {
    color: "#fff",
    textAlign: 'center',
    fontSize: 20,
   },
   username: {
    color: "#fff",
   	fontSize: 25,
   },
   company: {
    color: "#fff",
   	fontSize: 20,
   }
});