import React from 'react'
import { View, StyleSheet, Text, Dimensions, Image, Platform } from 'react-native'

const screenWidth = Dimensions.get('screen').width
const ProductCard = ({ item }) => {
    return (
        <View styles={styles.container}>
            <View style={styles.card}>
                <View style={styles.image_container}><Image style={styles.image} source={item.source} /></View>
                <Text style={{width:100, textAlign:'left', color:'#A5A4AD', paddingBottom:2, fontSize:12}} numberOfLines={2} >{item.title}</Text>
                <Text style={{width:100, textAlign:'left', fontSize:14}} numberOfLines={2} >{item.shortDesc}</Text>
            </View>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    card: {
        alignItems:'center',
        width: 130,
        height: 190,
    },
    image_container: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 110,
        backgroundColor: 'white',
        width: 110,
        borderRadius: 15,
        shadowColor: '#cecece',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.333,
        shadowRadius: 10,
        borderColor:'#F3F3F3',
        borderWidth:Platform.OS == 'android' ? 2 : 1,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
})


export default ProductCard