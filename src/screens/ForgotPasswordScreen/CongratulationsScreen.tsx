import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/NavigationType";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const CongratulationsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Launching");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: "https://img.icons8.com/clouds/100/000000/checked--v1.png",
          }}
          style={styles.image}
        />
        <Text style={styles.title}>Success!</Text>
        <Text style={styles.subtitle}>
          Your password has been successfully reset. Please log in with your new
          password.
        </Text>
        <ActivityIndicator
          size="large"
          color="#555"
          style={{ marginTop: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#555570",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "#F5F7FB",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 5,
  },
  image: { width: 100, height: 100, marginBottom: 20 },
  title: {
    fontSize: 22,
    color: "#212121",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 10,
  },
});

export default CongratulationsScreen;
