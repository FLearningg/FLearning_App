import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Dimensions, // Import Dimensions for screen-aware styling
} from "react-native";
import { X } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import apiClient from "../../redux/services/authService"; // Adjust the import path as necessary
import { saveTransactionToDB } from "../../redux/services/paymentService";
import { enrollInCourses } from "../../redux/services/courseService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";

// --- Constants ---

const MY_BANK = {
  BANK_ID: process.env.EXPO_PUBLIC_MY_BANK_ID,
  ACCOUNT_NO: process.env.EXPO_PUBLIC_MY_BANK_ACCOUNT_NO,
};
const POLLING_INTERVAL = 3000; // 3 seconds

// --- Helper Function ---
const generateRandomSuffix = () => {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// --- Component Props ---
type PaymentModalProps = {
  isVisible: boolean;
  onClose: () => void;
  course: { _id: string; price: number } | null;
  userId: string;
};

// --- Main Component ---
const PaymentModal: React.FC<PaymentModalProps> = ({
  isVisible,
  onClose,
  course,
  userId,
}) => {
  const [isPolling, setIsPolling] = useState(false);
  const navigation = useNavigation();
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const navigationStack = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // --- Memoized Values for Payment ---
  // const expectedAmount = "23000";
  // const paymentContent = "MBVCB.10274451961.457131.COURSEQ7XJ0B6857d110f8e1891ea2238561.CT tu 9836040204 PHAN LE THANH HOANG toi 0828006916 TRUONG NGUYEN TIEN DAT tai";
  const expectedAmount = React.useMemo(
    () => (course ? Math.round(course.price * 25000) : 0),
    [course]
  );
  const [randomSuffix] = useState(generateRandomSuffix);
  const paymentContent = React.useMemo(
    () => (course ? `COURSE${course._id}_${userId}` : ""),
    [course, userId] // randomSuffix is constant and not needed here
  );
  const qrCodeUrl = React.useMemo(
    () =>
      course
        ? `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO}-compact2.png?amount=${expectedAmount}&addInfo=${paymentContent}`
        : "",
    [expectedAmount, paymentContent, course]
  );

  // --- Post-Payment Logic ---
  const afterSuccessfulPayment = useCallback(() => {
    if (!course) {
      console.error("afterSuccessfulPayment called without a course.");
      return;
    }

    // GIẢI PHÁP TẠM THỜI: Tạo một chuỗi ngẫu nhiên 24 ký tự hexa hợp lệ
    // để server có thể chuyển đổi thành ObjectId mà không bị lỗi.
    const generateObjectIdString = () => {
      const chars = "0123456789abcdef";
      let result = "";
      for (let i = 0; i < 24; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    // 1. Define transaction data
    const transactionData = {
      "Ngày diễn ra": new Date().toISOString(),
      // THAY ĐỔI: Sử dụng chuỗi ObjectId ngẫu nhiên cho "Mã GD"
      // để khắc phục tạm thời lỗi phía server.
      "Mã GD": generateObjectIdString(),
      "Giá trị": expectedAmount,
      "Mô tả": paymentContent,
    };
    const userIdentifier = { _id: userId };
    const courseArray = [course]; 

    // 2. Save transaction, then enroll in the course
    saveTransactionToDB(transactionData, userIdentifier, courseArray)
      .then((response) => {
        console.log("Transaction saved successfully:", response);
        // 3. Chain the enrollment call with CORRECT arguments
        return enrollInCourses(userId, [course._id]);
      })
      .then(() => {
        console.log("Successfully enrolled in course:", course._id);
      })
      .catch((error) => {
        // Enhanced error logging for debugging the server-side issue
        console.error("Error during post-payment process:", error);
        console.error(
          "Data sent to server that may have caused the error:",
          transactionData
        );

        let alertMessage =
          "Your payment was successful, but there was an issue finalizing your enrollment. Please contact support.";

        // Axios wraps the response error in `error.response`. Log it for more details.
        if (error.response) {
          console.error("Server Error Response Data:", error.response.data);
        }

        Alert.alert("Post-Payment Error", alertMessage);
      });
  }, [course, userId, randomSuffix, expectedAmount, paymentContent]);

  // --- Polling Logic ---
  const stopPolling = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setIsPolling(false);
  }, []);

  useEffect(() => {
    if (isVisible && course) {
      setIsPolling(true);

      const checkPaymentStatus = async () => {
        try {
          const response = await apiClient.get("/payment/transactions");
          const recentTransactions = response.data;
          const transactions = recentTransactions.data || [];
          const matchedTx = transactions.find((tx: any) => {
            const amountInTx = Number(tx["Giá trị"]);
            const descInTx = (tx["Mô tả"] || "").toLowerCase();
            return (
              amountInTx >= expectedAmount &&
              descInTx.includes(paymentContent.toLowerCase())
            );
          });

          if (matchedTx) {
            stopPolling();
            onClose();
            afterSuccessfulPayment();
            Alert.alert(
              "Payment Successful!",
              "You have been enrolled in the course.",
              [
                {
                  text: "Watch my recipe",
                  onPress: () => navigationStack.navigate("ERecipe", {
                  }),
                },
              ],
              { cancelable: false }
            );
          }
        } catch (err) {
          console.error("Error checking payment status:", err);
          // Don't stop polling on network errors, it might recover
        }
      };

      // Initial check, then set interval
      checkPaymentStatus();
      intervalIdRef.current = setInterval(checkPaymentStatus, POLLING_INTERVAL);
    }

    // Cleanup function
    return () => {
      stopPolling();
    };
  }, [
    isVisible,
    course,
    paymentContent,
    expectedAmount,
    navigation,
    stopPolling,
    onClose,
    afterSuccessfulPayment, // Added afterSuccessfulPayment to dependency array
  ]);

  // --- Event Handlers ---
  const handleClose = useCallback(() => {
    stopPolling();
    onClose();
  }, [stopPolling, onClose]);

  // --- Render ---
  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Complete Your Payment</Text>
            <TouchableOpacity onPress={handleClose}>
              <X size={24} color="#555" />
            </TouchableOpacity>
          </View>

          {course ? (
            <>
              <Text style={styles.instructions}>
                Scan the QR code with your banking app
              </Text>

              <View style={styles.qrContainer}>
                <Image
                  source={{ uri: qrCodeUrl }}
                  style={styles.qrCode}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  Transfer Content:{" "}
                  <Text style={styles.highlight}>{paymentContent}</Text>
                </Text>
                <Text style={styles.infoText}>
                  Amount:{" "}
                  <Text style={styles.highlight}>
                    {expectedAmount.toLocaleString("vi-VN")} VND
                  </Text>
                </Text>
              </View>

              {isPolling && (
                <View style={styles.pollingContainer}>
                  <ActivityIndicator size="small" color="#0961f5" />
                  <Text style={styles.pollingText}>
                    Waiting for payment confirmation...
                  </Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0961f5" />
              <Text style={styles.loadingText}>Loading payment details...</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  // Main modal container styles
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker overlay for better focus
  },
  modalView: {
    width: "90%",
    maxWidth: 400, // Max width for larger screens like tablets
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  // Header section
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600", // Semibold
    color: "#333",
  },
  // Content styles
  instructions: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 15,
  },
  qrContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  qrCode: {
    width: 220,
    height: 220,
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
    textAlign: "center",
  },
  highlight: {
    fontWeight: "bold",
    color: "#0961f5",
  },
  // Polling/Loading indicator styles
  pollingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  pollingText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#0961f5",
    fontStyle: "italic",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});

export default PaymentModal;
