import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign, Feather, Fontisto } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";
import ButtonNavigate1 from "../../components/ButtonNavigate1";
import Toast from "react-native-toast-message";
import LoadingComponent from "../../components/Loading/LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { resendVerificationLink } from "../../redux/services/authService";
import { loginUser } from "../../redux/store/authSlice";
import UnverifiedEmailModal from "./UnverifiedEmailModal";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secureText, setSecureText] = useState(true);
    const [checked, setChecked] = useState(false);
    const togglePassword = () => setSecureText(!secureText);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { isLoading, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);

    // --- State mới để quản lý tất cả các thông báo API ---
    const [apiAlert, setApiAlert] = useState({ show: false, type: '', message: '' });

    // State cho countdown
    const [countdown, setCountdown] = useState(0);
    const [isResendCooldown, setIsResendCooldown] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (isResendCooldown && countdown > 0) {
            timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
        } else if (countdown === 0) {
            setIsResendCooldown(false);
        }
        return () => clearInterval(timer);
    }, [isResendCooldown, countdown]);

    const handleResendLink = async () => {
        if (isResendCooldown || !unverifiedEmail) return;
        setIsResendCooldown(true); // Vô hiệu hóa nút ngay lập tức
        try {
            const response = await resendVerificationLink(unverifiedEmail);
            // Hiển thị thông báo thành công bằng Bootstrap Alert
            Toast.show({
                type: 'custom_with_image',
                text1: 'Resend Link Successful',
                text2: '' + response.data.message,
                props: {
                    imageUrl: require('../../../assets/images/LOGO.png'),
                    status: 'success',
                },
                position: 'top',
                visibilityTime: 3000,
            });
            setApiAlert({ show: true, type: 'success', message: response.data.message });
            setCountdown(60);
        } catch (error: any) {
            Toast.show({
                type: 'custom_with_image',
                text1: 'Resend Link Failed',
                text2: '' + error.response?.data?.message || 'Gửi lại link thất bại.',
                props: {
                    imageUrl: require('../../../assets/images/LOGO.png'),
                    status: 'error',
                },
                position: 'top',
                visibilityTime: 3000,
            });
            setApiAlert({ show: true, type: 'danger', message: error.response?.data?.message || 'Gửi lại link thất bại.' });
            setIsResendCooldown(false); // Bật lại nút nếu có lỗi
        }
    };
    const handleSignIn = () => {
        setUnverifiedEmail(null);
        setApiAlert({ show: false, type: '', message: '' }); // Ẩn thông báo cũ khi submit
        const credentials = { email: email, password: password, remember: checked };
        dispatch(loginUser(credentials))
            .unwrap()
            .then(() => {
                // Có thể hiển thị thông báo thành công ở trang chủ nếu muốn
                Toast.show({
                    type: 'custom_with_image',
                    text1: 'Login Successful',
                    text2: 'Welcome back!',
                    props: {
                        imageUrl: require('../../../assets/images/LOGO.png'),
                        status: 'success',
                    },
                    position: 'top',
                    visibilityTime: 3000,
                });
                navigation.navigate('MainTabs') //pass parameter here
            })
            .catch((error) => {
                if (error.errorCode === 'ACCOUNT_NOT_VERIFIED') {
                    Toast.show({
                        type: 'custom_with_image',
                        text1: 'Login Failed',
                        text2: 'Account not verified.',
                        props: {
                            imageUrl: require('../../../assets/images/LOGO.png'),
                            status: 'error',
                        },
                        position: 'top',
                        visibilityTime: 3000,
                    });
                    setUnverifiedEmail(email);
                } else if (error.errorCode === 'ACCOUNT_BANNED') {
                    Toast.show({
                        type: 'custom_with_image',
                        text1: 'Login Failed',
                        text2: 'Your account has been banned. Please contact support.',
                        props: {
                            imageUrl: require('../../../assets/images/LOGO.png'),
                            status: 'error',
                        },
                        position: 'top',
                        visibilityTime: 3000,
                    });
                    setApiAlert({ show: true, type: 'danger', message: 'Your account has been banned.' });
                } else if (email === '' || password === '') {
                    Toast.show({
                        type: 'custom_with_image',
                        text1: 'Login Failed',
                        text2: 'Email and password cannot be empty.',
                        props: {
                            imageUrl: require('../../../assets/images/LOGO.png'),
                            status: 'error',
                        },
                        position: 'top',
                        visibilityTime: 3000,
                    });
                    setApiAlert({ show: true, type: 'danger', message: 'Email and password cannot be empty.' });
                } else {
                    Toast.show({
                        type: 'custom_with_image',
                        text1: 'Login failed',
                        text2: 'Email or password is incorrect.',
                        props: {
                            imageUrl: require('../../../assets/images/LOGO.png'),
                            status: 'error',
                        },
                        position: 'top',
                        visibilityTime: 3000,
                    });
                    setApiAlert({ show: true, type: 'danger', message: error.message || 'Email or password is incorrect.' });
                }
            });
    }
    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Image source={require("../../../assets/images/LogoContentBlue.png")} />
            </View>
            <View style={styles.grettingTextContainer}>
                <Text style={styles.grettingText}>Let’s Sign In.!</Text>
                <Text style={styles.subText}>Login to Your Account to Continue your Courses</Text>
            </View>
            <View style={styles.formBox}>
                <View style={styles.inputWrapper}>
                    <Fontisto name="email" size={24} color="#545454" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#505050"
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <AntDesign name="lock" size={24} color="#545454" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#505050"
                        secureTextEntry={secureText}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Feather
                        name={secureText ? "eye" : "eye-off"}
                        size={24}
                        color="#545454"
                        style={styles.eyeIcon}
                        onPress={togglePassword}
                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 15 }}>
                    <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => setChecked(!checked)}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                            {checked && <Feather name="check" size={18} color="#fff" />}
                        </View>
                        <Text style={styles.checkboxLabel}>Remember Me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                        <Text style={{ color: "#545454", fontWeight: "500" }}>Forgot Password?</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
                {/* <ButtonNavigate
                    nextScreenName="Home"
                    buttonText="Sign In"
                /> */}
                <ButtonNavigate1
                    buttonText="Sign In"
                    onPress={handleSignIn}
                />
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
                <View style={{ flexDirection: "row", width: 200, justifyContent: "space-between", marginTop: 30 }}>
                    <Text>Don’t have an Account?</Text>
                    <Text style={styles.signInText} onPress={() => navigation.navigate("SignUp")}>SIGN UP</Text>
                </View>
            </View>
            <LoadingComponent visible={isLoading} />
            <UnverifiedEmailModal
                visible={!!unverifiedEmail}
                countdown={countdown}
                isResendCooldown={isResendCooldown}
                onResend={handleResendLink}
                onClose={() => setUnverifiedEmail(null)}
            />
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
    eyeIcon: {
        position: "absolute",
        right: 16,
        top: 16,
    },


    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        // marginTop: 10,
        // marginBottom: 20,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: "#50B748",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
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