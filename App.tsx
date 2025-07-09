import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainRouter from "./src/navigation/MainRoute";
import { useFonts } from "expo-font";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";
import CustomToast from "./src/components/Toast/CustomToast";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MainRouter />
        <Toast config={{ custom_with_image: (props) => <CustomToast {...props} /> }} />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
