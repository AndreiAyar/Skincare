import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native'
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard'
const ProductsSlider = () => {
    const data =
        [{ id: 1, title: 'THE ORDINARY', shortDesc: 'The Ordinary 0.5% AC', source: require('../resources/products/aqua.png') },
        { id: 2, title: 'DUO', shortDesc: 'DUO Dry Skin Exfoliating Vitamin C ', source: require('../resources/products/cerave.png') },
        { id: 3, title: 'THE ORDINARY', shortDesc: 'The Ordinary HVC 0.4% / Night', source: require('../resources/products/manuel.png') },
        { id: 4, title: 'THE ORDINARY', shortDesc: 'The Ordinary HVC 1.4% / Day', source: require('../resources/products/2.png') }]
    return (
        <View style={styles.container}>
            <SectionHeader innerText={'Top products for skin from our trusted manufactures'} topText={'Trending products'} />
            <FlatList
                style={{ flexGrow: 0 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => (
                    <ProductCard item={item} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
                

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
})

export default ProductsSlider;