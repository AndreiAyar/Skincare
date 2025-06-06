import React, {useState,useEffect, useContext} from 'react';
import { Text, View, Button, Vibration, Platform } from 'react-native';
 
import PushController from '../controllers/PushController'
 
import { MainState, MainStateContext } from '../context/MainContext'

 

const Discover = () => {
    const mainStateContext = useContext(MainStateContext)
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        </View>
        <Text>{mainStateContext.state.user.username && mainStateContext.state.user.username}</Text>
     <PushController laba={'muied'}/>
      </View>
    );
  }


export default Discover;


  //export default {PushController, sendPushNotification};

/*  TO GET PUSH RECEIPTS, RUN THE FOLLOWING COMMAND IN TERMINAL, WITH THE RECEIPTID SHOWN IN THE CONSOLE LOGS

    curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/getReceipts" -d '{
      "ids": ["YOUR RECEIPTID STRING HERE"]
      }'
*/