import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import ButtonNavigate1 from "../../components/ButtonNavigate1";
import LoadingComponent from "../../components/Loading/LoadingComponent";
import { changePassword } from "../../redux/services/authService";
import GoBackButton from "../../components/GoBackButton";
import Toast from "react-native-toast-message";

// --- Định nghĩa màu sắc ---
const PRIMARY_COLOR = "#66C5B3";

const EditPasswordScreen = () => {
  const navigation = useNavigation();

  // State management for password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdatePassword = async () => {
    setError(null);
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await changePassword({
        currentPassword,
        newPassword,
        confirmNewPassword: confirmPassword,
      });
      if (
        (res.data && res.data.success) ||
        (res.data &&
          res.data.message &&
          res.data.message.toLowerCase().includes("success"))
      ) {
        navigation.navigate("Profile", { showPasswordChangedToast: true });
      } else {
        Toast.show({
          type: "custom_with_image",
          text1: "Error",
          text2: res.data?.message || "Failed to change password",
          props: {
            status: "error",
            imageUrl: require("../../../assets/images/LOGO.png"),
          },
          visibilityTime: 1500,
        });
      }
    } catch (err: any) {
      Toast.show({
        type: "custom_with_image",
        text1: "Error",
        text2: err?.response?.data?.message || "Failed to change password",
        props: {
          status: "error",
          imageUrl: require("../../../assets/images/LOGO.png"),
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: Platform.OS === "android" ? 24 : 0 }}>
        <GoBackButton
          title="Change Password"
          onPress={() => navigation.goBack()}
        />
      </View>
      <LoadingComponent visible={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.content}>
          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Current Password */}
            <View style={styles.inputWrapperRow}>
              <MaterialIcons
                name="lock"
                size={20}
                color="#A0A0A0"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { paddingLeft: 36 }]}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Current Password"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={!showCurrentPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <MaterialIcons
                  name={showCurrentPassword ? "visibility" : "visibility-off"}
                  size={20}
                  color="#A0A0A0"
                />
              </TouchableOpacity>
            </View>

            {/* New Password */}
            <View style={styles.inputWrapperRow}>
              <MaterialIcons
                name="lock-outline"
                size={20}
                color="#A0A0A0"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { paddingLeft: 36 }]}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="New Password"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={!showNewPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <MaterialIcons
                  name={showNewPassword ? "visibility" : "visibility-off"}
                  size={20}
                  color="#A0A0A0"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm New Password */}
            <View style={styles.inputWrapperRow}>
              <MaterialIcons
                name="lock-outline"
                size={20}
                color="#A0A0A0"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { paddingLeft: 36 }]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm New Password"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <MaterialIcons
                  name={showConfirmPassword ? "visibility" : "visibility-off"}
                  size={20}
                  color="#A0A0A0"
                />
              </TouchableOpacity>
            </View>

            {/* Password Requirements */}
            <View style={styles.requirementsSection}>
              <Text style={styles.requirementsTitle}>
                Password Requirements:
              </Text>
              <View style={styles.requirementItem}>
                <MaterialIcons
                  name={
                    newPassword.length >= 8
                      ? "check-circle"
                      : "radio-button-unchecked"
                  }
                  size={16}
                  color={newPassword.length >= 8 ? "#4CAF50" : "#A0A0A0"}
                />
                <Text style={styles.requirementText}>
                  At least 8 characters
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <MaterialIcons
                  name={
                    /[A-Z]/.test(newPassword)
                      ? "check-circle"
                      : "radio-button-unchecked"
                  }
                  size={16}
                  color={/[A-Z]/.test(newPassword) ? "#4CAF50" : "#A0A0A0"}
                />
                <Text style={styles.requirementText}>One uppercase letter</Text>
              </View>
              <View style={styles.requirementItem}>
                <MaterialIcons
                  name={
                    /[a-z]/.test(newPassword)
                      ? "check-circle"
                      : "radio-button-unchecked"
                  }
                  size={16}
                  color={/[a-z]/.test(newPassword) ? "#4CAF50" : "#A0A0A0"}
                />
                <Text style={styles.requirementText}>One lowercase letter</Text>
              </View>
              <View style={styles.requirementItem}>
                <MaterialIcons
                  name={
                    /\d/.test(newPassword)
                      ? "check-circle"
                      : "radio-button-unchecked"
                  }
                  size={16}
                  color={/\d/.test(newPassword) ? "#4CAF50" : "#A0A0A0"}
                />
                <Text style={styles.requirementText}>One number</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Update Button fixed at bottom */}
      <View style={styles.updateButtonWrapper}>
        <ButtonNavigate1
          buttonText="Update Password"
          onPress={handleUpdatePassword}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F7FF",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  formSection: {
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
  },
  inputWrapperRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
    paddingHorizontal: 16,
    paddingVertical: 0,
    height: 48,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: 16,
    paddingHorizontal: 0,
    paddingVertical: 14,
    fontSize: 16,
    color: "#22223B",
  },
  inputIcon: {
    position: "absolute",
    left: 12,
    zIndex: 1,
  },
  eyeIcon: {
    padding: 4,
  },
  requirementsSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#22223B",
    marginBottom: 12,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  updateButtonWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});

export default EditPasswordScreen;
