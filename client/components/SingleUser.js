import React from "react";
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { getLastPunch, setReportsUser, isWorking } from '../redux/actions/appActions';
import CButton from './CButton';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

class SingleUser extends React.Component {

   state = {
      showDetails: false,
      isAdmin: false,
      punchedIn: null,
      punchInfo: null
   }

   componentDidMount(){

   }


   _viewUser = () => {
      let { user } = this.props;
      this.props.setReportsUser(user);
      this.props.navigation.navigate("History", { user: user });
   }

   _toggleDetails = () => {
      let { showDetails } = this.state;
      this.setState({
         showDetails: !showDetails,
      })
   }

   _toggleAdmin = () => {
      let { isAdmin } = this.state;
      this.setState({
         isAdmin: !isAdmin,
      })
   }

   render() {
      let { user } = this.props;
      let { showDetails, isAdmin, punchedIn } = this.state;

      let color = (punchedIn) ? "green":"#333";
      let dot = (<Entypo name="dot-single" size={28} color={color} />);
      let admin = (<MaterialCommunityIcons name="worker" size={28} color={color} />);

      let details = (
         <View style={styles.detailsView}>
            <View style={styles.details}>
               <View style={styles.textRow}>
                  <Text style={styles.detailsText}>Email:</Text>
                  <Text style={styles.detailsText}>{ user.email }</Text>
               </View>
               <View style={styles.textRow}>
                  <Text style={styles.detailsText}>Admin:</Text>
                  <Text style={styles.detailsText}>{(isAdmin) ? "True":"False"}</Text>
               </View>
               <View style={styles.textRow}>
                  <Text style={styles.detailsText}>PunchedIn:</Text>
                  <Text style={styles.detailsText}>{ (punchedIn) ? "True":"False" }</Text>
               </View>

            </View>
            <View style={styles.buttonContainer}>
               <CButton title="View Punches" onPress={this._viewUser} />
            </View>
         </View>
      );

      return (
         <View style={styles.user}>
            <View style={styles.row}>
               { (isAdmin) ? admin:dot }
               <TouchableOpacity onPress={this._toggleDetails}>
                  <Text style={styles.username} >{ user.username }</Text>
               </TouchableOpacity>
               <Switch style={{float: 'right'}} trackColor="#333" onValueChange={this._toggleAdmin} value={isAdmin}/>
            </View>
            { (showDetails) ? details:null }
         </View>
      );
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      getLastPunch: (email) => dispatch(getLastPunch(email)),
      setReportsUser: (user) => dispatch(setReportsUser(user)),
      isWorking: (email) => dispatch(isWorking(email)),
   }
}

const mapStateToProps = (state) => {
   return {

   }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);

const styles = StyleSheet.create({
   username: {
      fontSize: 20,
   },
   row: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   mapContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center' 
   },
   detailsView: {
      padding: 10
   },
   details: {
      padding: 15,
   },
   detailsText: {
      fontSize: 15
   },
   textRow: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center' 
   },
   user: {
      margin: 10,
      padding: 10,
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      borderRadius: 5
   }
});