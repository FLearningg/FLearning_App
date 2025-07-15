import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";

type VerificationCodeScreenRouteProp = RouteProp<
  RootStackParamList,
  "VerificationCode"
>;

const VerificationCodeScreen = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<VerificationCodeScreenRouteProp>();
  const email = route.params?.email;
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCodeInput = (value: string, index: number) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < code.length - 1) {
        inputs.current[index + 1]?.focus();
      } else if (!value && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    const fullCode = code.join("");
    if (fullCode.length < 4) {
      Alert.alert(
        "Incomplete Code",
        "Please enter the complete verification code."
      );
      return;
    }
    navigation.navigate("CreateNewPassword", { email: email, code: fullCode });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FB" />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" size={24} color="#212121" />
        <Text style={styles.title}>Enter verification code</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.infoText}>
          The code has been sent to your email {"\n"}
          <Text style={{ fontWeight: "bold" }}>{email}</Text>
        </Text>
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => {
                inputs.current[index] = el;
              }}
              style={styles.codeInput}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(value) => handleCodeInput(value, index)}
              value={digit}
            />
          ))}
        </View>
        <Text style={styles.resendText}>
          Resend code in <Text style={styles.timer}>{timer}s</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.buttonText}>Confirm</Text>
        <Feather name="arrow-right-circle" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  title: { fontWeight: "600", fontSize: 22, marginLeft: 10, color: "#212121" },
  content: { flex: 1, alignItems: "center", justifyContent: "center" },
  infoText: {
    fontWeight: "500",
    fontSize: 15,
    color: "#666666",
    marginBottom: 30,
    textAlign: "center",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginBottom: 30,
  },
  codeInput: {
    fontWeight: "600",
    backgroundColor: "#FFFFFF",
    width: 60,
    height: 60,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 22,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#eee",
  },
  resendText: { fontWeight: "500", color: "#666666", fontSize: 14 },
  timer: { color: "#2563EB" },
  verifyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 30,
    width: "100%",
    marginBottom: 30,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#FFFFFF",
    marginRight: 10,
  },
});

export default VerificationCodeScreen;
