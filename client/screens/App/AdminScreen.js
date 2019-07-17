import React from "react";
import { connect } from 'react-redux';
import {Text, View, StyleSheet, ScrollView} from "react-native";
import { getCompanyUsers } from '../../redux/actions/appActions';;
import SingleUser from '../../components/SingleUser';

class AdminScreen extends React.Component {

   componentWillMount(){
      this.props.getCompanyUsers();
   }

   render() {

      let { users } = this.props;
      if (!users || !users.length)
         users = [];
      const employees = users.map((user) => 
         (
            <View style={styles.row}>
               <SingleUser user={user} style={styles.user} navigation={this.props.navigation}/>
            </View>
         )
      );

      return (
         <ScrollView style={styles.list}>
            { employees }
         </ScrollView>
      );
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      getCompanyUsers: (company) => dispatch(getCompanyUsers(company))
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
   },
   user: {
      margin: 10,
      padding: 10,
      flex: 1,
      backgroundColor: '#ffffff',
      borderRadius: 5
   }
});