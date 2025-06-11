import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../types/NavigationType";
import { AntDesign } from "@expo/vector-icons";
type ScreenName = keyof RootStackParamList;

interface ButtonProps {
    nextScreenName: ScreenName;//This is the name of the screen to navigate to (Note: have to declare the screen name in RootStackParamList)
    buttonText: string;//This is the text to display on the button
}

export default function ButtonNavigate(props: ButtonProps) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(props.nextScreenName)}>
                <Text style={styles.buttonText}>{props.buttonText}</Text>
                <AntDesign style={styles.buttonIcon} name="arrowright" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    button: {
        padding: 7,
        backgroundColor: "#0961F5",
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: 300,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
        flex: 1,
        fontSize: 18,
    },
    buttonIcon: {
        backgroundColor: "#fff",
        color:'#0961F5',
        padding: 10,
        borderRadius: 25,
    },
});