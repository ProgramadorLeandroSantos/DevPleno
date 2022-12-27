import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import codePush from "react-native-code-push";
import { firebase } from '@react-native-firebase/messaging';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const loadStorageData = async () => {

    const authStatus = await firebase.messaging().requestPermission();

    const enabled =
      authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;

    console.log('CAN I ACCESS FIREBASE: ', enabled);

    if (enabled) {
      const token = await firebase.messaging().getToken();

      console.log('DEVICE_TOKEN: ', token);

      firebase.messaging().onMessage(async (remoteMessage) => {
        console.log({ log: 'RECEBENDO O PUSH COM O APP ABERTO', remoteMessage });
      });

      firebase.messaging().onNotificationOpenedApp(async (remoteMessage) => {
        console.log({ log: 'ENTROU NO onNotificationOpenedApp', remoteMessage });
      });

      firebase
        .messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
          if (remoteMessage) {
            console.log({ log: 'RECEBENDO O PUSH COM O APP FECHADO/SEGUNDO PLANO', remoteMessage });
          }
        });

      firebase.messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log({ log: 'ENTROU NO setBackgroundMessageHandler', remoteMessage });
      });
    }
  };

  useEffect(() => {
    loadStorageData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Text style={{ fontSize: 30, color: 'red' }}>Hello DevPleno</Text>
      </View>
    </SafeAreaView>
  );
};

export default codePush({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME })(App);
