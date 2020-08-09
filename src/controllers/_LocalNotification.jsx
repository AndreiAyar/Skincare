import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Button,
  Alert,
  PlatformTouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Text
} from "react-native";
const screenWidth = Dimensions.get("screen").width;
import { Constants, Notifications } from "expo";
import * as Permissions from "expo-permissions";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

export default class LocalNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
    };
    //  this.time = props.time
  }
  _handleButtonPress = () => {
    this.props.showTime();
   // console.log('a da t ok baiatu')
    //console.log(this.props.time);
    const localnotification = {
      title: `Time for your ${this.props.title} 🥰 `,
      body: `Get in the app to find more about your ${this.props.title} routine !`,
      android: {
        sound: true,
      },
      ios: {
        sound: true,
      },
    };
    //  let sendAfterFiveSeconds = moment("05.22.2020 04:00", "MM.DD.YYYY HH:mm")
    let sendAfterFiveSeconds = moment("20:30", "HH:mm");
    //  sendAfterFiveSeconds += 600000;

    const schedulingOptions = { time: this.props.time, repeat: "day" };
    let id = Notifications.scheduleLocalNotificationAsync(
      localnotification,
      schedulingOptions
    );
    this.setState({ id: id });
    let NotId = this.state.id;
   // console.log(NotId);
  };
  listenForNotifications = () => {
    Notifications.addListener((notification) => {
      if (notification.origin === "received" && Platform.OS === "ios") {
        Alert.alert(notification.title, notification.body);
      }
    });
  };
  componentWillMount() {
    getiOSNotificationPermission();
    this.listenForNotifications();
  }

  render() {
    return (
      <View>
        <DateTimePicker
          testID="dateTimePicker1"
          minuteInterval={1}
          value={this.props.time}
          mode="time"
          is24Hour={true}
          display="clock"
          onChange={this.props.onChange}
        />

        {this.props.show && Platform.OS === "ios" && (
          <TouchableOpacity
            style={{
              width: screenWidth / 3,
              height: 30,
              alignSelf: "center",
              justifyContent: "center",
              borderRadius: 15,
              elevation: 0.2,
              shadowColor: "#cecece",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.333,
              shadowRadius: 10,
              borderColor: "#F3F3F3",
              borderWidth: Platform.OS == "android" ? 2 : 1,
              backgroundColor: "white",
            }}
            onPress={() => this.props.showTime()}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#FE7578",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Done!
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
