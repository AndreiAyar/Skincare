import React, { useState, useEffect, useReducer } from "react";
import { Alert } from "react-native";
import gql from "graphql-tag";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import AppReducer from "./Reducer";
import { AsyncStorage } from "react-native";
import { Notifications } from "expo";
import { readToken } from "../controllers/StorageHandler";
import { useNavigation } from "@react-navigation/native";
import * as Permissions from "expo-permissions";

import * as RootNavigation from "../navigation/PushHandler";
const MainStateContext = React.createContext();

const initialState = {
  user: null,
  loaded: false,
  notifications: {
    time: " ",
  },
};
const ME_GQL = gql`
  query me($token: String!) {
    me(token: $token) {
      _id
      username
      skintype
      notifications {
        routine_id {
          name
        }
        morning_notification
        night_notification
        custom_notification
      }
    }
  }
`;

async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

const MainState = ({ children }) => {
  const [storedData, setStoredData] = useState(null);
  const [navigation, setNavigation] = useState();
  const [notification, setNotification] = useState();
  const [state, dispatch] = useReducer(AppReducer, initialState);
  //console.log(storedData)
  // console.log('innotif',notification);
  RootNavigation && console.log(RootNavigation);

  const [me, { data, loading }] = useLazyQuery(ME_GQL, {
    variables: {
      token: storedData,
    },

    onCompleted(data) {
      console.log("peyload", data.me);
      dispatch({
        type: "INIT_USER",
        payload: data.me,
      });
    },
  });

  //Actions
  const assignNotification = (
    partOfTheDay,
    body,
    time,
    routine_id,
    route_params
  ) => {
    dispatch({
      type: "ASSIGN_NOTIFICATION",
      title: `Time for your ${partOfTheDay} 🥰 !`,
      body: body,
      time: time,
      partOfTheDay,
      routine_id,
      route_params,
    });
  };

  const setSkinType = (skintype) => {
    dispatch({
      type: "SET_SKIN_TYPE",
      payload: skintype,
    });
  };
  const handleNotification = async (notification) => {
    setNotification(notification);
    RootNavigation.navigate("Routine", {
      screen: "Routines",
      id: notification.data.id,
      steps: notification.data.products.length,
      type: notification.data.type,
      products: notification.data.products,
    });
  };

  //On Component Mount
  useEffect(() => {
    getiOSNotificationPermission();
    _notificationSubscription = Notifications.addListener(handleNotification);
    AsyncStorage.getItem("__token", (error, result) => {
      error
        ? setStoredData("_")
        : result == null
        ? setStoredData("_")
        : setStoredData(result);
    });
    me();
  }, []);

  return (
    <MainStateContext.Provider
      value={{
        state,
        setStoredData,
        me,
        assignNotification,
        setSkinType,
        setNavigation,
      }}
    >
      {children}
    </MainStateContext.Provider>
  );
};
export { MainStateContext, MainState };
