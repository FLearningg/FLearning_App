import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image, // Sử dụng Image cho avatar
  Modal,
  TouchableWithoutFeedback,
  Platform,
  Alert,
  Keyboard,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import ButtonNavigate1 from "../../components/ButtonNavigate1";
import { getProfile, updateProfile } from "../../redux/services/profileService";
import LoadingComponent from "../../components/Loading/LoadingComponent";
import GoBackButton from "../../components/GoBackButton";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// --- Định nghĩa màu sắc ---
const PRIMARY_COLOR = "#66C5B3";
const AVATAR_SIZE = 110;

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef<any>(null);

  // State cho các trường input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [biography, setBiography] = useState("");
  const [userImage, setUserImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [displayFirstName, setDisplayFirstName] = useState("");
  const [displayLastName, setDisplayLastName] = useState("");
  const [newImage, setNewImage] = useState<string | null>(null);

  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const userNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const biographyRef = useRef<TextInput>(null);

  const SCROLL_OFFSET = 100; // Khoảng scroll xuống khi focus input

  // Lấy dữ liệu profile khi vào màn hình
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getProfile();
        if (res.success) {
          setFirstName(res.data.firstName || "");
          setLastName(res.data.lastName || "");
          setDisplayFirstName(res.data.firstName || "");
          setDisplayLastName(res.data.lastName || "");
          setUserName(res.data.userName || "");
          setEmail(res.data.email || "");
          setBiography(res.data.biography || "");
          setUserImage(res.data.userImage || null);
        } else {
          setError(res.message || "Không lấy được thông tin hồ sơ");
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi lấy thông tin hồ sơ");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Hàm cập nhật profile
  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError(null);
      let data;
      if (newImage) {
        data = new FormData();
        data.append("firstName", firstName);
        data.append("lastName", lastName);
        data.append("userName", userName);
        data.append("biography", biography);
        data.append("userImage", {
          uri: newImage,
          name: "avatar.jpg",
          type: "image/jpeg",
        } as any);
      } else {
        data = { firstName, lastName, userName, biography };
      }
      const res = await updateProfile(data);
      if (res.success) {
        setDisplayFirstName(firstName);
        setDisplayLastName(lastName);
        Toast.show({
          type: "custom_with_image",
          text1: "Profile updated!",
          text2: "Your profile has been updated successfully.",
          props: {
            status: "success",
            imageUrl: require("../../../assets/images/LOGO.png"),
          },
        });
        setTimeout(() => {
          navigation.goBack();
        }, 800);
      } else {
        Toast.show({
          type: "custom_with_image",
          text1: "Error",
          text2: res.message || "Cập nhật hồ sơ thất bại",
          props: {
            status: "error",
            imageUrl: require("../../../assets/images/LOGO.png"),
          },
        });
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi cập nhật hồ sơ");
    } finally {
      setLoading(false);
    }
  };

  // Hàm xin quyền camera/thư viện
  const requestPermissions = async () => {
    const mediaLibraryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    if (
      mediaLibraryStatus.status !== "granted" ||
      cameraStatus.status !== "granted"
    ) {
      Alert.alert(
        "Permission required",
        "Please allow camera and photo library access to change your avatar."
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;
    Alert.alert("Change Avatar", "Choose image source", [
      {
        text: "Take Photo",
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
          if (!result.canceled && result.assets && result.assets.length > 0) {
            setNewImage(result.assets[0].uri);
          }
        },
      },
      {
        text: "Choose from Library",
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
          if (!result.canceled && result.assets && result.assets.length > 0) {
            setNewImage(result.assets[0].uri);
          }
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: Platform.OS === "android" ? 24 : 0 }}>
        <GoBackButton
          title="Edit Profile"
          onPress={() => navigation.goBack()}
        />
      </View>
      <LoadingComponent visible={loading} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView
          ref={scrollViewRef}
          enableOnAndroid
          extraScrollHeight={24}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View style={styles.content}>
            {/* Avatar Section */}
            <View style={styles.avatarSection}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Image
                    source={
                      newImage
                        ? { uri: newImage }
                        : userImage
                        ? { uri: userImage }
                        : require("../../../assets/images/LOGO.png")
                    }
                    style={styles.avatarImage}
                  />
                </View>
                <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
                  <MaterialIcons
                    name="photo-camera"
                    size={24}
                    color={PRIMARY_COLOR}
                  />
                </TouchableOpacity>
              </View>
              {/* Hiển thị full name dưới avatar */}
              <Text
                style={{
                  marginTop: 16,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#22223B",
                  textAlign: "center",
                }}
              >
                {displayFirstName} {displayLastName}
              </Text>
            </View>
            <View style={styles.formSection}>
              {/* First Name */}
              <View style={styles.inputWrapper}>
                <TextInput
                  ref={firstNameRef}
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="First Name"
                  placeholderTextColor="#A0A0A0"
                  onFocus={() => {
                    if (scrollViewRef.current) {
                      scrollViewRef.current.scrollToPosition(
                        0,
                        SCROLL_OFFSET,
                        true
                      );
                    }
                  }}
                />
              </View>
              {/* Last Name */}
              <View style={styles.inputWrapper}>
                <TextInput
                  ref={lastNameRef}
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Last Name"
                  placeholderTextColor="#A0A0A0"
                  onFocus={() => {
                    if (scrollViewRef.current) {
                      scrollViewRef.current.scrollToPosition(
                        0,
                        SCROLL_OFFSET,
                        true
                      );
                    }
                  }}
                />
              </View>
              {/* User Name */}
              <View style={styles.inputWrapper}>
                <TextInput
                  ref={userNameRef}
                  style={styles.input}
                  value={userName}
                  onChangeText={setUserName}
                  placeholder="User Name"
                  placeholderTextColor="#A0A0A0"
                  onFocus={() => {
                    if (scrollViewRef.current) {
                      scrollViewRef.current.scrollToPosition(
                        0,
                        SCROLL_OFFSET,
                        true
                      );
                    }
                  }}
                />
              </View>
              {/* Email (không cho sửa) */}
              <View style={styles.inputWrapper}>
                <TextInput
                  ref={emailRef}
                  style={styles.input}
                  value={email}
                  editable={false}
                  placeholder="Email"
                  placeholderTextColor="#A0A0A0"
                  onFocus={() => {
                    if (scrollViewRef.current) {
                      scrollViewRef.current.scrollToPosition(
                        0,
                        SCROLL_OFFSET,
                        true
                      );
                    }
                  }}
                />
              </View>
              {/* Biography */}
              <View style={styles.inputWrapper}>
                <TextInput
                  ref={biographyRef}
                  style={[styles.input, { height: 80 }]}
                  value={biography}
                  onChangeText={setBiography}
                  placeholder="Biography"
                  placeholderTextColor="#A0A0A0"
                  multiline
                  onFocus={() => {
                    if (scrollViewRef.current) {
                      scrollViewRef.current.scrollToPosition(
                        0,
                        SCROLL_OFFSET,
                        true
                      );
                    }
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ height: 200 }} />
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
      <View style={styles.updateButtonWrapper}>
        <ButtonNavigate1 buttonText="Update" onPress={handleUpdate} />
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
    borderColor: PRIMARY_COLOR,
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
    borderColor: PRIMARY_COLOR,
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
