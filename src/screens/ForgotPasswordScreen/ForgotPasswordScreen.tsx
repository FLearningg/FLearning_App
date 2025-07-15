import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  StatusBar,
  TextInput, // Thêm TextInput
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";
import { sendMobileResetCode } from "../../redux/services/authService";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleContinue = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      // Sử dụng email từ state để gọi API
      const response = await sendMobileResetCode(email.trim());
      Alert.alert("Recheck your email", response.data.message);

      // Chuyển email đã nhập sang màn hình tiếp theo
      navigation.navigate("VerificationCode", { email: email.trim() });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error, please try again later.";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FB" />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" size={24} color="#212121" />
        <Text style={styles.title}>Forget Password</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.instruction}>
          Please enter your registered email address to receive a recovery code.
        </Text>

        <View style={styles.inputContainer}>
          <Feather name="mail" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <>
            <Text style={styles.buttonText}>Send code</Text>
            <Feather name="arrow-right-circle" size={24} color="#FFFFFF" />
          </>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FB", paddingHorizontal: 20 },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  title: { fontWeight: "600", fontSize: 22, marginLeft: 10, color: "#212121" },
  content: { flex: 1, justifyContent: "center" },
  instruction: {
    fontWeight: "500",
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  // Style mới cho ô nhập liệu
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#212121",
  },
  //
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 30,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#FFFFFF",
    marginRight: 10,
  },
});

export default ForgotPasswordScreen;
