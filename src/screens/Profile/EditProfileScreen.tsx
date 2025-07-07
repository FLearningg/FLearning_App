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
  Image, // Sử dụng Image cho avatar
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import ButtonNavigate1 from "../../components/ButtonNavigate1";

// --- Định nghĩa màu sắc ---
const PRIMARY_COLOR = "#66C5B3";
const AVATAR_SIZE = 110;

const EditProfileScreen = () => {
  const navigation = useNavigation();

  // Dùng useState để quản lý trạng thái của các trường input
  const [fullName, setFullName] = useState("Alex");
  const [nickName, setNickName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("(+84) 987 654 321");
  const [dob, setDob] = useState("10/08/1995");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const email = "hernandex.redial@gmail.ac.in"; // Email thường không cho sửa

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.container.backgroundColor}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.content}>
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              {/* Avatar image placeholder */}
              <View style={styles.avatar}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
                  }}
                  style={styles.avatarImage}
                />
              </View>
              <TouchableOpacity style={styles.editIcon}>
                <MaterialIcons name="photo-camera" size={24} color="#2A7FF3" />
              </TouchableOpacity>
            </View>
          </View>
          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Full Name */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Full Name"
                placeholderTextColor="#A0A0A0"
              />
            </View>
            {/* Nick Name */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={nickName}
                onChangeText={setNickName}
                placeholder="Nick Name"
                placeholderTextColor="#A0A0A0"
              />
            </View>
            {/* Date of Birth */}
            <View style={styles.inputWrapperRow}>
              <MaterialIcons
                name="calendar-today"
                size={20}
                color="#A0A0A0"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { paddingLeft: 36 }]}
                value={dob}
                onChangeText={setDob}
                placeholder="Date of Birth"
                placeholderTextColor="#A0A0A0"
              />
            </View>
            {/* Email */}
            <View style={styles.inputWrapperRow}>
              <MaterialIcons
                name="email"
                size={20}
                color="#A0A0A0"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { paddingLeft: 36 }]}
                value={email}
                editable={false}
                placeholder="Email"
                placeholderTextColor="#A0A0A0"
              />
            </View>
            {/* Phone Number */}
            <View style={styles.inputWrapperRow}>
              {/* Placeholder for flag icon */}
              <View style={styles.flagIcon} />
              <MaterialIcons
                name="arrow-drop-down"
                size={20}
                color="#A0A0A0"
                style={styles.flagDropdown}
              />
              <TextInput
                style={[styles.input, { paddingLeft: 56 }]}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Phone Number"
                placeholderTextColor="#A0A0A0"
                keyboardType="phone-pad"
              />
            </View>
            {/* Gender Custom Dropdown */}
            <TouchableOpacity
              style={styles.inputWrapperRow}
              activeOpacity={0.7}
              onPress={() => setGenderModalVisible(true)}
            >
              <Text
                style={[
                  styles.input,
                  { color: gender ? "#22223B" : "#A0A0A0" },
                ]}
              >
                {gender
                  ? genderOptions.find((opt) => opt.value === gender)?.label
                  : "Gender"}
              </Text>
              <MaterialIcons
                name="arrow-drop-down"
                size={24}
                color="#A0A0A0"
                style={styles.inputIconRight}
              />
            </TouchableOpacity>
            {/* Gender Modal */}
            <Modal
              visible={genderModalVisible}
              transparent
              animationType="fade"
              onRequestClose={() => setGenderModalVisible(false)}
            >
              <TouchableWithoutFeedback
                onPress={() => setGenderModalVisible(false)}
              >
                <View style={styles.modalOverlay} />
              </TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {genderOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={styles.modalOption}
                    onPress={() => {
                      setGender(option.value);
                      setGenderModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalOptionText}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>
      {/* Update Button fixed at bottom */}
      <View style={styles.updateButtonWrapper}>
        <ButtonNavigate1
          buttonText="Update"
          onPress={() => {
            /* handle update */
          }}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 10,
  },
  headerButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#22223B",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 40,
  },
  avatarContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#2A7FF3",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#2A7FF3",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  formSection: {
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
  },
  inputWrapper: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
    paddingHorizontal: 16,
    paddingVertical: 2,
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
  inputIconRight: {
    position: "absolute",
    right: 12,
    zIndex: 1,
  },
  flagIcon: {
    width: 28,
    height: 20,
    borderRadius: 4,
    backgroundColor: "#eee", // Placeholder for flag
    marginRight: 8,
    marginLeft: 0,
  },
  flagDropdown: {
    marginRight: 8,
  },
  picker: {
    flex: 1,
    color: "#22223B",
    backgroundColor: "transparent",
    height: 48,
    marginLeft: -8,
    marginRight: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalContent: {
    position: "absolute",
    left: 30,
    right: 30,
    top: "40%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  modalOption: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  modalOptionText: {
    fontSize: 16,
    color: "#22223B",
    textAlign: "center",
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

export default EditProfileScreen;
