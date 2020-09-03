import React, { useState, useEffect, useContext } from "react";
import { Text } from "react-native";
import { Constants, Notifications } from "expo";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as Permissions from "expo-permissions";
import { storeToken, readToken } from "../controllers/StorageHandler";
import { set } from "react-native-reanimated";
import moment from "moment";
const ROUTINES_GQL = gql`
  query routines($filter: [Filter]) {
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

async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}
const cancelActiveNotifications = () => {
  try {
    console.log("stergem odata");
    Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    // console.log("Nu s-au putut sterge");
  }
};
let firstTrigger = false;
let firstData = false;
let firstNotif = false;
const useNotification = () => {
  const [incomingNotifications, setIncomingNotifications] = useState(null);
  const [notificationBody, setNotificationBody] = useState([]);
  const [currentRoutine, setCurrentRoutine] = useState([]);
  const [getRoutines, { data, loading }] = useLazyQuery(ROUTINES_GQL);

  useEffect(() => {
    if (firstNotif && incomingNotifications) {
      console.log("apare h..");
      let notificationHours;
      getiOSNotificationPermission();
      cancelActiveNotifications();
      notificationHours =
        incomingNotifications &&
        incomingNotifications.activeNotifications &&
        incomingNotifications.activeNotifications.map((el, index) => {
          //   console.log(Object.keys(el));
          if (el["routine_id"]) {
            //    console.log('Pentru rotine id', el.routine_id)
            return {
              [el["routine_id"]]: {
                ["morning_notification"]: {
                  time: el["morning_notification"],
                },
                ["night_notification"]: {
                  time: el["night_notification"],
                },
                ["custom_notification"]: {
                  time: el["custom_notification"],
                },
              },
            };
          }
        });
      notificationHours &&
        notificationHours.map((hours) => {
          notificationBody.routines.map((notif, notificationIndex) => {
            // console.log(notif)
            if (hours[notif._id]) {
              //  console.log(hours[notif._id].morning_notification)
              if (Object.keys(hours)[0] == notif._id) {
                for (let i in notif.RoutineDetails) {
                  if (notif.RoutineDetails[i].partOfDay == "morning") {
                    // console.log(notif.RoutineDetails[i].partOfDay)
                    // console.log(notif._id)
                    // console.log(hours[notif._id].morning_notification.time)
                    // console.log(notif.RoutineDetails[i])
                    insertNotificationIntoDevice(
                      "Morning Notification",
                      `Time for your Morning Routine 🥰 ☀️ !`,
                      notif._id,
                      notif.RoutineDetails[i],
                      hours[notif._id].morning_notification.time
                    );
                  }
                  if (notif.RoutineDetails[i].partOfDay == "night") {
                    // console.log(notif.RoutineDetails[i].partOfDay)
                    // console.log(notif._id)
                    // console.log(hours[notif._id].morning_notification.time)
                    // console.log(notif.RoutineDetails[i])
                    insertNotificationIntoDevice(
                      "Night Notification",
                      `Time for your Night Routine 🥰 🌙 !`,
                      notif._id,
                      notif.RoutineDetails[i],
                      hours[notif._id].night_notification.time
                    );
                  }
                  if (notif.RoutineDetails[i].partOfDay == "weekly") {
                    // console.log(notif.RoutineDetails[i].partOfDay)l
                    // console.log(notif._id)
                    // console.log(hours[notif._id].morning_notification.time)
                    // console.log(notif.RoutineDetails[i])
                    insertNotificationIntoDevice(
                      "Weekly Notification",
                      `Time for your Weekly Routine 🥰 📅 !`,
                      notif._id,
                      notif.RoutineDetails[i],
                      hours[notif._id].custom_notification.time
                    );
                  }
                }
              }
            }
            // if (hours[notif._id]) {
            //   if (hours[notif._id].custom_notification.time) {
            //     // console.log(
            //     //   `setam custom la ${
            //     //     hours[notif._id].custom_notification.time
            //     //   } pentru ${notif._id} cu produsele:`
            //     // );
            //     notif.RoutineDetails.map((details) => {
            //       if (details.partOfDay == "weekly") {
            //         //console.log(details)
            //         console.log(' a intrat custom')
            //         // insertNotificationIntoDevice(
            //         //   "Weekly Notification",
            //         //   `Time for your Weekly Routine 🥰 📅 !`,
            //         //   notif._id,
            //         //   details,
            //         //   hours[notif._id].custom_notification.time
            //         // );
            //       }
            //       if (hours[notif._id].morning_notification.time ) {
            //         console.log(' a intrat morning')
            //         console.log(notif._id)
            //         console.log(Object.keys(hours)[0])
            //        // console.log(hours)
            //     //    console.log(details)
            //         // insertNotificationIntoDevice(
            //         //   "Morning Notification",
            //         //   `Time for your Morning Routine 🥰 ☀️ !`,
            //         //   notif._id,
            //         //   details,
            //         //   hours[notif._id].morning_notification.time
            //         // );
            //       }
            //       if (hours[notif._id].night_notification.time) {
            //         console.log(' a intrat night')
            //         // insertNotificationIntoDevice(
            //         //   "Night Notification",
            //         //   `Time for your Night Routine 🥰 🌙 !`,
            //         //   notif._id,
            //         //   details,
            //         //   hours[notif._id].night_notification.time
            //         // );
            //       }
            //     });
            //   }
          });
        });
      //  });
      //  });
    }
    firstNotif = true;
  }, [notificationBody]);
  const insertNotificationIntoDevice = (
    title,
    body,
    routine_id,
    data,
    time
  ) => {
    console.log(
      "titlu",
      title,
      "body",
      body,
      "unique notif id",
      routine_id,
      "data",
      data,
      "time",
      time
    );
    let adjustedTime = () => {
      let now = moment().format("YYYY-MM-DD HH:mm:ss");
      console.log("acuuuuuuuuuu", now);
      let fromDB = moment(time).format("YYYY-MM-DD HH:mm:ss"); // ce vine din DB
      console.log("din db", fromDB);
      let correctTime = time;
      if (fromDB < now) {
        let daysToAdd = moment(now).diff(fromDB, "days") + 1;
        console.log(`+${daysToAdd} zile`);

        let tomorow = moment(correctTime).add(daysToAdd, "days").toDate(); //new Date(fromDB.getTime() + 1000 * 60 * 60 * 24);
        console.log(moment(tomorow).toDate());
        correctTime = tomorow;
      }
      return new Date(correctTime).getTime();
    };
    let NOTIF;
    const localnotification = {
      title: title,
      body: body,
      data: {
        routine_id,
        ...data,
      },
      _displayInForeground: false,
      android: {
        sound: true,
      },
      ios: {
        sound: true,
      },
    };
    const schedulingOptions = {
      time: adjustedTime(),
      repeat: "day",
    };

    NOTIF = Notifications.scheduleLocalNotificationAsync(
      localnotification,
      schedulingOptions
    );
    console.log(schedulingOptions);
  };
  useEffect(() => {
    if (firstTrigger) {
      console.log("inuseEffect");
      console.log(currentRoutine);
      getRoutines({
        variables: {
          filter: currentRoutine.map((id) => ({ routine_id: id })),
        },
      });
    }

    firstTrigger = true;
  }, [incomingNotifications]);
  useEffect(() => {
    if (firstData && data) {
      console.log("vin Datele");
      //   console.log(data)
      setNotificationBody(data);
      setCurrentRoutine([]);
      //console.log(notificationBody)
    }
    firstData = true;
  }, [data]);

  const assignNotification = (notificationData) => {
    notificationData &&
      notificationData.activeNotifications &&
      notificationData.activeNotifications.map(({ routine_id }) => {
        setCurrentRoutine((prevArray) => [...prevArray, routine_id]);
      });
    setIncomingNotifications(notificationData);
  }; //

  return {
    assignNotification,
  };
};

