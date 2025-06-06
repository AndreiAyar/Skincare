import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Alert,
  PlatformTouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";

const screenWidth = Dimensions.get("screen").width;
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

const LocalNotification = (props) => {
  return (
    <View>
      <DateTimePicker
        testID="dateTimePicker1"
        minuteInterval={1}
        value={props.time}
        mode="time"
        is24Hour={true}
        display="clock"
        onChange={props.onChange}
      />

      {props.show && Platform.OS === "ios" && (
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
          onPress={() => props.setNotification(props.time)}
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
};

export default LocalNotification;
