import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainRouter from "./src/navigation/MainRoute";
import { useFonts } from "expo-font";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";
import CustomToast from "./src/components/Toast/CustomToast";

export default function App() {
  return (
    <View style={styles.container}>
      <MainRouter />
      <Toast config={{ custom_with_image: (props) => <CustomToast {...props} /> }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
