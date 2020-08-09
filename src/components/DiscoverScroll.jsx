import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native'
import SectionHeader from './SectionHeader';
import DiscoverCard from './DiscoverCard'

const DiscoverScroll = () => {
    const data =
        [{ id: 1, title: 'Pure Scrub', shortDesc: 'Glowing skin', eta: 35, source: require('../resources/discover/1.jpg'), },
        { id: 2, title: 'Moist Cream', eta: 35, shortDesc: 'Spot Remover', source: require('../resources/discover/2.jpg'), },
        { id: 3, title: 'Moist Cream', shortDesc: 'Spot Remover', eta: 15, source: require('../resources/discover/3.jpg'), },
        { id: 4, title: 'Moist Cream', shortDesc: 'Acnee Remover', eta: 55, source: require('../resources/discover/4.jpg'), },
        { id: 5, title: 'Moist Cream', shortDesc: 'Spot Remover', eta: 45, source: require('../resources/discover/5.jpg'), },
        { id: 6, title: 'Moist Cream', shortDesc: 'Hair Growth', eta: 15, source: require('../resources/discover/3.jpg'), },
        { id: 7, title: 'Moist Cream', shortDesc: 'Spot Remover', eta: 55, source: require('../resources/discover/4.jpg'), },
        { id: 8, title: 'Moist Cream', shortDesc: 'Spot Remover', eta: 25, source: require('../resources/discover/6.jpg'), }]
    return (
        <View style={styles.container}>
            <SectionHeader innerText={'Treatments that you can do at home'} />
            <FlatList
      
                style={{ flexGrow: 0 }}
                vertical
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => (
                    <DiscoverCard item={item} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',

    }
})

export default DiscoverScroll;







