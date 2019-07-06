import React from "react";
import { connect } from 'react-redux';
import {Text, View, StyleSheet} from "react-native";
import PunchList from '../../components/PunchList';
import ScreenHOC from '../ScreenHOC'

class EmployeeReportScreen extends React.Component {
   
   static navigationOptions = {
      drawerLabel: 'Employee Reports'
   };

   render() {
      console.log('EmployeeReportsScreen render');
      const user = this.props.navigation.getParam("user");
      return (
         <View style={styles.content}>
            <Text style={styles.title}>{ user.username }</Text>
            <PunchList email={user.email} />
         </View>
      );
   }

}

const mapDispatchToProps = (dispatch) => {
  return {  
      toggleAdmin: () => {dispatch()}
  }
}

const mapStateToProps = (state) => {
   return {
      
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeReportScreen);

const styles = StyleSheet.create({
   content: {
      marginTop: 20,
   },
   title: {
      fontSize: 20,
      textAlign: 'center',
   }
});