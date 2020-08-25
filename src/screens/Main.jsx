import React, { useContext, useEffect, createRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";
import {
  ScrollView,
  FlatList,
  TouchableHighlight,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import ProfileMini from "../components/ProfileMini";
import RoutinesSlider from "../components/RoutinesSlider";
import Effects from "../components/Effects";
import ProductsSlide from "../components/ProductsSlider";
import Loading from "../components/Loading";
import { MainStateContext } from "../context/MainContext";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const ROUTINES_GQL = gql`
  query routines {
    routines {
      _id
      name
      RoutineDetails {
        _id
        partOfDay
      }
      notification_hours
      src
    }
  }
`;

const Main = ({ navigation }) => {
  const mainStateContext = useContext(MainStateContext);
 // mainStateContext.setNavigation(navigation)
  let scrollRef = null;
  let rows;
  let skinTypes;
  const handleScrollToRef = () => {
    scrollRef.scrollTo({ y: 200, animated: true }); 
    //   rows.measure((ox, oy, width, height, px, py) => {
    //     console.log(oy)
    //   })
    // console.log(rows.measure)
  };
  const { data, loading, error } = useQuery(ROUTINES_GQL);
  //if (loading) return "<Text/Loading...";
  // if (error) return <Text>ERROR</Text>;
  if (!data)
    return (
      <>
        <Loading />
        <Text style={{ fontSize: 26, color: "#8519c4" }}>
          Nice to see you again!
        </Text>
      </>
    );
  if (data && data.routines) skinTypes = data.routines;

  // / skinTypes  = [{ id: 1, type: 'Normal Skin', source: require('../resources/normal_skin.png') }, { id: 2, type: 'Oily Skin', source: require('../resources/oily_skin.png') }, { id: 3, type: 'Combo Skin', source: require('../resources/combo_skin.png') }, { id: 4, type: 'Dry Skin', source: require('../resources/dry_skin.png') }]
  return (
    <ImageBackground
      source={require("../resources/bg_main.png")}
      style={styles.background}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Effects normalZindex large rightPos topPos />
        <Effects normalZindex large leftPos topPos />
        <Effects normalZindex large topPos />
        <View style={styles.container}>
          <ScrollView ref={(ref) => (scrollRef = ref)}>
            <View style={{ flex: 1, backgroundColor: "white" }}>
               <ProfileMini
                data={skinTypes}
                handleScrollToRef={handleScrollToRef}
              />
              <View>
                <RoutinesSlider navigation={navigation} data={skinTypes} />
              </View> 
              <ProductsSlide />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: 500,
  },
});
export default Main;
