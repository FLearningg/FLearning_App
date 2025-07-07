import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign, Feather, FontAwesome, Fontisto } from "@expo/vector-icons";
import { useState } from "react";
import ButtonNavigate from "../../components/ButtonNavigate";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";
import ButtonNavigate1 from "../../components/ButtonNavigate1";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secureText, setSecureText] = useState(true);
    const [checked, setChecked] = useState(false);
    const togglePassword = () => setSecureText(!secureText);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const handleSignUp = () => {
        //logic implement here
        navigation.navigate('FillProfile');
    }
    const resetNavigation = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }
    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Image source={require("../../../assets/images/LogoContentBlue.png")} />
            </View>
            <View style={styles.grettingTextContainer}>
                <Text style={styles.grettingText}>Getting Started.!</Text>
                <Text style={styles.subText}>Create an Account to Continue your allCourses</Text>
            </View>
            <View style={styles.formBox}>
                <View style={styles.inputWrapper}>
                    <Fontisto name="email" size={24} color="#545454" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#505050"
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <AntDesign name="lock" size={24} color="#545454" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#505050"
                        secureTextEntry={secureText}
                    />
                    <Feather
                        name={secureText ? "eye" : "eye-off"}
                        size={24}
                        color="#545454"
                        style={styles.eyeIcon}
                        onPress={togglePassword}
                    />
                </View>
                <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => setChecked(!checked)}
                    activeOpacity={0.8}
                >
                    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                        {checked && <FontAwesome name="check-circle" size={18} color="#fff" />}
                    </View>
                    <Text style={styles.checkboxLabel}>Agree to Terms & Conditions</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
                <ButtonNavigate1
                    onPress={handleSignUp}
                    buttonText="Sign Up"
                ></ButtonNavigate1>
                <Text style={styles.orContinueText}>Or Continue With</Text>
                {/* <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 20 }}>
                    <TouchableOpacity>
                        <View style={styles.googleSignInContainer}>
                            <View style={styles.googleSignInButton}>
                                <Image source={require("../../../assets/images/GoogleIcon.png")} style={{ width: 20, height: 20 }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.googleSignInContainer, { marginLeft: 35 }]}>
                        <View style={styles.googleSignInButton}>
                            <Image source={require("../../../assets/images/AppleIcon.png")} style={{ width: 20, height: 20 }} />
                        </View>
                    </TouchableOpacity>
                </View> */}
                <View style={{ flexDirection: "row", width: 213, justifyContent: "space-between", marginTop: 30 }}>
                    <Text>Already have an Account?</Text>
                    <Text style={styles.signInText} onPress={() => resetNavigation()}>SIGN IN</Text>
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
    grettingTextContainer: {
        marginTop: 70,
        alignSelf: "flex-start",
    },
    grettingText: {
        fontSize: 24,
        fontWeight: "600",
        color: "#202244",
    },
    subText: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: "400",
        color: "#545454"
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
        height: 56,
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
    eyeIcon: {
        position: "absolute",
        right: 16,
        top: 16,
    },


    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#545454",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    checkboxChecked: {
        backgroundColor: "#50B748",
        borderColor: "#50B748",
    },
    checkboxLabel: {
        fontSize: 16,
        color: "#545454",
        fontWeight: "500",
    },
    orContinueText: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: "500",
        color: "#545454",
        textAlign: "center",
    },
    googleSignInContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: 20,
    },
    googleSignInButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderRadius: 25,
        backgroundColor: "#FFFFFF",
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    signInText: {
        color: "#0961F5",
        fontWeight: "700",
        borderBottomWidth: 2,
        borderBottomColor: "#0961F5",
    },
});