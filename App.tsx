import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainRouter from "./src/navigation/MainRoute";
import { useFonts } from "expo-font";
import { StyleSheet, ActivityIndicator, View } from "react-native";

export default function App() {
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
