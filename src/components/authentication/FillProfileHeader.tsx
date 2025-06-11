import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";
export default function FillProfileHeader() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                {/* this is temporary, may be replaced with a back button */}
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <AntDesign name="arrowleft" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Fill Your Profile</Text>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        padding: 10,
        backgroundColor: "#F5F9FF",
        height: 60,
    },
    headerText: {
        fontSize: 21,
        fontWeight: "600",
        color: "#202244",
        marginLeft: 10,
    }
})
