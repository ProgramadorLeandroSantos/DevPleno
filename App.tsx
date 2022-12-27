import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import codePush from "react-native-code-push";


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

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
