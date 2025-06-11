import { useEffect } from "react"
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/NavigationType" // điều chỉnh đường dẫn cho đúng

type LaunchingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Launching">
export default function Launching() {
    const navigation = useNavigation<LaunchingScreenNavigationProp>()

      useEffect(() => {
        const timer = setTimeout(() => {
          navigation.navigate("Start")
        }, 2000)

        return () => clearTimeout(timer)
      }, [navigation])

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/images/SHAPE.png")}
                style={{ width: 350 , height: 350}}
                resizeMode="cover">
                <View style={styles.logoContainer}>
                    <View style={styles.iconContainer}>
                        <Image source={require("../../assets/images/LOGO.png")} style={{ width: 90, height: 90 }} />
                    </View>
                    <Text style={styles.title}>FLearning</Text>
                    <Text style={styles.subtitle}>Learn from home</Text>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0961F5",
        justifyContent: "center",
        alignItems: "center",
    },
    logoContainer: {
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#FFEEE8",
        padding: 90,
        width: 350,
        height: 350,
        borderRadius: 350,
    },
    iconContainer: {
        backgroundColor: "#FFEEE8",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        padding: 10,
    },
    iconText: {
        fontSize: 40,
        color: "#FFFFFF",
    },
    title: {
        fontFamily: "Aubrey",
        fontSize: 28,
        color: "#332DA1",
        marginBottom: 8,
        textTransform: "uppercase",
        fontWeight: '400'
    },
    subtitle: {
        fontSize: 15,
        color: "#FFF",
        textTransform: "uppercase",
        fontWeight: '600'
    },
})
