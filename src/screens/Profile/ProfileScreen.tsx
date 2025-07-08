import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Platform,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import BottomNav from "../courses/BottomNav";
import { getProfile } from "../../redux/services/profileService";
import GoBackButton from "../../components/GoBackButton";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";

// --- Định nghĩa màu sắc ---
const PRIMARY_COLOR = "#66C5B3";
const RED_COLOR = "#D9534F";
const AVATAR_SIZE = 110;

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showSecurityMenu, setShowSecurityMenu] = useState(false);

  // Thêm state cho profile, loading, error
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.showPasswordChangedToast) {
        Toast.show({
          type: "custom_with_image",
          text1: "Password changed!",
          text2: "Your password has been updated successfully.",
          props: {
            status: "success",
            imageUrl: require("../../../assets/images/LOGO.png"),
          },
          visibilityTime: 1500,
        });
        route.params.showPasswordChangedToast = false;
      }
      const fetchProfile = async () => {
        try {
          setLoading(true);
          setError(null);
          const res = await getProfile();
          if (res.success) {
            setProfile(res.data);
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
    }, [route.params])
  );

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

  // --- Menu items theo ảnh gần nhất ---
  const menuItems = [
    {
      icon: <Icon name="person-outline" size={24} color="#333" />,
      text: "Edit Profile",
      onPress: () => navigation.navigate("EditProfileScreen" as never),
    },
    // {
    //   icon: <Icon name="card-outline" size={24} color="#333" />,
    //   text: "Payment Option",
    //   onPress: () => {},
    // },
    {
      icon: <Icon name="shield-checkmark-outline" size={24} color="#333" />,
      text: "Security",
      onPress: () => setShowSecurityMenu(!showSecurityMenu),
    },
    {
      icon: <MaterialCommunityIcons name="logout" size={24} color="#333" />,
      text: "Log out",
      onPress: () => navigation.navigate("Login" as never),
    },
  ];

  // --- Security submenu items ---
  const securityItems = [
    {
      icon: <Icon name="key-outline" size={24} color="#333" />,
      text: "Change Password",
      onPress: () => navigation.navigate("EditPasswordScreen" as never),
    },
  ];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ paddingTop: Platform.OS === "android" ? 24 : 0 }}>
          <GoBackButton title="Profile" onPress={() => navigation.goBack()} />
        </View>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={styles.container.backgroundColor}
        />
        {/* --- Header --- */}

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.contentContainer}>
            {/* --- Card được render TRƯỚC --- */}
            <View style={styles.card}>
              <View style={styles.profileSection}>
                {loading ? (
                  <Text>Loading...</Text>
                ) : error ? (
                  <Text style={{ color: "red" }}>{error}</Text>
                ) : (
                  <>
                    <Text style={styles.userName}>
                      {profile?.firstName || ""} {profile?.lastName || ""}
                    </Text>
                    <Text style={styles.userEmail}>{profile?.email || ""}</Text>
                  </>
                )}
              </View>
              <View style={styles.menuSection}>
                {menuItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={item.onPress}
                    >
                      <View style={styles.menuItemContent}>
                        {item.icon}
                        <Text style={styles.menuText}>{item.text}</Text>
                      </View>
                      <View style={styles.menuItemContent}>
                        {item.text === "Security" ? (
                          <Icon
                            name={
                              showSecurityMenu
                                ? "chevron-down"
                                : "chevron-forward"
                            }
                            size={22}
                            color="#BDBDBD"
                          />
                        ) : (
                          <Icon
                            name="chevron-forward"
                            size={22}
                            color="#BDBDBD"
                          />
                        )}
                      </View>
                    </TouchableOpacity>

                    {/* Security submenu */}
                    {item.text === "Security" && showSecurityMenu && (
                      <View style={styles.submenuSection}>
                        {securityItems.map((subItem, subIndex) => (
                          <TouchableOpacity
                            key={subIndex}
                            style={styles.submenuItem}
                            onPress={subItem.onPress}
                          >
                            <View style={styles.menuItemContent}>
                              {subItem.icon}
                              <Text style={styles.submenuText}>
                                {subItem.text}
                              </Text>
                            </View>
                            <View style={styles.menuItemContent}>
                              <Icon
                                name="chevron-forward"
                                size={22}
                                color="#BDBDBD"
                              />
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </React.Fragment>
                ))}
              </View>
            </View>

            {/* --- Avatar được render SAU để nổi lên trên --- */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Image
                  source={
                    profile?.userImage
                      ? { uri: profile.userImage }
                      : require("../../../assets/images/LOGO.png")
                  }
                  style={styles.avatarImage}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomNav />
    </>
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
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  contentContainer: {
    position: "relative",
    marginTop: AVATAR_SIZE / 2 + 50,
  },
  avatarContainer: {
    position: "absolute",
    top: -(AVATAR_SIZE / 2),
    alignSelf: "center",
    zIndex: 10,
    elevation: 10,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: "#E9E9E9",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: AVATAR_SIZE / 2,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: "100%",
  },
  profileSection: {
    alignItems: "center",
    paddingTop: AVATAR_SIZE / 2 + 15,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
  },
  menuSection: {
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    paddingBottom: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "500",
  },
  menuValue: {
    fontSize: 16,
    color: "#007AFF",
    marginRight: 8,
    fontWeight: "500",
  },
  submenuSection: {
    backgroundColor: "#F8F9FA",
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
  },
  submenuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  submenuText: {
    marginLeft: 20,
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
  },
});

export default ProfileScreen;
