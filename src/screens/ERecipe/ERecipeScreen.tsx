import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  Alert,
  ActivityIndicator,
  ScrollView,
  Share,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";
import { getPurchaseHistory, PurchaseHistoryItem } from "../../redux/services/profileService";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as Clipboard from 'expo-clipboard';

interface EReceiptScreenParams {
  transactionId?: string;
  purchaseData?: PurchaseHistoryItem;
}

const EReceiptScreen = () => {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [receiptData, setReceiptData] = useState<PurchaseHistoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const params = route.params as EReceiptScreenParams;
  // Generate HTML content for PDF/Print
  const generateReceiptHTML = () => {
    if (!receiptData) return '';
    
    const { date, time } = formatDate(receiptData.paymentDate);
    
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>E-Receipt</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .receipt-container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 2px solid #60A5FA;
                padding-bottom: 20px;
            }
            .header h1 {
                color: #60A5FA;
                margin: 0;
                font-size: 28px;
            }
            .header p {
                color: #666;
                margin: 5px 0;
            }
            .detail-section {
                margin: 20px 0;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;
                border-bottom: 1px solid #eee;
            }
            .detail-row:last-child {
                border-bottom: none;
            }
            .label {
                font-weight: bold;
                color: #333;
            }
            .value {
                color: #666;
                text-align: right;
            }
            .status {
                background-color: #10B981;
                color: white;
                padding: 5px 15px;
                border-radius: 15px;
                font-size: 12px;
                text-transform: uppercase;
            }
            .total-section {
                background-color: #f8f9ff;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
            }
            .total-row {
                display: flex;
                justify-content: space-between;
                font-size: 18px;
                font-weight: bold;
                color: #333;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #666;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="receipt-container">
            <div class="header">
                <h1>E-Receipt</h1>
                <p>Transaction Receipt</p>
                <p>Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="detail-section">
                <div class="detail-row">
                    <span class="label">Course:</span>
                    <span class="value">${receiptData.course?.title || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Category:</span>
                    <span class="value">${receiptData.course?.category || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Level:</span>
                    <span class="value">${receiptData.course?.level || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Duration:</span>
                    <span class="value">${receiptData.course?.duration || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Transaction ID:</span>
                    <span class="value">${receiptData.transaction.gatewayTransactionId}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Payment ID:</span>
                    <span class="value">${receiptData.paymentId}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Payment Method:</span>
                    <span class="value">${receiptData.paymentMethod || 'Bank Transfer'}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Date & Time:</span>
                    <span class="value">${date} at ${time}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Status:</span>
                    <span class="status">${receiptData.status}</span>
                </div>
            </div>
            
            <div class="total-section">
                <div class="total-row">
                    <span>Total Amount:</span>
                    <span>${formatPrice(receiptData.amount, receiptData.currency)}</span>
                </div>
            </div>
            
            <div class="footer">
                <p>Thank you for your purchase!</p>
                <p>This is an electronically generated receipt.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  };

  useEffect(() => {
    loadReceiptData();
  }, []);

  const loadReceiptData = async () => {
    try {
      setLoading(true);
      setError(null);

      // If purchase data is passed directly, use it
      if (params?.purchaseData) {
        setReceiptData(params.purchaseData);
        setLoading(false);
        return;
      }

      // Otherwise, fetch from API
      const response = await getPurchaseHistory(1, 1);
      
      if (response.data.success && response.data.data.length > 0) {
        // If transactionId is provided, find specific transaction
        if (params?.transactionId) {
          const specificTransaction = response.data.data.find(
            (item: PurchaseHistoryItem) => item.paymentId === params.transactionId || 
                   item.transaction.gatewayTransactionId === params.transactionId
          );
          setReceiptData(specificTransaction || response.data.data[0]);
        } else {
          // Use the most recent transaction
          setReceiptData(response.data.data[0]);
        }
      } else {
        setError("No purchase history found");
      }
    } catch (err: any) {
      console.error("Error loading receipt data:", err);
      setError(err.response?.data?.message || "Failed to load receipt data");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    };
  };

  const formatPrice = (amount: number, currency: string) => {
    if (currency === 'VND') {
      return `${amount.toLocaleString('vi-VN')}đ`;
    }
    return `$${amount.toFixed(2)}`;
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // 1. Share functionality - Chia sẻ receipt qua các app khác
  const handleShare = async () => {
    setShowActionMenu(false);
    
    try {
      if (!receiptData) {
        Alert.alert("Error", "No receipt data to share");
        return;
      }

      const { date, time } = formatDate(receiptData.paymentDate);
      
      const shareMessage = `
🧾 E-Receipt 
      
Course: ${receiptData.course?.title || 'N/A'}
Amount: ${formatPrice(receiptData.amount, receiptData.currency)}
Transaction: ${receiptData.transaction.gatewayTransactionId}
Date: ${date} ${time}
Status: ${receiptData.status}

Thank you for your purchase! 🎓
      `.trim();

      const shareOptions = {
        message: shareMessage,
        title: 'E-Receipt - Course Purchase',
      };

      // Use React Native's built-in Share API
      const result = await Share.share(shareOptions);
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared via:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      }
    } catch (error) {
      console.error('Error sharing receipt:', error);
      Alert.alert("Error", "Failed to share receipt. Please try again.");
    }
  };

  // 2. Download functionality - Tải receipt dưới dạng PDF
  const handleDownload = async () => {
    setShowActionMenu(false);
    
    try {
      if (!receiptData) {
        Alert.alert("Error", "No receipt data to download");
        return;
      }

      // Show loading
      Alert.alert("Processing", "Generating PDF...");

      // Generate HTML content
      const htmlContent = generateReceiptHTML();
      
      // Create PDF from HTML
      const { uri } = await Print.printToFileAsync({ 
        html: htmlContent,
        base64: false 
      });
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `Receipt_${receiptData.transaction.gatewayTransactionId}_${timestamp}.pdf`;
      
      // Move to documents directory
      const documentsDir = FileSystem.documentDirectory;
      const newUri = `${documentsDir}${filename}`;
      
      await FileSystem.moveAsync({
        from: uri,
        to: newUri
      });

      // Show success message with option to share
      Alert.alert(
        "Download Complete", 
        `Receipt saved as: ${filename}`,
        [
          {
            text: "OK",
            style: "default"
          },
          {
            text: "Share PDF",
            style: "default",
            onPress: async () => {
              if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(newUri);
              }
            }
          }
        ]
      );

    } catch (error) {
      console.error('Error downloading receipt:', error);
      Alert.alert("Error", "Failed to download receipt. Please try again.");
    }
  };

  // 3. Print functionality - In receipt
  const handlePrint = async () => {
    setShowActionMenu(false);
    
    try {
      if (!receiptData) {
        Alert.alert("Error", "No receipt data to print");
        return;
      }

      // Generate HTML content for printing
      const htmlContent = generateReceiptHTML();
      
      // Print the HTML content
      await Print.printAsync({
        html: htmlContent,
        printerUrl: undefined, // Let user select printer
      });

    } catch (error) {
      console.error('Error printing receipt:', error);
      Alert.alert("Error", "Failed to print receipt. Please try again.");
    }
  };

  // 4. Copy Transaction ID - Sao chép mã giao dịch
  const copyTransactionId = async () => {
    try {
      if (!receiptData?.transaction.gatewayTransactionId) {
        Alert.alert("Error", "No transaction ID available to copy");
        return;
      }

      // Copy to clipboard
      await Clipboard.setStringAsync(receiptData.transaction.gatewayTransactionId);
      
      // Show success feedback
      Alert.alert(
        "Copied!", 
        `Transaction ID copied to clipboard:\n${receiptData.transaction.gatewayTransactionId}`,
        [
          {
            text: "OK",
            style: "default"
          }
        ]
      );

    } catch (error) {
      console.error('Error copying transaction ID:', error);
      Alert.alert("Error", "Failed to copy transaction ID. Please try again.");
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F5F7FB" />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Feather name="arrow-left" size={24} color="#212121" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>E-Receipt</Text>
          <View style={{width: 24}} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#60A5FA" />
          <Text style={styles.loadingText}>Loading receipt...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F5F7FB" />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Feather name="arrow-left" size={24} color="#212121" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>E-Receipt</Text>
          <View style={{width: 24}} />
        </View>
        <View style={styles.errorContainer}>
          <Feather name="alert-circle" size={48} color="#EF4444" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadReceiptData}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!receiptData) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F5F7FB" />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Feather name="arrow-left" size={24} color="#212121" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>E-Receipt</Text>
          <View style={{width: 24}} />
        </View>
        <View style={styles.errorContainer}>
          <Feather name="file-text" size={48} color="#9CA3AF" />
          <Text style={styles.errorText}>No receipt data found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { date, time } = formatDate(receiptData.paymentDate);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FB" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Feather name="arrow-left" size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>E-Receipt</Text>
        <TouchableOpacity onPress={() => setShowActionMenu(true)}>
          <Feather name="more-horizontal" size={24} color="#212121" />
        </TouchableOpacity>
      </View>

      {/* Receipt Content */}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Receipt Icon */}
          <View style={styles.receiptIconContainer}>
            <View style={styles.receiptIcon}>
              <View style={styles.buildingIcon}>
                <View style={styles.buildingBlocks}>
                  <View style={[styles.block, { backgroundColor: "#60A5FA" }]} />
                  <View style={[styles.block, { backgroundColor: "#60A5FA" }]} />
                  <View style={[styles.block, { backgroundColor: "#60A5FA" }]} />
                  <View style={[styles.block, { backgroundColor: "#60A5FA" }]} />
                  <View style={[styles.block, { backgroundColor: "#9CA3AF" }]} />
                  <View style={[styles.block, { backgroundColor: "#9CA3AF" }]} />
                </View>
                <View style={styles.checkmark}>
                  <Feather name="check" size={16} color="#FFFFFF" />
                </View>
              </View>
              <View style={styles.rupeeSymbol}>
                <Text style={styles.rupeeText}>
                  {receiptData.currency === 'VND' ? '₫' : '$'}
                </Text>
              </View>
            </View>
          </View>

          {/* Barcode */}
          <View style={styles.barcodeContainer}>
            <View style={styles.barcode}>
              {/* Barcode lines */}
              <View style={styles.barcodeLines}>
                {Array.from({ length: 30 }, (_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.barcodeLine,
                      { height: Math.random() > 0.5 ? 40 : 30 },
                    ]}
                  />
                ))}
              </View>
              {/* Corner brackets */}
              <View style={[styles.cornerBracket, styles.topLeft]} />
              <View style={[styles.cornerBracket, styles.topRight]} />
              <View style={[styles.cornerBracket, styles.bottomLeft]} />
              <View style={[styles.cornerBracket, styles.bottomRight]} />
            </View>
            <View style={styles.barcodeNumbers}>
              <Text style={styles.barcodeNumber}>
                {receiptData.paymentId.substring(0, 8)}
              </Text>
              <Text style={styles.barcodeNumber}>
                {receiptData.transaction.gatewayTransactionId.substring(0, 8)}
              </Text>
            </View>
          </View>

          {/* Receipt Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Course</Text>
              <Text style={styles.detailValue} numberOfLines={2}>
                {receiptData.course?.title || 'Course not found'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Category</Text>
              <Text style={styles.detailValue}>
                {receiptData.course?.category || 'N/A'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Level</Text>
              <Text style={styles.detailValue}>
                {receiptData.course?.level || 'N/A'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>
                {receiptData.course?.duration || 'N/A'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Transaction ID</Text>
              <View style={styles.transactionRow}>
                <Text style={styles.detailValue} numberOfLines={1}>
                  {receiptData.transaction.gatewayTransactionId}
                </Text>
                <TouchableOpacity onPress={copyTransactionId}>
                  <Feather name="copy" size={16} color="#666" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment ID</Text>
              <Text style={styles.detailValue} numberOfLines={1}>
                {receiptData.paymentId}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Price</Text>
              <Text style={styles.detailValue}>
                {formatPrice(receiptData.amount, receiptData.currency)}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Method</Text>
              <Text style={styles.detailValue}>
                {receiptData.paymentMethod || 'Bank Transfer'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>
                {date} / {time}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: receiptData.status === 'completed' ? '#10B981' : '#EF4444' }
              ]}>
                <Text style={styles.statusText}>
                  {receiptData.status === 'completed' ? 'Paid' : receiptData.status}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Menu Modal */}
      <Modal
        visible={showActionMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowActionMenu(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowActionMenu(false)}
        >
          <View style={styles.actionMenu}>
            <TouchableOpacity style={styles.actionItem} onPress={handleShare}>
              <Feather name="share" size={20} color="#666" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={handleDownload}
            >
              <Feather name="download" size={20} color="#666" />
              <Text style={styles.actionText}>Download</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem} onPress={handlePrint}>
              <Feather name="printer" size={20} color="#666" />
              <Text style={styles.actionText}>Print</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    color: "#212121",
    fontWeight: "600",
  },
  scrollContent: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#60A5FA',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  receiptIconContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  receiptIcon: {
    position: "relative",
    width: 80,
    height: 60,
  },
  buildingIcon: {
    position: "relative",
  },
  buildingBlocks: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 60,
    height: 40,
  },
  block: {
    width: 8,
    height: 8,
    margin: 1,
  },
  checkmark: {
    position: "absolute",
    right: -10,
    top: -5,
    backgroundColor: "#10B981",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  rupeeSymbol: {
    position: "absolute",
    left: -15,
    top: 10,
    backgroundColor: "#10B981",
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  rupeeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  barcodeContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  barcode: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 8,
    elevation: 2,
  },
  barcodeLines: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 50,
  },
  barcodeLine: {
    width: 2,
    backgroundColor: "#000",
    marginHorizontal: 0.5,
  },
  cornerBracket: {
    position: "absolute",
    width: 15,
    height: 15,
    borderColor: "#000",
    borderWidth: 2,
  },
  topLeft: {
    top: 5,
    left: 5,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 5,
    right: 5,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 5,
    left: 5,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 5,
    right: 5,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  barcodeNumbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
    marginTop: 10,
  },
  barcodeNumber: {
    fontSize: 12,
    color: "#666",
  },
  detailsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    elevation: 2,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: "#212121",
    textAlign: "right",
    flex: 1,
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  statusBadge: {
    backgroundColor: "#10B981",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 80,
    paddingRight: 20,
  },
  actionMenu: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 120,
    elevation: 5,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actionText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 12,
  },
});

export default EReceiptScreen;