import React from "react";
import {  MapView } from 'expo';
import { View, Text } from 'react-native';


export default class Map extends React.Component {
    render(){
        let coords = this.props.coords;
        coords = coords.split(",");
        const latitude = parseFloat(coords[0]);
        const longitude = parseFloat(coords[1]);

        console.log("MapView: " + latitude + "," + longitude);
        return (
            <MapView style={{alignSelf: 'stretch', height: 200, padding: 20, marginBottom: 20}}
                     mapType='satellite'
                     pitchEnabled={false}
                     rotateEnabled={false}
                     scrollEnabled={false}
                     zoomEnabled={false}
                     region={{
                         latitude: latitude,
                         longitude: longitude,
                         latitudeDelta: 0.0006,
                         longitudeDelta: 0.00030, }}
            />
        );
    }
}
