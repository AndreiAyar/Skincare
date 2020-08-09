import React from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions, Image} from 'react-native';
import Card from './Card'
import SectionHeader from './SectionHeader'

const RoutinesSlider = ({ data, item, navigation, inputRef}) => {
   console.log(inputRef)
    return (
        <View style={styles.container}>
            <SectionHeader ref={inputRef} innerText={'Choose your favourite routine from below'} topText={'Predefined routines'}/>
            <FlatList
    
                style={{ flexGrow: 0 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => (
                    <Card navigation={navigation} item={item} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
//chevron-left -- icon
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
    }
})
export default RoutinesSlider;