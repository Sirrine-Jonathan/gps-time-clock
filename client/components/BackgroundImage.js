import React from "react";
import { StyleSheet, ImageBackground, Text } from "react-native";

const imageMap = {
    "connect": require('../assets/backgrounds/connect.png'),
    "gplaypattern": require('../assets/backgrounds/gplaypattern.png'),
    "grilled": require('../assets/backgrounds/grilled.png'),
    "papyrus": require('../assets/backgrounds/papyrus.png'),
    "swirl_pattern": require('../assets/backgrounds/swirl_pattern.png'),
    "symphony": require('../assets/backgrounds/symphony.png'),
    "prism": require("../assets/backgrounds/prism.png")
}

export default class BackgroundImage extends React.Component {
    render() {
    	let { src, children } = this.props;
    	if (!src) 
    		src = imageMap["prism"];
        else
            src = imageMap(src);
        console.log(src);
        return (
            <ImageBackground 
            	style={styles.backgroundImage}
            	source={src}
        	>
                {this.props.children}
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
    }
});