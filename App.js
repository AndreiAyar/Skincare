import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Image, Text, Button } from 'react-native';


import { AppRegistry } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';


import { MainState, MainStateContext } from './src/context/MainContext'

import Navigation from './src/navigation/Navigation';
import PushHandlerRedirect from './src/navigation/PushHandler'
import { AsyncStorage } from 'react-native';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
  },
  query: {
    fetchPolicy: 'no-cache',
  },
}


const client = new ApolloClient(
  {
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
    link: new HttpLink(
      {
        uri: 'http://homesev.tplinkdns.com:4000/graphql' 
      }
    )
  })

const App = () => {
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


export default App