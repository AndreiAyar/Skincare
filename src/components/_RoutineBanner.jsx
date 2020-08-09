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
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("screen").width;
const RoutineBanner = ({ data, navigation }) => {
  const { id, type, steps } = data;

  // Bind it to a component
  return (
    <Spring
      delay={0}
      from={{
        opacity: 0.2,
        marginLeft: 200,
        padding: 100,
      }}
      to={{
        opacity: 1,
        duration: 1000,
        marginLeft: 0,
        padding: 0,
      }}
    >
      {(props) => (
        <View style={props}>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("Routine", {
                screen: "Routines",
                id: id,
                type: type,
              })
            }
          >
            <View style={styles.banner}>
              <Text style={styles.innerText}>{type}</Text>
              <Icon
                name="chevron-right"
                style={{ position: "absolute", top: 30, right: 15 }}
                size={35}
                color="black"
              />
              <View style={styles.innerDesc}>
                <Icon
                  name={
                    (id == 1 && "sun") ||
                    (id == 2 && "moon") ||
                    (id == 3 && "calendar")
                  }
                  style={{ marginLeft: 15 }}
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
                  name="archive"
                  style={{ marginLeft: 15 }}
                  size={20}
                  color="black"
                />
                <Text style={styles.innerTextDesc}>
                  {steps} Steps and products
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

   
        </View>
      )}
    </Spring>
  );
};

const styles = StyleSheet.create({
  banner: {
    marginVertical: 10,
    width: screenWidth / 1.2,
    backgroundColor: "white",
    height: 90,
    borderRadius: 15,
    shadowColor: "#cecece",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.333,
    shadowRadius: 10,
    borderColor: "#F3F3F3",
    borderWidth: Platform.OS == "android" ? 2 : 1,
  },
  innerText: {
    fontSize: 16,
    padding: 15,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  innerTextDesc: {
    marginLeft: 5,
    position: "relative",
  },
  innerDesc: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export default RoutineBanner;