export default useNotification;

// const notificationsHandler = (notificationsData) => {
//   // const [incomingNotifications, setIncomingNotifications] = useState({});
//   // const [notificationBody, setNotificationBody] = useState(null);
//   // const [currentRoutine, setCurrentRoutine] = useState();
//  // const [getRoutines, { data, loading, called }] = useLazyQuery(ROUTINES_GQL);
// console.log("MATA")
//   // useEffect(() => {
//   //   // getRoutines({
//   //   //   variables: {
//   //   //     filter: currentRoutine,
//   //   //   },
//   //   // });
//   //   console.log('fired', notificationsData)

//   // }, [notificationsData]);

//   // const assignNotification = (notificationsData) => {
//   //  setIncomingNotifications(notificationsData);

//   //  incomingNotifications && incomingNotifications.activeNotifications&& console.log(incomingNotifications)

//   //   getiOSNotificationPermission();
//   //   cancelActiveNotifications();
//   //   incomingNotifications.activeNotifications.map(({ routine_id }) => {
//   //     //console.log('fa fetch la', routine_id)
//   //     //!loading && setCurrentRoutine(routine_id);
//   //     //!loading && data.routines && console.log(data.routines)
//   //     //console.log("sarpili la fiecare", data.routines[0]._id);
//   //   });

//   // data &&
//   //   data.routines &&
//   //   console.log("sarpili la fiecare", data.routines[0]._id);
//   // console.log("forta boss", notificationsData);
//   // reFetch(fetch + 1);

//   //   console.log(route_params);
//   //  z.activeNotifications.map((notification) => {
//   //    console.log(notification);

//   // let NOTIF;
//   // const localnotification = {
//   //   title: `Time for your ${partOfTheDay} 🥰 !`,
//   //   body,
//   //   data: route_params,
//   //   _displayInForeground: false,
//   //   android: {
//   //     sound: true,
//   //   },
//   //   ios: {
//   //     sound: true,
//   //   },
//   // };
//   // const schedulingOptions = {
//   //   time,
//   //   repeat: "day",
//   // };

//   // NOTIF = Notifications.scheduleLocalNotificationAsync(
//   //   localnotification,
//   //   schedulingOptions
//   // );
//   // return {
//   //   assignNotification,
//   // };
// };

// export default notificationsHandler;
