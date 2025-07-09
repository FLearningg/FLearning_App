import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainRouter from "./src/navigation/MainRoute";
import { useFonts } from "expo-font";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";
import CustomToast from "./src/components/Toast/CustomToast";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "./src/redux/store";
import { fetchCurrentUser, loadAuthFromStorage } from "./src/redux/store/authSlice";

function AppContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  // useEffect này sẽ chạy một lần khi ứng dụng tải,
  // hoặc mỗi khi trạng thái isAuthenticated thay đổi.
  useEffect(() => {
    // Nếu có token (isAuthenticated = true), gọi API để lấy thông tin mới nhất
    if (isAuthenticated) {
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, dispatch]);
  useEffect(() => {
    dispatch(loadAuthFromStorage());
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <MainRouter />
      <Toast config={{ custom_with_image: (props) => <CustomToast {...props} /> }} />
    </View>
  );
}
export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
