import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native'
import SectionHeader from './SectionHeader';
import DiscoverCard from './DiscoverCard'
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
 
const POSTS_GQL = gql`
  query posts {
    posts{
    title
    entire_post
    src
    shortDesc
    tags{
      name
    }
    inner_src
  }
  }
`;
const DiscoverScroll = ({navigation}) => {
    let data;
    const postsData = useQuery(POSTS_GQL)
    if(postsData && postsData.data && postsData.data.posts){
        data = postsData.data.posts
    }
    return (
        <View style={styles.container}>
            <SectionHeader innerText={'Discover the benefints of the recommended substances'} />
            {postsData && postsData.data && postsData.data.posts &&  <FlatList
      
                style={{ flexGrow: 0 }}
                vertical
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => (
                    
                    <DiscoverCard key={data._id} navigation={navigation} item={item}  />
                )}
                keyExtractor={(item, index) => index.toString()}
            />}


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







