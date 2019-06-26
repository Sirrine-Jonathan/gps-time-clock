import React from "react";
import { connect } from 'react-redux';
import {Text, View, StyleSheet, ScrollView} from "react-native";
import { getCompanyUsers } from '../../redux/actions/appActions';;
import SingleUser from '../../components/SingleUser';

class AdminScreen extends React.Component {
   
   static navigationOptions = {
      drawerLabel: 'Admin',
      title: 'Admin'
   };

   componentWillMount(){
      //this.props.getCompanyUsers();
   }

   render() {

      let { users } = this.props;
      if (!users || !users.length)
         users = [];
      const employees = users.map((user) => 
         (
            <View style={styles.punchRow}>
               <SingleUser user={user} style={styles.user}/>
            </View>
         )
      );

      return (
         <ScrollView style={styles.punchList}>
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
   content: {
      marginTop: 20,
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
   },
   punch: {
      margin: 10,
      padding: 10,
      flex: 1,
      backgroundColor: '#e0e0e0',
      borderRadius: 5
   }
});