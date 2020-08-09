import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Effects from './Effects';
const screenWidth = Math.round(Dimensions.get('window').width)
const SectionHeader = ({style, innerText, topText }) => {
    return (
        <View {...style} >
            <Text style={{ alignSelf: 'flex-start', color: '#303030', paddingBottom: 5, fontSize: 14, fontWeight: '700' }}>{topText}</Text>
            <View style={styles.routines_header}><Text style={{ color: '#FFF5F0', width: 200, }}>{innerText}</Text>
                <View style={styles.icon_wrapper}>
                    <Icon name="angle-right" style={styles.icon} size={20} color="#FE7578" />  
                </View>
                <Effects large bottomPos rightPos />
            </View >
        </View>
    )
}


const styles = StyleSheet.create({
    routines_header: {
        alignSelf:'center',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        width: screenWidth / 1.2,
        height: 60,
        borderRadius: 10,
        paddingLeft: 30,
        backgroundColor: '#FE7578',
        zIndex:10,
        marginBottom: 10, // #FFF5F0
    },
    icon_wrapper: {
        backgroundColor: 'white',
        position: 'absolute',
        width: 25,
        height: 25,
        marginTop: 5,
        right: 30,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
    },
    icon: {
        marginLeft:0,
        marginTop:4,
        position: 'relative',
        transform: [{ rotate: '90deg' }]
    }
})









export default SectionHeader