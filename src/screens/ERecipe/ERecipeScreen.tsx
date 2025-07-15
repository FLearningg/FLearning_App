import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  Alert,
  Image,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";

const EReceiptScreen = () => {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const receiptData = {
    name: "Alex",
    email: "alexreall@gmail.com",
    course: "3d Character Illustration Cre...",
    category: "Web Development",
    transactionId: "SK345680976",
    price: "799/-",
    date: "Nov 20, 2023",
    time: "15:45",
    status: "Paid",
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleShare = () => {
    setShowActionMenu(false);
    Alert.alert("Share", "Share functionality would be implemented here");
  };

  const handleDownload = () => {
    setShowActionMenu(false);
    Alert.alert("Download", "Download functionality would be implemented here");
  };

  const handlePrint = () => {
    setShowActionMenu(false);
    Alert.alert("Print", "Print functionality would be implemented here");
  };

  const copyTransactionId = () => {
    Alert.alert("Copied", "Transaction ID copied to clipboard");
  };

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
              <Text style={styles.rupeeText}>₹</Text>
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
            <Text style={styles.barcodeNumber}>25234567</Text>
            <Text style={styles.barcodeNumber}>28646345</Text>
          </View>
        </View>

        {/* Receipt Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name</Text>
            <Text style={styles.detailValue}>{receiptData.name}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email ID</Text>
            <Text style={styles.detailValue}>{receiptData.email}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Course</Text>
            <Text style={styles.detailValue}>{receiptData.course}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category</Text>
            <Text style={styles.detailValue}>{receiptData.category}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>TransactionID</Text>
            <View style={styles.transactionRow}>
              <Text style={styles.detailValue}>
                {receiptData.transactionId}
              </Text>
              <TouchableOpacity onPress={copyTransactionId}>
                <Feather name="copy" size={16} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Price</Text>
            <Text style={styles.detailValue}>{receiptData.price}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>
              {receiptData.date} / {receiptData.time}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{receiptData.status}</Text>
            </View>
          </View>
        </View>
      </View>

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
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
