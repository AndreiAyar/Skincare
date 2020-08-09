import React from 'react'
import { View, StyleSheet, Text, Dimensions, Image, Platform } from 'react-native'

const screenWidth = Dimensions.get('screen').width
const DiscoverCard = ({ item }) => {
    return (
        <View styles={styles.container}>
            <View style={styles.card}>
                <View style={styles.image_container}><Image style={styles.image} source={item.source} /></View>
                <View style={{ minWidth: 70, height: 40, position: 'absolute', opacity: 0.7, bottom: 25, left: 15, backgroundColor: "#c7c9d0", borderRadius: 40, color: "black" , justifyContent:'center', alignItems:'center'}} numberOfLines={2} ><Text style={{  color: 'black', fontSize: 16,opacity:0.7,fontWeight:'700'}}>{item.eta} min</Text></View>
                <Text style={{ width: 100, textAlign: 'left',paddingLeft:10, color: '#A5A4AD', paddingBottom: 2, fontSize: 12 }} numberOfLines={2} >{item.title}</Text>
                <Text style={{ width: 150, textAlign: 'left',paddingLeft:10, fontSize: 14 }} numberOfLines={3} >{item.shortDesc}</Text>

            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    card: {
        marginVertical:  screenWidth/10,
        width: screenWidth/2.1,
        height: screenWidth/2,
        
    },
    image_container: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#cecece',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.333,
        shadowRadius: 10,
    },
    image: {
        borderRadius: 10,
        width: screenWidth/2.3,
        height: screenWidth/2.1,
        resizeMode: 'cover',
    },
})


export default DiscoverCard;