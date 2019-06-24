import React from "react";
import { connect } from 'react-redux';
import {Text, View, StyleSheet, FlatList} from "react-native";
import { getPunches } from '../redux/actions/appActions';
import SinglePunch from './SinglePunch';


class PunchList extends React.Component {

   state = {
      punches: null
   }

   componentWillMount(){
      this._getPunches(this.props.email);
   }

   _getPunches = async (email) => {
      let punches = await this.props.getPunches(email);
      this.setState({ punches });
   }

   _renderItem = ({ item, index }) => {
      return (
         <SinglePunch punch={item} key={index} />
      )
   }

   render() {

      let { punches } = this.state;

      return (
         <View style={styles.content}>
            <FlatList
               data={punches}
               renderItem={this._renderItem}
            />
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
    content: {
        marginTop: 20,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});