import { Alert, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from '@react-native-picker/picker';
import ButtonNavigate from "../ButtonNavigate";
import * as ImagePicker from "expo-image-picker";
import ButtonNavigate1 from "../ButtonNavigate1";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";


export default function FillProfile() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [fullName, setFullName] = useState("");
    const [nickName, setNickName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [genderValue, setGenderValue] = useState("");

    const [date, setDate] = useState<Date | undefined>(undefined);
    const [showPicker, setShowPicker] = useState(false);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === "android") setShowPicker(false);
        if (selectedDate) setDate(selectedDate);
    };
    const pickImage = async () => {
        // Yêu cầu quyền
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Permission Denied", "You need to allow access to the media library to select an image.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };
    const handleFillProfile = () => {
        //logic implement here
        navigation.navigate('Home')
    }
    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                    {imageUri ? (
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.userImage}
                        />
                    ) : (
                        <Image
                            source={require("../../../assets/images/UserDefaultImage.png")}
                            style={styles.image}
                        />
                    )}
                    <View style={styles.editIcon}>
                        <FontAwesome5 name="edit" size={20} color="#fff" />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.formBox}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor="#505050"
                        onChangeText={setFullName}
                        value={fullName}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nick Name"
                        placeholderTextColor="#505050"
                        onChangeText={setNickName}
                        value={nickName}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => setShowPicker(true)}
                        style={styles.inputWrapper}
                        activeOpacity={0.8}
                    >
                        <EvilIcons name="calendar" size={24} color="#545454" style={styles.inputIcon} />
                        <Text style={[styles.input, { color: date ? "#202244" : "#505050" }]}>
                            {date ? date.toLocaleDateString() : "Date of Birth"}
                        </Text>
                    </TouchableOpacity>

                    {showPicker && (
                        <DateTimePicker
                            value={date || new Date()}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={handleDateChange}
                            maximumDate={new Date()}
                        />
                    )}
                </View>
                <View style={styles.inputWrapper}>
                    <Feather name="phone" size={18} color="#545454" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        placeholderTextColor="#505050"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9+()-]/g, ""))}//just allow numbers and symbols
                    />
                </View>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={genderValue}
                        onValueChange={(itemValue) => setGenderValue(itemValue)}
                        dropdownIconColor="#545454"
                    >
                        <Picker.Item label="Gender" value="" enabled={false} />
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                        <Picker.Item label="Other" value="other" />
                    </Picker>
                </View>
                <View style={{ marginVertical: 20 }}>
                    {/* <ButtonNavigate
                        nextScreenName="Login"
                        buttonText="Continue"
                    /> */}
                    <ButtonNavigate1
                        buttonText="Continue"
                        onPress={handleFillProfile}
                    ></ButtonNavigate1>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#F5F9FF",
        paddingHorizontal: 30,
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 20,
        backgroundColor: "#ddd",
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    image: {
        width: 60,
        height: 60,
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#fff",
        backgroundColor: "#ddd",
    },
    editIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        color: "#fff",
        backgroundColor: "#167F71",
        padding: 8,
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    formBox: {
        marginTop: 40,
        borderRadius: 16,
        padding: 0,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingHorizontal: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
        height: 60,
        position: "relative",
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#202244",
        fontWeight: "500",
        paddingVertical: 0,
        backgroundColor: "transparent",
    },
    pickerWrapper: {
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingHorizontal: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    }
});