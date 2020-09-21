import React, { useEffect, useState, useContext, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Animated,
  Button,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import RoutineDetails from "../components/RoutineDetails";
import SectionHeader from "../components/SectionHeader";
import LocalNotification from "../components/LocalNotification";
import Icon from "react-native-vector-icons/Feather";
import { MainStateContext } from "../context/MainContext";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import { SafeAreaView } from "react-navigation";
import { setPlaneDetection } from "expo/build/AR";
import RoutineBanner from "../components/RoutineBanner";
import useNotification from "../controllers/NotificationsController";

const screenWidth = Math.round(Dimensions.get("window").width);
let now;
const IMAGE_HEIGHT = 200;

const UPDATE_NOTIFICATION = gql`
  mutation updateNotification(
    $userId: String!
    $routine_id: String!
    $morning_notification: String
    $night_notification: String
    $custom_notification: String
  ) {
    updateNotification(
      userId: $userId
      routine_id: $routine_id
      morning_notification: $morning_notification
      night_notification: $night_notification
      custom_notification: $custom_notification
    ) {
      message
      success
      token
      activeNotifications{
      routine_id
      morning_notification
      custom_notification
      night_notification
    }
    }
  }
`;

const Routine = (props) => {
  const navigation = useNavigation();

  const [scrollY, setScrollY] = useState(0);
  const imageMap = {
    "morning.jpg": require("../resources/routines/morning.jpg"),
    "night.jpg": require("../resources/routines/night.jpg"),
  };

  let scrollAnimatedValue = new Animated.Value(0);
  const { id, type, products } = props.route.params;
  //console.log('fum', id)
  let routine_id = id;
  // console.log('rid')
  // console.log(products)
  // console.log(props.route.params);
  //console.log('id la rutina ? ', id)
  const insets = useSafeArea();
  const { top: marginTop } = insets;

  const handleScroll = (event) => {
    //setScrollY(event.nativeEvent.contentOffset.y)
    now = event.nativeEvent.contentOffset.y;
    console.log(event.nativeEvent.contentOffset.y);
  };
  //console.log(insets);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Image
            style={{
              position: "absolute",
              width: 25,
              left: 10,
              zIndex: 10,
              top: Platform.OS == "ios" ? 35 : null,
            }}
            source={require("../../src/resources/back.png")}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.fillObject,
            {
              opacity: scrollAnimatedValue.interpolate({
                inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT * 1.2],
                outputRange: [0, 0, 1],
                extrapolateRight: "clamp",
              }),
            },
          ]}
        >
          <Animated.Text
            style={{
              color: "black",
              fontSize: 20,
              zIndex: 1,
              textShadowRadius: 0,
              marginLeft: 50,
              top: Platform.OS == "ios" ? 10 : null,
            }}
          >
            {type && type.charAt(0).toUpperCase() + type.slice(1)} Routine
          </Animated.Text>
        </Animated.View>
      </View>
      <Animated.Image
        source={
          imageMap[
            (type == "morning" && "morning.jpg") ||
              (type == "night" && "night.jpg")
          ]
        }
        style={[
          styles.header_image,
          {
            transform: [
              {
                translateY: scrollAnimatedValue.interpolate({
                  inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
                  outputRange: [IMAGE_HEIGHT / 2, 0, -IMAGE_HEIGHT],
                  extrapolateRight: "clamp",
                }),
              },
              {
                scale: scrollAnimatedValue.interpolate({
                  inputRange: [-IMAGE_HEIGHT / 2, 0],
                  outputRange: [1.5, 1],
                  extrapolateRight: "clamp",
                }),
              },
            ],
          },
          {
            opacity: scrollAnimatedValue.interpolate({
              inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
              outputRange: [1, 1, 0],
              extrapolateRight: "clamp",
            }),
          },
        ]}
      />
      {/* // <Image style={styles.header_image} source={this.imageMap[id == 1 && 'morning.jpg' || id == 2 && 'night.jpg']} /> */}
      <Animated.Text
        style={[
          {
            ...styles.header_text,
          },
          {
            transform: [
              {
                translateY: scrollAnimatedValue.interpolate({
                  inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
                  outputRange: [IMAGE_HEIGHT / 2, 0, -IMAGE_HEIGHT / 3],
                  extrapolateRight: "clamp",
                }),
              },
              {
                translateX: scrollAnimatedValue.interpolate({
                  inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
                  outputRange: [0, 0, -IMAGE_HEIGHT / 2],
                  extrapolateRight: "clamp",
                }),
              },
              {
                scale: scrollAnimatedValue.interpolate({
                  inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
                  outputRange: [1.1, 1, 0.8],
                  extrapolateRight: "clamp",
                }),
              },
            ],
          },
          {
            opacity: scrollAnimatedValue.interpolate({
              inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT / 1.5],
              outputRange: [1, 1, 0],
              extrapolateRight: "clamp",
            }),
          },
        ]}
      >
        {type && type.charAt(0).toUpperCase() + type.slice(1)} Routine
      </Animated.Text>
      <Animated.ScrollView
        onScroll={Animated.event(
          // scrollX = e.nativeEvent.contentOffset.x
          [{ nativeEvent: { contentOffset: { y: scrollAnimatedValue } } }],
          { useNativeDriver: true, listener: (event) => handleScroll(event) }
        )}
        scrollEventThrottle={8}
      >
        <View style={styles.routine}>
          <SectionHeader
            innerText={"Below is your choosed routine"}
            style={{
              alignSelf: "center",
              width: screenWidth / 1.25,
              //  position: now > 163 ? "absolute" : "static",
            }}
          />
          <RoutineTime
            routeParams={props.route.params}
            type={{ routine_id, type }}
          />
          <RoutineDetails data={products} />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const RoutineTime = ({ routeParams, routine_id, type }) => {
  const [time, setTime] = useState( moment("22:46", "HH:mm").toDate());
  const [show, setShow] = useState(false);
 const {assignNotification} = useNotification()
  const navigation = useNavigation();
 // console.log(notifHook)
    
  const { state, setNavigation } = useContext( MainStateContext);
  const [updateNotification, { data, loading }] = useMutation(
    UPDATE_NOTIFICATION,
    {
      onCompleted(data) {
  
      //  assignNotification(data.updateNotification);
    //  notificationHandler.assignNotification();
      assignNotification(data.updateNotification);
      //notificationsHandler(data.updateNotification)
      //  useNotifications(data.updateNotification, routeParams)
      },
    }
  );

  //console.log(state.user._id);
  const onChange = (event, selectedTime) => {
      let currentDay = moment().day();
    let currentTime = moment(selectedTime || time)
      .day(currentDay)
      .toDate(); //|| time).toDate();
    //onsole.log(selectedTime, 'atat e selectat')
    // currentTime && console.log("here", currentTime && moment(currentTime).format("YYYY-MM-DD HH:mm:ss"), moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
    //  console.log(moment(currentTime).format("YYYY-MM-DD HH:mm:ss") <= moment(new Date()).format("YYYY-MM-DD HH:mm:ss")? "maine" : " azi")
    //console.log('in bulangiu', selectedTime)
    //console.log('in state', time)
    if (
      moment(currentTime).format("YYYY-MM-DD HH:mm:ss") <=
      moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    ) {
    // currentTime = moment(selectedTime).add(1, "days").toDate(); //utc().format('YYYY-MM-DDTHH:mm:ssZZ')
      console.log("maine",currentTime);
    } else {
      console.log(
        "selectat: ",
        moment(currentTime).utc().format("YYYY-MM-DD HH:mm:ss")
      );
      console.log("acum: ", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
      console.log("azi");
    //  currentTime  = moment(t).toDate()
      // currentTime =  moment(selectedTime).add(-1, 'days').toDate();
    }
    setShow(Platform.OS === "ios");
    setTime(currentTime);
    //  console.log("sa mori tu");
    Platform.OS == "android" && setNotification(currentTime);
    console.log(time, "in stsate");
    //  console.log(moment(currentTime).format("YYYY-MM-DD HH:mm:ss"));
  };

  const style = StyleSheet.create({
    container: {
      alignSelf: "center",

      //  paddingTop:25
    },
    banner: {
      justifyContent: "center",
      alignItems: "center",
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
      padding: 5,
      marginLeft: 10,
      alignSelf: "flex-start",
      fontWeight: "bold",
    },
    innerTextDesc: {
      marginLeft: 5,
      fontSize: 16,
      position: "relative",
      fontWeight: "400",
      fontStyle: "italic",
    },
    innerDesc: {
      alignItems: "center",
      flexDirection: "row",
    },
  });
  const showTime = () => {
    setShow(show == false ? true : false);
  };
  const handleNotificationUpdateInDatabase = (w, r, u, t) => {
    //when,routineID, user, time
   // console.log("cand in zi", w);
    switch (w) {
      case "morning":
        updateNotification({
          variables: { userId: u, routine_id: r, morning_notification: t },
        });
        break;
      case "night":
        updateNotification({
          variables: { userId: u, routine_id: r, night_notification: t },
        });
        break;
      case "weekly":
        updateNotification({
          variables: { userId: u, routine_id: r, custom_notification: t },
        });
        break;
      default:
        break;
    }
  };
  const partOfTheDay = type.type;
  const setNotification = (time) => {
   console.log("aci e:", time);
    showTime();
    //console.log("idu meu este", type.routine_id);
    setNavigation(navigation);
    // assignNotification(
    //   partOfTheDay,
    //   "Get in the App to find More!😀",
    //   time,
    //   type.routine_id,
    //   routeParams
    // );
  //  setRouteParams(routeParams)
    handleNotificationUpdateInDatabase(
      partOfTheDay,
      type.routine_id,
      state.user._id,
      time
    );
 
  };
  return (
    <View style={style.container}>
      {/* {<Text>ID este: {state.notifications.time}</Text>} */}
      <RoutineBanner
        navigation
        timer={() => showTime()}
        data={{
          id: 1,
          partOfDay: type.type,
          innerText: `Daily reminder set at: ${moment(time).format("HH:mm")}`,
        }}
        // innerText={`{Daily reminder set at: ${moment(time).format("HH:mm")}`}
        //  taraba={()=>console.log('muie')}
      />
      {show && (
        <LocalNotification
          title={type.type}
          show={show}
          setNotification={setNotification}
          time={time}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
    //  paddingTop:25
  },
  header: {
    justifyContent: "center",
    alignContent: "center",
    width: screenWidth,
    opacity: 1,
    zIndex: 1,
    top: 0,
    //paddingTop:
    position: "absolute",
  },
  fillObject: {
    color: "black",
    height: 60,
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
  },
  header_image: {
    width: screenWidth,
    height: IMAGE_HEIGHT,
    position: "absolute",
    zIndex: 0,
    opacity: 1,
    top: -screenWidth / 10,
    alignSelf: "center",
    resizeMode: "cover",
  },
  header_text: {
    fontSize: 36,
    marginTop: 35,
    textShadowColor: "black",
    textShadowRadius: 1,
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    zIndex: 101,
    top: 20,
    color: "white",
    position: "absolute",
    fontFamily: "Fjalla One",
  },
  routine: {
    width: screenWidth,

    marginTop: 200 - screenWidth / 10,
  },
});
export default Routine;
