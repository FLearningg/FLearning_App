import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainRouter from './src/navigation/MainRoute';
import { useFonts } from 'expo-font';
import { StyleSheet, ActivityIndicator, View } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    'OPTIFrankfurter-Medium': require('./assets/font/OPTIFrankfurter-Medium.otf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MainRouter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
