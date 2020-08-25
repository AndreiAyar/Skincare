import React, { useState, useEffect } from "react";
import moment from "moment";
import { Constants, Notifications } from "expo";

import * as Permissions from "expo-permissions";
import notificationsController from '../controllers/NotificationsController'
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
  } catch (error) {
    console.log("Nu s-au putut sterge");
  }
};

export default (state, action) => {
  switch (action.type) {
    case "ASSIGN_NOTIFICATION":
      getiOSNotificationPermission();
      cancelActiveNotifications();
      notificationsController(action.time, action.title,action.body, state.user, action.partOfTheDay, action.routine_id, action.route_params)
      return {
        ...state,
        notifications: {
          time: moment(action.time, "HH:mm").toString(),
        },
      };
 
    case "INIT_USER":
      return {
        ...state,
        user: action.payload,
        loaded: true,
      };
    case "SET_SKIN_TYPE":
      return {
        ...state,
        user: {
          ...state.user,
          skintype: action.payload,
        },
      };
 
    default:
      throw new Error();
  }
};
