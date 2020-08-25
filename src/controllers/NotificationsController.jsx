import React, { useState, useEffect } from "react";
import { Constants, Notifications } from "expo";

import * as Permissions from "expo-permissions";
import {storeToken,readToken} from "../controllers/StorageHandler"
export default (time, title, body, user, partOfTheDay, routine_id,route_params) => {
  //We changed title from what we received

console.log('bine ma', route_params)
 
  //console.log(routine_id);
  let NOTIF;
  const localnotification = {
    title: `Time for your ${partOfTheDay} 🥰 !`,
    body,
    data:route_params,
    _displayInForeground: false,
    android: {
      sound: true,
    },
    ios: {
      sound: true,
    },
  };
  const schedulingOptions = {
    time,
    repeat: "day",
  };

  NOTIF = Notifications.scheduleLocalNotificationAsync(
    localnotification,
    schedulingOptions
  );


};
