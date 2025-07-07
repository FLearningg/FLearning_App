import React from "react"
import { Modal, View, ActivityIndicator, Text, StyleSheet } from "react-native"

interface LoadingOverlayProps {
    visible: boolean
}

export default function LoadingComponent({ visible }: LoadingOverlayProps) {
    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.overlayContent}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.overlayText}>Please wait...</Text>
                    <Text style={styles.overlaySubtext}>Processing your request</Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    overlayContent: {
        backgroundColor: "#FFFFFF",
        padding: 30,
        borderRadius: 15,
        alignItems: "center",
        minWidth: 200,
    },
    overlayText: {
        marginTop: 15,
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    overlaySubtext: {
        marginTop: 5,
        fontSize: 14,
        color: "#666",
        textAlign: "center",
    },
})
