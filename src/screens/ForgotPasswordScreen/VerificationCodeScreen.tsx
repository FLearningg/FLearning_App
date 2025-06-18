import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const VerificationCodeScreen = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const navigation = useNavigation();

  const inputs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCodeInput = (value, index) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < code.length - 1) {
        inputs.current[index + 1].focus();
      } else if (!value && index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length === 4) {
      navigation.navigate('CreateNewPassword');
    } else {
      alert("Please enter complete verification code.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#212121" />
        <Text style={styles.title}>Forgot Password</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.infoText}>
          Code has been sent to (+1) ***-***-*529
        </Text>

        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              style={styles.codeInput}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(value) => handleCodeInput(value, index)}
              value={digit}
              secureTextEntry={digit !== ""}
            />
          ))}
        </View>

        <Text style={styles.resendText}>
          Resend Code in <Text style={styles.timer}>{timer}s</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
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
  title: {
    fontWeight: '600',
    fontSize: 22,
    marginLeft: 10,
    color: "#212121",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    fontWeight: '500',
    fontSize: 15,
    color: "#666666",
    marginBottom: 30,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 30,
  },
  codeInput: {
    fontWeight: '600',
    backgroundColor: "#FFFFFF",
    width: 50,
    height: 50,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    elevation: 2,
  },
  resendText: {
    fontWeight: '500',
    color: "#666666",
    fontSize: 14,
  },
  timer: {
    color: "#2563EB",
  },
  verifyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 30,
    width: "80%",
    marginBottom: 30,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    color: "#FFFFFF",
    marginRight: 10,
  },
});

export default VerificationCodeScreen;
