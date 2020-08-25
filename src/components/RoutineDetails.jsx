import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
} from "react-native";
const screenWidth = Math.round(Dimensions.get("window").width);

const RoutineDetails = (props) => {
 // console.log("in details", props.data);
  const { data } = props;
  //before database connection
  // let data = [{ id: 1, type: 'Cleanser', source: require('../resources/products/1.png') },
  // { id: 2, type: "Moisturizer", source: require('../resources/products/2.png') },
  // { id: 3, type: "Cleaning", source: require('../resources/products/2.png') },
  // { id: 4, type: "Moisturizer", source: require('../resources/products/3.png') },
  // { id: 6, type: "Moisturizer", source: require('../resources/products/4.png') },
  // { id: 5, type: "Moisturizer", source: require('../resources/products/1.png') },]
  let no = 1;
  return data.map(
    ({ _id, type, title, src, description, name, refferal }, index) => (
      <View key={index} style={styles.container}>
        <View style={styles.type}>
          <View style={no < data.length && styles.vertical_line}></View>
          <View
            style={{
              borderRadius: 1,
              backgroundColor: "white",
              marginLeft: 5,
              borderColor: "#777777",
              alignItems: "center",
              justifyContent: "center",
              width: 30,
              height: 30,
              borderRadius: 50,
              borderWidth: 1,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>{no++}</Text>
          </View>
          <Text style={{ fontSize: 15, padding: 5, fontWeight: "bold" }}>
            {type}
          </Text>
        </View>
        <View style={styles.banner}>
          <View style={styles.image_container}>
            {/* { <Image style={styles.image} source={source} />} */}
            <Image
              style={styles.image}
              source={{
                uri:"http://homesev.tplinkdns.com:4000/static/products/" + src,   // uri: "http://homesev.tplinkdns.com:4000/static/products/"
              }}
            />
          </View>
          <View style={styles.inner_text}>
            <Text
              style={{
                width: 100,
                textAlign: "left",
                color: "#A5A4AD",
                paddingBottom: 2,
                fontSize: 12,
              }}
              numberOfLines={2}
            >
              {name}
            </Text>
            <Text
              style={{ width: 100, textAlign: "left", fontSize: 14 }}
              numberOfLines={2}
            >
              {description}
            </Text>
          </View>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  banner: {
    alignSelf: "center",
    width: screenWidth / 1.25,
    height: 90,
    marginTop: 5,
    flexDirection: "row",
    //  backgroundColor: '#FE7578'
  },
  vertical_line: {
    height: 110,
    width: 2,
    backgroundColor: "#FE7578",
    opacity: 0.5,
    position: "absolute",
    left: 19,
    top: 25,
  },
  type: {
    marginTop: 5,
    flexDirection: "row",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  image_container: {
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    backgroundColor: "white",
    width: 90,
    borderRadius: 15,
    shadowColor: "#cecece",
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    borderColor: "#F3F3F3",
    borderWidth: Platform.OS == "android" ? 2 : 1,
  },
  inner_text: {
    padding: 20,
  },
});

export default RoutineDetails;
