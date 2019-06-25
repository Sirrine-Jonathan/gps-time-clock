import React from "react";
import { connect } from 'react-redux';
import {Text, View, StyleSheet} from "react-native";
import PunchList from '../../components/PunchList';

class ReportsScreen extends React.Component {
   
   static navigationOptions = {
      drawerLabel: 'Reports',
      title: 'Reports'
   };

   render() {
      return (
         <View style={styles.content}>
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
    }
});