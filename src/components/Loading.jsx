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

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        zIndex: 999,
        width: screenWidth,
        height: screenHeight,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9d1d9",
      }}
    >
      <Image
        style={{ resizeMode: "contain", width: 200, height: 200 }}
        source={require("../resources/splash.gif")}
      />
      <Text style={{ fontSize: 26, color: "#8519c4" }}>
        Nice to see you again!
      </Text>
    </View>
  );
};
export default Loading;
