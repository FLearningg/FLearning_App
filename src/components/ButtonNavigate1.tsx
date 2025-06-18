import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface ButtonProps {
    onPress: () => void;//implement event
    buttonText: string;//This is the text to display on the button
    disabled?: boolean;//optional
}

const ButtonNavigate1: React.FC<ButtonProps> = ({
    onPress,
    buttonText,
    disabled,
}) => {
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
                <Text style={styles.buttonText}>{buttonText}</Text>
                <AntDesign style={styles.buttonIcon} name="arrowright" size={24} color="white" />
            </TouchableOpacity>
        </View >
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
        color: '#0961F5',
        padding: 10,
        borderRadius: 25,
    },
});
export default ButtonNavigate1;
