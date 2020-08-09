import React, { useContext, useEffect, useState } from 'react';
import { View, StatusBar, StyleSheet, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Asset } from 'expo-asset';
import { AppLoading, SplashScreen } from 'expo';
import * as Font from 'expo-font';

import IconAnt from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';

import Welcome from '../../src/screens/Welcome';
import Login from '../../src/screens/Login'
import Signup from '../../src/screens/Signup'
import Main from '../../src/screens/Main'
import Discover from '../../src/screens/Discover'
import Settings from '../../src/screens/Settings'
import Routines from '../screens/Routines';
import Routine from '../screens/Routine'
import { NavigationActions } from 'react-navigation';
import { CommonActions } from '@react-navigation/native';

import { MainStateContext } from '../context/MainContext'

import Loading from '../components/Loading'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


const Navigation = () => {

    const mainStateContext = useContext(MainStateContext)

    //console.log(`User aici : ${mainStateContext.state.user.username}`)

    const [isReady, setIsReady] = useState(false);
    const [isSplashReady, setSplashReady] = useState(false);
    const _cacheSplashResourcesAsync = async () => {
        const gif = require('../resources/splash.gif');
        return Asset.fromModule(gif).downloadAsync();
    };

    const _cacheResourcesAsync = async () => {
        SplashScreen.hide();
        const images = [
            require('../resources/logoskin.png'),
            require('../resources/bg_main.png'),
            require('../resources/combo_skin.png'),
            require('../resources/effects.png'),
            require('../resources/normal_skin.png'),
            require('../resources/oily_skin.png'),
            require('../resources/skinlogo.svg'),
            require('../resources/wellness.png'),
            require('../resources/products/1.png'),
            require('../resources/products/2.png'),
            require('../resources/products/3.png'),
            require('../resources/products/4.png'),
            require('../resources/discover/1.jpg'),
            require('../resources/discover/1.jpg'),
            require('../resources/discover/2.jpg'),
            require('../resources/discover/3.jpg'),
            require('../resources/discover/4.jpg'),
            require('../resources/discover/5.jpg'),
            require('../resources/discover/6.jpg'),
            require('../resources/discover_header.png'),
            require('../resources/routines_header.png'),
            require('../resources/discover_header_2.png'),
        ];

        const cacheImages = images.map(image => {
            return Asset.fromModule(image).downloadAsync();
        });

        let customFonts = {
            'Roboto Condensed': require('../../assets/fonts/RobotoCondensed-Bold.ttf'),
            'Fjalla One': require('../../assets/fonts/FjallaOne-Regular.ttf')
            //  'Inter-SemiBoldItalic':
            //   'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12',
        };
        const cacheFonts = await Font.loadAsync(customFonts);
        await Promise.all([cacheImages, cacheFonts]);
        setIsReady(true)

    }
    //   console.log(mainStateContext && mainStateContext.state.user == null)
  //  console.log(`asta e in state ${mainStateContext.state.user && mainStateContext.state.user.username}`)
   // console.log(mainStateContext)
   // console.log(!isReady)
    return (
        <>
            {!isSplashReady &&
                <AppLoading
                    startAsync={_cacheSplashResourcesAsync}
                    onFinish={() => setSplashReady(true)}
                    onError={console.warn}
                    autoHideSplash={false}
                />
            }
            {!isReady && mainStateContext.state.loaded &&
                <View style={{ flex: 1, zIndex: 999, width: screenWidth, height: screenHeight, position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9d1d9' }}>
                    <Image
                        style={{ resizeMode: 'contain', width: 200, height: 200 }}
                        source={require('../resources/splash.gif')}
                        onLoad={_cacheResourcesAsync}
                    />
                </View>
            }
            {

                isReady && mainStateContext.state.loaded && mainStateContext.state.user !== null ?
                    <TabNavigation /> :
                    mainStateContext.state.loaded && <StackNavigation mainStateContext={mainStateContext} />

            }
        </>
    )
}


const StackNavigation = ({ mainStateContext }) => {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#F2F2F2',
                        elevation: 0, // remove shadow on Android
                        shadowOpacity: 0, // remove shadow on iOS
                    },
                    shadowStyle: null,
                    headerTitle: null,
                    headerBackTitleVisible: false,
                    headerBackImage: () => <Image style={{ width: 25, marginLeft: 10, }} source={require("../../src/resources/back.png")} />
                }
                }>

                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Login" key="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />

            </Stack.Navigator>

        </NavigationContainer>
    )

}

const TabNavigation = () => {
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = 'home';

                        if (route.name === 'Main') {
                            iconName = focused
                                ? 'home'
                                : 'home';
                        } else if (route.name === 'Settings') {
                            iconName = 'profile'//focused ? 'home' : 'home';
                        } else if (route.name === 'Discover') {
                            iconName = 'compass'
                        }
                        

                        // You can return any component that you like here!
                        return (route.name === 'Discover' ? <IconEntypo name={iconName} size={focused ? 28 : 24} color={focused ? '#FE7578' : '#333333'} /> : <IconAnt name={iconName} size={focused ? 28 : 24} color={focused ? '#FE7578' : '#333333'} />)
                    },
                })}

                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}>
                <Tab.Screen name="Home" component={SecondayStackNavigation} />
                <Tab.Screen name="Discover" component={Discover} />
                <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
        </NavigationContainer>
    );

}

const SecondayStackNavigation = ({ mainStateContext }) => {
    const Secondary = createStackNavigator();
    return (
        <Secondary.Navigator 
        headerMode='screen'
        screenOptions={{
            headerShown: false,
            headerBackTitle: null,
            shadowStyle: null,
            headerTitle: null,
            headerBackTitleVisible: false,
        }
        }>

            <Secondary.Screen name="Main" component={Main} />
            <Secondary.Screen options={{
                headerShown: true,
                cardShadowEnabled: false,
                headerTransparent: true,
                headerBackImage: () => <Image style={{ width: 25, marginLeft: 10, }} source={require("../../src/resources/back.png")} />
            }}
                name="Routines" component={Routines} />
            <Secondary.Screen
      
            options={{
                headerShown: true,
                cardShadowEnabled: false,
                headerTransparent: true,
                
                headerBackImage: () =>null// <View style={{zIndex:150}}><Image style={{ width: 25, marginLeft: 10, }} source={require("../../src/resources/back.png")} />
                   // </View>
            }}
                name="Routine" component={Routine} />
        </Secondary.Navigator>


    )

}


export default Navigation;