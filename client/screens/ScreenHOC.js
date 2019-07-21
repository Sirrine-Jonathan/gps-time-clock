import React from "react";
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Header } from "react-native-elements";
import { setReportsUser } from "../redux/actions/appActions";


const ScreenHOC = (Screen, title) => {
   class HOC extends React.Component {
      render(){
         return (
            <View style={styles.container}>
               <Header
                 placement="left"
                 centerComponent={{ text: title, style: { color: '#fff' } }}
                 rightComponent={{ icon: 'menu', color: '#fff', onPress:
                  () => {
                    this.props.setReportsUser(this.props.user);
                    this.props.navigation.toggleDrawer();
                  }
                 }}
               />
                  <Screen { ...this.props } />
            </View>
         )
      }
   }
    const mapDispatchToProps = (dispatch) => {
      return {   
        setReportsUser: (user) => dispatch(setReportsUser(user))
      }
    }

    const mapStateToProps = (state) => {
      return {
        user: state.user,
      }
    }

   return connect(mapStateToProps, mapDispatchToProps)(HOC);
}
export default ScreenHOC;


const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});