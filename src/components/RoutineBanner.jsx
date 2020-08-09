import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { Spring } from "react-spring/renderprops";
import { useSpring, interpolate } from "react-spring";
import { useGesture, useDrag } from "react-use-gesture";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";

const screenWidth = Dimensions.get("screen").width;
const RoutineBanner = ({ data, timer, navigation, arrow, }) => {
  console.log("ici", data);
  const { _id, partOfDay, products, innerText} = data;
  const styles = StyleSheet.create({
    banner: {
      alignItems: timer && "center",
      marginVertical: 10,
      width: screenWidth / 1.2,
      backgroundColor: "white",
      height: 90,
      borderRadius: 15,
      elevation: 0.2,
      shadowColor: "#cecece",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.333,
      shadowRadius: 10,
      borderColor: "#F3F3F3",
      borderWidth: Platform.OS == "android" ? 2 : 1,
    },
    innerText: {
      fontSize: 16,
      padding: timer ? 10 : 15,
      alignSelf: "flex-start",
      fontWeight: "bold",
    },
    innerTextDesc: {
      marginLeft: 5,
      fontSize: timer && 16,
      fontWeight: timer && "400",
      fontStyle: timer && "italic",
    },
    innerDesc: {
      alignItems: "center",
      flexDirection: "row",
    },
  });
  return (
    <Spring
      delay={0}
      from={{
        // opacity: 0.51,
        marginLeft: 100,
        padding: 0,
      }}
      to={{
        opacity: 1,
        duration: 100,
        marginLeft: 0,
        padding: 0,
      }}
    >
      {(props) => (
        <View style={props}>
          <TouchableWithoutFeedback
            onPress={() =>
              !timer &&
              navigation.navigate("Routine", {
                screen: "Routines",
                id: _id,
                steps:products.length,
                type: partOfDay,
              })
            }
          >
            <View style={styles.banner}>
              <Text style={styles.innerText}>
                {partOfDay && partOfDay.charAt(0).toUpperCase() + partOfDay.slice(1)} Routine
              </Text>
              {arrow && (
                <Icon
                  name="chevron-right"
                  style={{ position: "absolute", top: 30, right: 15 }}
                  size={35}
                  color="black"
                />
              )}
              <View style={styles.innerDesc}>
                <Icon
                  name={
                    (partOfDay == "morning" && "sun") ||
                    (partOfDay == "night" && "moon") ||
                    (partOfDay == "weekly" && "calendar")
                  }
                  style={{ marginLeft: !timer ? 15 : 0 }}
                  size={20}
                  color="black"
                />
                <View
                  id="spliiter"
                  style={{
                    width: 1,
                    marginLeft: 15,
                    height: 25,
                    backgroundColor: "#F3F3FF",
                  }}
                />
                <Icon
                  name={!timer ? "archive" : "calendar"}
                  style={{ marginLeft: 15 }}
                  size={20}
                  color="black"
                />
                <Text style={styles.innerTextDesc}>{innerText ? innerText : `${products && products.length} Steps and product`}</Text>
              </View>
              {timer && (
                <TouchableOpacity onPress={() => timer()}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#FE7578",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Change Time!
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </Spring>
  );
};

export default RoutineBanner;
