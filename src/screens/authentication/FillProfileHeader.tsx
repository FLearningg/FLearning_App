import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";
import GoBackButton from "../../components/GoBackButton";
export default function FillProfileHeader() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <GoBackButton
                    title="Fill Your Profile"
                    onPress={() => navigation.navigate("SignUp")}
                    backgroundColor={styles.headerContainer.backgroundColor}
                />
                <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 20 }}>
                    <FontAwesome name="search" size={24} color="#000" />
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5F9FF",
    },
})
