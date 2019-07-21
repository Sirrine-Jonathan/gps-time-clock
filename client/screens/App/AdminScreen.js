import React from "react";
import { connect } from 'react-redux';
import {Text, View, StyleSheet, ScrollView} from "react-native";
import { getCompanyUsers } from '../../redux/actions/appActions';;
import SingleUser from '../../components/SingleUser';
import BackgroundImage from '../../components/BackgroundImage';

class AdminScreen extends React.Component {

   componentWillMount(){
      this.props.getCompanyUsers();
   }

   _updateCompanyUsersState = () => {
      console.log('_updateCompanyUsersState');
      this.props.getCompanyUsers();
      //console.log(this.props.users);
   }

   _getInfo = (user) => {
      return {
        "lastPunch": 1562734295986,
        "location": "48.169226, -122.4830126",
        "punchedIn": false,
      }
   }

   _mapUsersToRows = (user) => {
      return (<SingleUser 
         id={user._id}
         user={user} 
         navigation={this.props.navigation}
         punchInfo={this._getPunchInfo(user.email)}
         update={this._updateCompanyUsersState}
      />)
   }

   _getPunchInfo = async (email) => {
      let punchInfo = null;
      const url = "https://gps-time.herokuapp.com/time/getLastPunch?email=" + email;
      await fetch (url, {}).then((res) => {
         res.json().then((data) => {
            if (!data.error)
               punchInfo = data;
         })
      }).catch((err) => {
         console.log('error');
         console.log(err);
      })
      return punchInfo;
   }

   render() {
      let { users } = this.props;
      if (!users || !users.length){
         users = [];
      }
      const employees = users.map(this._mapUsersToRows);
      return (
         <BackgroundImage>
         <ScrollView style={styles.list}>
            { employees }
         </ScrollView>
         </BackgroundImage>
      );
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      getCompanyUsers: (company) => dispatch(getCompanyUsers(company)),
   }
}

const mapStateToProps = (state) => {
   return {
      users: state.users
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen);

const styles = StyleSheet.create({
   list: {
      marginTop: 10,
   }
});