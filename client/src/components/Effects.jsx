import React from 'react'
import { View, Image, StyleSheet } from 'react-native';

const Effects = (props) => {
    const {
        large,
        medium,
        small,
        topPos,
        bottomPos,
        leftPos,
        rightPos,
        normalZindex

    } = props
    const imageStyle = [
        large && styles.large,
        medium && styles.medium,
        small && styles.small,
        topPos && styles.top,
        bottomPos && styles.bottom,
        leftPos && styles.left,
        rightPos && styles.right,
        styles.image,
        normalZindex && styles.normalZ,

    ]
        return (
        <Image style={imageStyle} {...props} source={require('../resources/effects.png')} />
    )

}

const styles = StyleSheet.create({
    large: {
        height: 55,
    },
    medium: {
        height: 35,
    },
    small: {
        height: 25,
    },
    top: {
        top: 0,
    },
    bottom: {
        bottom: 0,
    },
    left: {
        left: 0,
    },
    right: {
        right: 0,
    },
    image: {
        zIndex: 50,
        resizeMode: 'contain',
        position: 'absolute'
    },
    normalZ:{
        zIndex:0,
    }

})


export default Effects;