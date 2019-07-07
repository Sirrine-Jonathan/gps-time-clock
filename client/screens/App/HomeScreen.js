import React from "react";
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Platform, ScrollView, TouchableOpacity } from "react-native";
import { Constants, Location, Permissions, MapView } from 'expo';
import Loading from '../../components/Loading';
import Puncher from '../../components/Puncher';
import Timer from '../../components/Timer';
import { addPunch, initPunchedState } from '../../redux/actions/appActions';



class HomeScreen extends React.Component {

	state = {
		hasLocationPermissions: false,
		locationResult: null,
		lat: null,
		long: null,
		date: null,
		time: null,
	};

	componentWillMount() {
		this._getLocationAsync();
		this.props.initPunchedState();
	}

	_getLocationAsync = async() => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				locationResult: 'Permission to access location was denied',
			});
		} else {
			this.setState({
				locationResult: JSON.stringify(location)
			});
		}

		let location = await Location.getCurrentPositionAsync({});
		this.setState({ locationResult: JSON.stringify(location) });

		this.setState({lat: parseFloat(JSON.stringify(location.coords.latitude))});
		this.setState({long: parseFloat(JSON.stringify(location.coords.longitude))});

		// center the map
		this.setState({mapRegion: { latitude: location.coords.latitude , longitude:
		location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});

		return {
			lat: JSON.stringify(location.coords.latitude),
			long: JSON.stringify(location.coords.longitude)
		}
	};

	_togglePunch = async () => {
		let loc = await this._getLocationAsync();
		this.props.addPunch(loc);
	};

	render() {
		return (
			<View>
				{(this.state.long && this.state.lat) ? (
				<MapView 
					style={{ 
						alignSelf: 'stretch', 
						height: 200 
					}}
					region={{
						latitude: this.state.lat,
						longitude: this.state.long,
						latitudeDelta: 0.0003,
						longitudeDelta: 0.00015, 
					}}
				/>):null}
				<View style={styles.timerView}>
					<Timer 
						lastPunch={this.props.lastPunch} 
						punchedIn={this.props.punchedIn}
					/>
					<Puncher
						togglePunch={this._togglePunch}
						punchedIn={this.props.punchedIn}
						style={styles.puncherStyle}
					/>
				</View>
			</View>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {  
		addPunch: (punchedIn) => dispatch(addPunch(punchedIn)), 
		initPunchedState: () => dispatch(initPunchedState())
	}
}

const mapStateToProps = (state) => {
	return {
		logoutError: state.logoutError,
		user: state.user,
		punchedIn: state.punchedIn,
		lastPunch: state.lastPunch
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
	puncherStyle: {

	},
	timerView: {
		padding: 5
	}
});