import React, { useState, useEffect } from "react";
import moment from "moment";
import { Constants, Notifications } from "expo";

import * as Permissions from "expo-permissions";

let NOTIF;
let NIGHT_NOTIF;
let WEEKLY_NOTIF;

async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}
const cancelActiveNotifications = () => {
  try {
    Notifications.cancelAllScheduledNotificationsAsync();
    // MORNING_NOTIF &&
    //   Notifications.cancelScheduledNotificationAsync(MORNING_NOTIF._55);
    // NIGHT_NOTIF &&
    //   Notifications.cancelScheduledNotificationAsync(NIGHT_NOTIF._55);
    // WEEKLY_NOTIF &&
    //   Notifications.cancelScheduledNotificationAsync(WEEKLY_NOTIF._55);
  } catch (error) {
    console.log("Nu s-au putut sterge");
  }
};

export default (state, action) => {
  switch (action.type) {
    case "ASSIGN_NOTIFICATION":
      getiOSNotificationPermission();
      cancelActiveNotifications();
      //onsole.log(moment(action.time, "HH:mm").toString())
      const localnotification = {
        title: action.title,
        body: action.body,
        android: {
          sound: true,
        },
        ios: {
          sound: true,
        },
      };
      // console.log('a dat aici')
      // console.log(action.time);
      // console.log(moment(action.time, "HH:mm"));
      const schedulingOptions = {
        time: action.time,
        repeat: "day",
      };
      
      NOTIF = Notifications.scheduleLocalNotificationAsync(
        localnotification,
        schedulingOptions
      );

      return {
        ...state,
        notifications: {
          id: moment(action.time, "HH:mm").toString(),
        },
      };
    case "INIT_USER":
      return {
        ...state,
        user: action.payload,
        loaded: true,
      };
    case "SET_SKIN_TYPE":
      // console.log(action.id)
      //  console.log(action.payload)
      /*GQL DEFINITIONS */

      //////***********************SET SKIN DEFINITION START */

      return {
        ...state,
        user: {
          ...state.user,
          skintype: action.payload,
        },
      };

    // return { count: notificationData.count - 1 };
    default:
      throw new Error();
  }
};
