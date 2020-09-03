import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  Button,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Effects from "../components/Effects";
import { MainStateContext } from "../context/MainContext";
import { AsyncStorage } from "react-native";

const screenWidth = Math.round(Dimensions.get("window").width);
const ProfileMini = ({data, handleScrollToRef }) => {
  //let x = AsyncStorage.getItem('_token', (error, result) => error ? null : result)
  //console.log(` Tokenu meu ${x}`)
  //  console.log(ref)
  const mainStateContext = useContext(MainStateContext);
//  console.log(data.filter(item => item.id == mainStateContext.state.user.skintype).map(obj => obj.name))
 // console.log(mainStateContext.userState);
  return (
    <>
      <View style={styles.shadow}>
        <View style={styles.container}>
          <Effects topPos leftPos medium />
          <LinearGradient
            colors={["#12c2e9", "#c471ed", "#f64f59"]}
            start={[0, 8]}
            end={[4, 0]}
            location={[1, 5, 1]}
            style={styles.header}
          >
            <Effects bottomPos leftPos small />
            <View style={styles.inner_profile}>
              <Text style={styles.text}>
                {" "}
                Hi,{" "}
                {mainStateContext &&
                mainStateContext.state.user &&
                mainStateContext.state.user.username
                  ? mainStateContext.state.user.username
                  : "Loading..."}{" "}
              </Text>
              <View style={styles.inner_profile_info}>
                <View>
                  <Text style={styles.inner_profile_text}>Skin Type</Text>
                  <Text style={{ alignSelf: "center" }}>
                  {mainStateContext &&
                    mainStateContext.state.user &&
                    mainStateContext.state.user.skintype == -1 ? "-" :
                    mainStateContext &&
                    mainStateContext.state.user &&
                    mainStateContext.state.user.skintype
                      ? data.filter(item => item._id == mainStateContext.state.user.skintype).map(obj => obj.name)
                      : "Loading..."}
                  </Text>
                </View>
                <View>
                  <Text style={styles.inner_profile_text}>Active routine</Text>
                  <Text style={{ alignSelf: "center" }}>-</Text>
                </View>
              </View>
              <View>
                <Image
                  style={styles.avatar}
                  source={require("../resources/wellness.png")}
                />
              </View>
              <View style={styles.buttons_area}>
                <TouchableOpacity
                  onPress={() => handleScrollToRef()}
                  style={{ marginTop: Platform.OS == "android" ? 10 : 10 }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#12c2e9",
                      fontWeight: "500",
                    }}
                  >
                    <Icon name="certificate" size={18} color="#12c2e9" /> CHANGE
                    SKIN TYPE
                  </Text>
                </TouchableOpacity>
                <View
                 
                  id="spliiter"
                  style={{ width: 1, height: 40, backgroundColor: "#F3F3FF" }}
                ></View>
                <TouchableOpacity
                  style={{ marginTop: Platform.OS == "android" ? 10 : 10 }}
                  onPress={() => Alert.alert("To Be added")}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#A7D261",
                      fontWeight: "500",
                    }}
                  >
                    <Icon name="leaf" size={18} color="#BBEC6C" /> CHANGE
                    ROUTINE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flex: 1,
    elevation: 5,
    overflow: "hidden",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 10,
  },
  header: {
    width: screenWidth,
    alignContent: "center",
    justifyContent: "center",
    height: 200,
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "System",
    alignSelf: "center",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  inner_profile: {
    padding: 5,
    shadowColor: "black",
    elevation: 15,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    width: screenWidth / 1.2,
    height: 150,
    borderRadius: 10,
    backgroundColor: "white",
    position: "relative",
  },
  inner_profile_info: {
    position: "absolute",
    width: 250,
    height: 120,
    paddingLeft: 55,
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    alignItems: "center",
  },
  inner_profile_text: {
    fontSize: 12,
    color: "#A5A4AD",
  },
  avatar: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    alignSelf: "flex-start",
  },
  buttons_area: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: "#F3F3FF",
    borderTopWidth: 1,
    height: 35,
    width: screenWidth / 1.3,
    alignSelf: "center",
  },
  button: {
    width: screenWidth / 6,
    backgroundColor: "#c471ed",
    height: 20,
    borderRadius: 15,
    margin: 15,
    elevation: 5,
    shadowColor: "#cecece",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderColor: "#F3F3F3",
    // borderWidth: Platform.OS == "android" ? 1 : 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileMini;
