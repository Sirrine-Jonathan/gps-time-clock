import React from "react";
import { StyleSheet, ImageBackground, Text } from "react-native";

const imageMap = {
    "gplaypattern": require('../assets/backgrounds/gplaypattern.png'),
    "papyrus": require('../assets/backgrounds/papyrus.png'),
    "swirl_pattern": require('../assets/backgrounds/swirl_pattern.png'),
    "prism": require("../assets/backgrounds/prism.png")
}

export default class BackgroundImage extends React.Component {
    render() {
    	let { src, children } = this.props;
    	if (src){ 
    		src = imageMap[src];
        } else {
            src = imageMap["prism"];
        }
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