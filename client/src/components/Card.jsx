import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import Effects from "../components/Effects";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const screenWidth = Math.round(Dimensions.get("window").width);

const Card = ({ item, navigation }) => {
  // console.log(navigation)
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("Routines", {
          screen: "Main",
          id: item._id,
          routine: item.name,
          routine_id:item._id
        })
      }
    >
      <View style={styles.card_container}>
        <View>
          <LinearGradient
            colors={["#12c2e9", "#c471ed", "#f64f59"]}
            start={[
              item._id == "5f2ed0ffc1abbcd1026901f1"
                ? 0
                : item._id == "5f2ed107c1abbcd1026901f2"
                ? -2
                : item._id == "5f2ed10ec1abbcd1026901f3"
                ? 2
                : item._id == "#5f2ed119c1abbcd1026901f4"
                ? 3
                : 1 ,
              3,
            ]}
            end={[4, 1]}
            location={[1, 5, 1]}
            style={styles.card}
          >
            {Platform.OS == "android" && <AccessButton item={item} />}
            <View style={styles.card_title}>
              <Text style={{ fontSize: 18, fontFamily: "Fjalla One" }}>
                {item.name}
              </Text>
            </View>

            <Image
              style={styles.card_image}
              source={{
                uri: "http://homesev.tplinkdns.com:4000/static/" + item.src,
              }}
            />

            <Effects large bottomPos rightPos />
          </LinearGradient>
          {Platform.OS == "ios" && <AccessButton item={item} />}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const AccessButton = ({ item }) => {
  //linear gradient Android zIndex Issue
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 10,
        position: "absolute",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        width: 55,
        height: 50,
        zIndex: 3,
        marginTop: Platform.OS == "android" ? 190 : 200,
        backgroundColor:
          item._id == "5f2e83e1ba35d69dc5111fc3"
            ? "#FFA68A"
            : item._id == "5f2e83ecba35d69dc5111fc4"
            ? "#FFC865"
            : item._id == "5f2e83f2ba35d69dc5111fc5"
            ? "#C18EDE"
            : item._id == 4
            ? "#5f2e83f8ba35d69dc5111fc6"
            : "#FFC865",
        shadowColor: "#FFA68A",
        shadowOpacity: 0.3,
        shadowRadius: 10,
      }}
    >
      <Icon
        name="angle-right"
        style={{ marginLeft: 3 }}
        size={30}
        color="black"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card_container: {
    flex: 1,
    height: 250,
    marginBottom: 5,
  },
  card: {
    margin: 10,
    backgroundColor: "#7041EE",
    width: screenWidth - 150,
    elevation: 5,
    borderRadius: 15,
    shadowColor: "#cecece",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    height: 220,
  },
  card_title: {
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
    borderStyle: "solid",
    borderColor: "#e5e5e5",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#eaeaea",
    width: screenWidth - 150,
    height: 40,
  },
  card_image: {
    alignSelf: "center",
    marginTop: 30,
    height: 127,
    width: 127,
    resizeMode: "contain",
  },
});

export default Card;
