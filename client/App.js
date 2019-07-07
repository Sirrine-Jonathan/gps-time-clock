import React from "react";
import { Provider } from 'react-redux';
import { store } from './redux/createStore';
import AppSwitch from './AppSwitch';

const initialState = {};

export default class App extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		return (
			<Provider store={store}>
				<AppSwitch />
			</Provider>
		)
	}
}
