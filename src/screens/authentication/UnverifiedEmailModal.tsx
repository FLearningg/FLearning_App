import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface UnverifiedEmailModalProps {
    visible: boolean;
    countdown: number;
    isResendCooldown: boolean;
    onResend: () => void;
    onClose: () => void;
}

const UnverifiedEmailModal: React.FC<UnverifiedEmailModalProps> = ({
    visible,
    countdown,
    isResendCooldown,
    onResend,
    onClose,
}) => (
    <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
    >
        <View style={styles.overlay}>
            <View style={styles.modalContent}>
                <Text style={styles.heading}>Tài khoản chưa được xác thực</Text>
                <Text style={styles.message}>
                    Vui lòng kiểm tra email hoặc nhấn vào&nbsp;
                    <Text
                        style={styles.resendLink}
                        onPress={!isResendCooldown ? onResend : undefined}
                    >
                        {isResendCooldown ? `Gửi lại sau (${countdown}s)` : 'Gửi lại link'}
                    </Text>
                    &nbsp;để xác thực.
                </Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        width: '85%',
        alignItems: 'center',
        elevation: 5
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#d97706',
        marginBottom: 8
    },
    message: {
        fontSize: 15,
        color: '#333',
        marginBottom: 16,
        textAlign: 'center'
    },
    resendLink: {
        color: '#0961F5',
        fontWeight: 'bold'
    },
    closeButton: {
        marginTop: 8,
        backgroundColor: '#0961F5',
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
});

export default UnverifiedEmailModal;