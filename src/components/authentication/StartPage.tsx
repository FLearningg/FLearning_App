import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ButtonNavigate from "../ButtonNavigate";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";
import ButtonNavigate1 from "../ButtonNavigate1";

export default function StartPage() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const handleNavigate = () => {
        //logic implement here
        navigation.navigate("Login");
    }
    return (
        <View style={styles.container}>
            {/* <Image source={require("../../../assets/images/LOGO.png")} style={{ width: 90, height: 90 }} /> */}
            <View style={styles.iconContainer}>
                <Image source={require("../../../assets/images/LOGO.png")} style={{ width: 90, height: 90 }} />
            </View>
            <View style={{ marginTop: 25 }}>
                <Text style={styles.headerText}>Let's you in</Text>
            </View>
            {/* <TouchableOpacity style={styles.googleSignInContainer}>
                <View style={styles.googleSignInButton}>
                    <Image source={require("../../../assets/images/GoogleIcon.png")} style={{ width: 20, height: 20 }} />
                </View>
                <Text style={styles.googleSignInText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.googleSignInContainer}>
                <View style={styles.googleSignInButton}>
                    <Image source={require("../../../assets/images/AppleIcon.png")} style={{ width: 20, height: 20 }} />
                </View>
                <Text style={styles.googleSignInText}>Continue with Apple</Text>
            </TouchableOpacity> */}

            {/* <Text style={styles.orText}> ( Or )</Text> */}
            <View style={{ marginVertical: 30, marginTop: 300 }}>
                <ButtonNavigate1
                    buttonText="Sign In with Your Account"
                    onPress={handleNavigate}
                />
            </View>
            <View style={{ flexDirection: "row", width: 200, justifyContent: "space-between" }}>
                <Text>Don’t have an Account?</Text>
                <Text style={styles.signUpText} onPress={() => navigation.navigate("SignUp")}>SIGN UP</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F9FF"
    },
    headerText: {
        fontSize: 24,
        fontWeight: "600",
        color: "black",
    },
    googleSignInContainer: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 190,
        marginRight: 20,
    },
    googleSignInButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 20,
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
    googleSignInText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#545454",
        marginLeft: 10,
    },
    orText: {
        marginTop: 65,
        fontSize: 16,
        fontWeight: "800",
        color: "#545454",
    },
    signUpText: {
        color: "#0961F5",
        fontWeight: "700",
        borderBottomWidth: 2,
        borderBottomColor: "#0961F5",
    },
    iconContainer: {
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        padding: 10,
    },
});