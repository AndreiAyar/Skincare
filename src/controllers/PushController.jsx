import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Button, Vibration, Platform, TextInput } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { MainState, MainStateContext } from '../context/MainContext'

const PushController = ({ laba }) => {
    const [state, setState] = useState({
        expoPushToken: '',
        notification: {},
    })
    const [text, setText] = useState('')
    const mainStateContext = useContext(MainStateContext)

    const registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            const token = await Notifications.getExpoPushTokenAsync();
           // console.log(token);
            setState({
                ...state,
                expoPushToken: token
            });
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('default', {
                name: 'default',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            });
        }
    };

    useEffect(() => {
        registerForPushNotificationsAsync();

        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        const _notificationSubscription = Notifications.addListener(_handleNotification);
    }, [])

    const _handleNotification = notification => {
        // Vibration.vibrate();
       // console.log(notification);
       // console.log('dateclick')
        mainStateContext.setState(prevState => ({
            ...prevState,
            user: {
                username: laba
            }
        }))
        setState({
            ...state,
            notification: notification
        });
    };
    // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
    const sendPushNotification = async () => {
       // console.log(state.notification)
        const message = {
            to: state.expoPushToken,
            sound: mainStateContext.notificationData.sound,
            title: mainStateContext.notificationData.title,
            body: mainStateContext.notificationData.body,
            data: { data: 'ho' },
            _displayInForeground: true,
        };
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

    };
    const handlePress = () => {
        mainStateContext.setNotificationData(prevState => ({
            ...prevState,
            title: prevState.title = laba
        }))
        sendPushNotification();
    }
    return (
        <View>
            <TextInput style={{ width: 100, height: 50, borderColor: 'red', borderWidth: 1 }} onChangeText={(text) => setText(text)}></TextInput>
            <Button title={'Press to Send Notification'} onPress={() => handlePress()} />
        </View>
    )
}

export default PushController


/*  TO GET PUSH RECEIPTS, RUN THE FOLLOWING COMMAND IN TERMINAL, WITH THE RECEIPTID SHOWN IN THE CONSOLE LOGS

    curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/getReceipts" -d '{
      "ids": ["YOUR RECEIPTID STRING HERE"]
      }'
*/