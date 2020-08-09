import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MainStateContext } from "../context/MainContext";
import RoutineBanner from "../components/RoutineBanner";
import { TouchableHighlight } from "react-native-gesture-handler";
import { readToken, storeToken } from "../controllers/StorageHandler";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
const SKIN_GQL = gql`
  mutation setSkin($id: String!, $skintype: String!) {
    setSkin(id: $id, skintype: $skintype) {
      success
      message
      token
    }
  }
`;
const ROUTINES_GQL = gql`
  query routines($filter: String) {
    routines(filter: $filter) {
      _id
      name
      RoutineDetails {
        _id
        partOfDay
        products {
          _id
          name
          type
          title
          description
          src
          refferal
        }
      }
      notification_hours
      src
    }
  }
`;
const screenWidth = Dimensions.get("screen").width;
const Routines = ({ route, navigation }) => {
  const { id, routine } = route.params;
  const routineTypes = [
    { id: 1, type: "Morning Routine", steps: 4 },
    { id: 2, type: "Night Routine", steps: 5 },
    { id: 3, type: "Weekly Routine", steps: 8 },
  ];
  //  let routinesData, isLoading, isError;
  const routinesData = useQuery(ROUTINES_GQL, {
    variables: { filter: routine },
  });
  //console.log(routinesData.data)
  if (routinesData && routinesData.data) {
    console.log(routinesData.data);
  }

  const [setSkin, { data, loading }] = useMutation(SKIN_GQL, {
    onCompleted(data) {
      console.log(data);
      storeToken(data.setSkin.token);
    },
  });

  //console.log('aici', id)
  const skinID = id;
  //console.log(routine)
  const { setSkinType } = useContext(MainStateContext);
  const mainStateContext = useContext(MainStateContext);
  const userID =
    mainStateContext &&
    mainStateContext.state.user &&
    mainStateContext.state.user._id
      ? mainStateContext.state.user._id
      : null;
  const handleSkinType = (id, skintype) => {
    setSkin({
      variables: { id: id, skintype: skintype },
    });

    setSkinType(skintype);
  };

  //////***********************SET SKIN DEFINITION END */

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.header_image}
            source={require("../resources/routines_header.png")}
          />
          <Text
            style={{ fontSize: 36, marginTop: 5, fontFamily: "Fjalla One" }}
          >
            Predifined routines
          </Text>
          <Text
            style={{
              width: 200,
              fontSize: 16,
              marginTop: 15,
              textAlign: "center",
            }}
          >
            Simple routines for your skin, for morning and night
          </Text>
          <Text
            style={{ fontSize: 26, marginTop: 15, fontFamily: "Fjalla One" }}
          >
            {routine}
          </Text>
          <TouchableOpacity
            onPress={() =>
              mainStateContext.state &&
              mainStateContext.state.user.skintype == skinID
                ? null
                : handleSkinType(userID, skinID)
            }
          >
            <View
              style={{
                ...styles.button,
                opacity:
                  mainStateContext.state &&
                  mainStateContext.state.user.skintype == skinID
                    ? 0.4
                    : 1,
                backgroundColor:
                  mainStateContext.state &&
                  mainStateContext.state.user.skintype == skinID
                    ? "#eee"
                    : "#c471ed",
                color: "black",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color:
                    mainStateContext.state &&
                    mainStateContext.state.user.skintype == skinID
                      ? "grey"
                      : "white",
                  fontWeight: "bold",
                }}
              >
                {mainStateContext.state &&
                mainStateContext.state.user.skintype == skinID
                  ? "Currently active"
                  : "Set as your skin Type"}
              </Text>
            </View>
          </TouchableOpacity>
          {routinesData && routinesData.data ? (
            <View style={styles.banner_section}>
                 {routinesData.data.routines.map(({RoutineDetails}) => RoutineDetails.map(({partOfDay, _id,products}, key)=>(
                <RoutineBanner
                  navigation={navigation}
                  key={key}
                  arrow
                  data={{partOfDay, _id,products}}//{ bannerData._id, bannerData.partOfDay,`${"steps"} Steps and products`}
                />
                 )))}
            </View>
          ) : (
            <Image
              style={{
                resizeMode: "contain",
                width: 200,
                height: 200,
                alignSelf: "center",
              }}
              source={require("../resources/splash.gif")}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Routines;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  header_image: {
    width: 300,
    height: 300,
    position: "absolute",
    zIndex: 0,
    opacity: 0.8,
    top: -50,
    right: -70,
    alignSelf: "flex-end",
    transform: [{ rotateY: "180deg" }, { rotateZ: "10deg" }],
  },
  button: {
    width: screenWidth / 2,
    height: 40,
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
  banner_section: {},
});
