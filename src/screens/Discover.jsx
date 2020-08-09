import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image } from 'react-native';
import DiscoverScroll from '../components/DiscoverScroll'
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { Spring } from 'react-spring/renderprops'
//const OFFLINE_TASK_NAME = 'background-offline-upload-task';
const Discover = () => {

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView >
            <Spring
                    delay={300}
                    from={{
                        opacity:0.2,
                        marginLeft:-150,
                        marginTop: -200,
                        padding: 150,
                    }}
                    to={{
                        opacity:1,
                        marginLeft:0,
                        marginTop: 0,
                        padding: 0,
                    }}>

                    {props =>
                <View style={props}>
                    <View style={{ justifyContent: 'center', marginTop: 65, alignItems: 'center' }}>
                        <Text style={{ fontSize: 36, marginTop: 5, fontFamily: 'Fjalla One' }}>DYI Treatments</Text>
                        <Text style={{ width: 200, fontSize: 16, textAlign: 'center' }}>Simple recipes for your skin, to make at home</Text>
                    </View>
                </View>}
                </Spring>
                <Image style={styles.header_image} source={require('../resources/discover_header_2.png')} />
                <View style={styles.card_container}>
                    <ScrollView  >
                        <DiscoverScroll />
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView >

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header_image: {
        width: 300,
        height: 300,
        position: 'absolute',
        zIndex: 20,
        opacity: 0.9,
        top: -140,
        right: -100,
        alignSelf: 'flex-end',
        transform: [
            { rotateY: '180deg' },
            { rotateZ: "5deg" }
        ]
    },
    card_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'stretch',
        justifyContent: 'space-around',

    },

})

export default Discover;