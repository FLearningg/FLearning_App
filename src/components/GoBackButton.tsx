import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
interface GoBackButtonProps {
    title: string;
    onPress?: () => void;
    backgroundColor?: string;
}
export default function GoBackButton({ title, onPress, backgroundColor }: GoBackButtonProps) {
    return (
        <>
            <View style={[styles.headerContainer, {backgroundColor: backgroundColor || '#F5F9FF'}]}>
                <TouchableOpacity onPress={onPress}>
                    <AntDesign name="arrowleft" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        padding: 10,
        height: 60,
        justifyContent: "flex-start",
    },
    headerText: {
        fontSize: 21,
        fontWeight: "600",
        color: "#202244",
        marginLeft: 10,
    }
})
