import React from "react";
import { connect } from 'react-redux';
import {Text, View, StyleSheet} from "react-native";
import PunchList from '../../components/PunchList';
import RangeButton from '../../components/RangeButton';
import DateTimePicker from "react-native-modal-datetime-picker";

class ReportsScreen extends React.Component {

   state = {
      isDatePickerVisible: false,
      isFirstButton: null,
      firstDate: 'Select Date',
      secondDate: 'Select Date'
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
         this.setState({firstDate: (date.getMonth() + 1).toString() + "-" + date.getDate().toString() + "-" + date.getFullYear().toString()})
      }
      if (!this.state.isFirstButton) {
         this.setState({secondDate: (date.getMonth() + 1).toString() + "-" + date.getDate().toString() + "-" + date.getFullYear().toString()})
      }
      this._hideDateTimePicker();
   };

   render() {

      return (
         <View style={styles.content}>
            <View style={styles.range}>
               <RangeButton onPress={this._firstButtonActions} title={this.state.firstDate}/>
               <Text style={styles.text}> - </Text>
               <RangeButton onPress={this._secondButtonActions} title={this.state.secondDate}/>
            </View>
            <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
            />
            <PunchList email={this.props.user.email} />
         </View>
      );
   }

}

const mapDispatchToProps = (dispatch) => {
  return {  

  }
}

const mapStateToProps = (state) => {
   return {
      user: state.user,
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportsScreen);

const styles = StyleSheet.create({
   content: {
      marginTop: 20,
   },
   title: {
      fontSize: 20,
      textAlign: 'center',
   },
   range: {
      flexDirection: 'row',
      width: '100%',
      padding: 20,
   },
   text: {
      fontSize: 24,
   }
});