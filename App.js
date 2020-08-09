import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';


import { AppRegistry } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';


import { MainState, MainStateContext } from './src/context/MainContext'

import Navigation from './src/navigation/Navigation';

import { AsyncStorage } from 'react-native';


const client = new ApolloClient(
  {
    cache: new InMemoryCache(),
    link: new HttpLink(
      {
        uri: 'http://rinx.tplinkdns.com:4000/graphql' //'http://homesev.tplinkdns.com:4000/'
      }
    )
  })

export default function App() {

  //   headerBackImage:props =>( <Image   style={{ width: 50, height: 50 }} source={require("./src/resources/back.png")} /> ),

  return (
    <ApolloProvider client={client}>
      <MainState>
        <View style={styles.container}>
          <Navigation />
        </View>
      </MainState>
    </ApolloProvider>
  );
}
AppRegistry.registerComponent('SkinCare', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
