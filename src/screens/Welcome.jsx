import React, { useState, useContext } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Image, ScrollView, StatusBar, Button, TouchableOpacity, Vibration } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { MainStateContext } from '../context/MainContext'
import { CommonActions } from '@react-navigation/native';
const Welcome = ({ navigation }) => {
    const mainStateContext = useContext(MainStateContext)
    //console.log(`asta e in state ${mainStateContext.state.user && mainStateContext.state.user.username}`)
    // mainStateContext && mainStateContext.state.user !== null && navigation.dispatch(
    // CommonActions.reset({
    //      index: 1,
    //      routes: [
    //          { name: 'Main' },
    //
    //       ],
    //    })
    // );
    return (
        <>
            {/*mainStateContext.state.user && navigation.navigate('Main')*/}
            <View style={styles.container}>
                <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'} />
                <Text style={styles.text_main}>Your skin is safe. <Text style={styles.text_secondary}>Beautiful.</Text></Text>
                <Text style={styles.text_third}>Enjoy the experience.</Text>
                <Image style={styles.main_logo} source={require('../resources/logoskin.png')} />
                <View style={styles.auth}>
                    <TouchableOpacity style={styles.auth_buttons_shadow} onPress={() => (Vibration.vibrate(500), navigation.navigate('Login'))}>
                        <LinearGradient
                            colors={['#5C258D', '#4389A2', '#5C258D']}
                            start={[0, 8]}
                            end={[4, 0]}
                            location={[0, 0.5, 1]}
                            style={styles.auth_buttons}>
                            <Text
                                style={{
                                    backgroundColor: 'transparent',
                                    fontSize: 15,
                                    color: '#fff',
                                }}>
                                Sign into your account
                                   </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.auth_buttons_shadow} onPress={() => (Vibration.vibrate(500), navigation.navigate('Signup'))}>
                        <LinearGradient
                            colors={['#5C258D', '#4389A2', '#5C258D']}
                            start={[0, 8]}
                            end={[4, 0]}
                            location={[0, 0.5, 1]}
                            style={styles.auth_buttons}>
                            <Text
                                style={{
                                    backgroundColor: 'transparent',
                                    fontSize: 15,
                                    color: '#fff',
                                }}>
                                Signup
                                   </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text_main: {
        color: '#323643',
        fontSize: 26,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    text_secondary: {
        color: '#5C258D'
    },
    text_third: {
        color: '#C5CCD6',
        fontSize: 16,
    },
    main_logo: {
        height: 300,
        resizeMode: 'contain'
    },
    auth_buttons: {
        width: 275,
        padding: 15,
        height: 48,
        alignItems: 'center',
        margin: 20,
        borderRadius: 5,
    },
    auth_buttons_shadow: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    }

})

export default Welcome;