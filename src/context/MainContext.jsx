import React, { useState, useEffect, useReducer } from "react";
import { Alert } from "react-native";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import AppReducer from './Reducer';
import { AsyncStorage } from "react-native";

import {readToken} from '../controllers/StorageHandler'

import * as Permissions from "expo-permissions";
const MainStateContext = React.createContext();

const initialState = {
  user:null,
  loaded:false,
  notifications:{
    id:' '
  }
}
const ME_GQL = gql`
  query me($token: String!) {
    me(token: $token) {
      _id
      username
      skintype
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
  // const [state, setState] = useState({
  //   user: null,
  //   loaded: false,
  //   notiifcations:{

  //   }
  // });
  const [storedData, setStoredData] = useState(null);
 // const [state, setState] = useState(initialState)
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const { loading, error, data } = useQuery(ME_GQL, {
    variables: {
      token: storedData,
    },
    onCompleted(data) {
      dispatch({
        type:'INIT_USER',
        payload:data.me,
  
      })
      // setState({
      //   ...state,
      //   user: data.me,
      //   loaded: true,
      // });
    },
  });


  //Actions
  const assignNotification = (partOfTheDay, body, time) => {
    dispatch({
      type: 'ASSIGN_NOTIFICATION',
      title: `Time for your ${partOfTheDay} 🥰 !`,
      body: body,
      time: time,
    })
  }

  const setSkinType = (skintype) =>{
    // setState({
    //   ...state,
    //   user:{
    //     skintype:skintype
    //   }
    // })
    dispatch({
      type:'SET_SKIN_TYPE',
      payload:skintype

    })
  }

  //On Component Mount
  useEffect(() => {
    getiOSNotificationPermission();
    // const obtainedTokenFromController = async () => await readToken();

    // setStoredData(obtainedTokenFromController())
    AsyncStorage.getItem("__token", (error, result) => {
      error
        ? setStoredData("_")
        : result == null
          ? setStoredData("_")
          : setStoredData(result);
    });
  }, []);

  return (
    <MainStateContext.Provider
      value={{
        state,
    //    setState,
     //   userState,
        setStoredData,
        assignNotification,
        setSkinType
      }}>
      {children}
    </MainStateContext.Provider>
  );
};
export { MainStateContext, MainState };

// const getToken = async () => {
//   try {
//     let userData = await AsyncStorage.getItem("__token", (error, result) =>
//       error ? null : result
//     );
//     if (userData !== null) {
//       console.log(`Token in memoria lui ${userData}`);
//       setStoredData(userData);
//     } else {
//       setStoredData(null);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// //getToken();
