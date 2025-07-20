// Cart.tsx
import { ChartColumnStacked } from "lucide-react-native";
import { StyleSheet, StatusBar, Dimensions } from "react-native";

// --- Responsive Scaling ---
// 2. Lấy chiều rộng và chiều cao của màn hình thiết bị
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// 3. Xác định kích thước màn hình cơ bản để làm chuẩn cho việc tính toán tỷ lệ
// Các giá trị này thường được lấy từ màn hình của một thiết bị chuẩn (ví dụ: iPhone 8/X)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * Co giãn kích thước theo chiều ngang dựa trên chiều rộng màn hình.
 */
const scale = (size: number): number =>
  (screenWidth / guidelineBaseWidth) * size;

/**
 * Co giãn kích thước theo chiều dọc dựa trên chiều cao màn hình.
 */
const verticalScale = (size: number): number =>
  (screenHeight / guidelineBaseHeight) * size;

/**
 * Co giãn kích thước một cách vừa phải, hữu ích cho font chữ, padding, margin.
 */
const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scale(size) - size) * factor;

export const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    backgroundColor: "#f2f2f7",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: scale(16),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(12),
    backgroundColor: "#f2f2f7",
  },
  backButton: {
    padding: moderateScale(4),
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: moderateScale(20),
    fontWeight: "600",
    color: "#1c1c1e",
  },
  headerSpacer: {
    width: scale(32), // Give it a fixed scaled width
  },
  scrollView: {
    flex: 1, // Allows the scroll view to take up available space
  },
  scrollViewContent: {
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(16), // Add padding at the bottom
  },
  cartCard: {
    backgroundColor: "#ffffff",
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    padding: moderateScale(12),
    flexDirection: "row",
  },
  imageContainer: {
    marginRight: moderateScale(12),
  },
  courseImage: {
    width: scale(90),
    height: scale(90),
    borderRadius: moderateScale(12),
  },
  courseBadge: {
    position: "absolute",
    top: moderateScale(6),
    left: moderateScale(6),
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(4),
  },
  courseBadgeText: {
    color: "#ffffff",
    fontSize: moderateScale(10),
    fontWeight: "600",
  },
  courseDetails: {
    flex: 1,
    justifyContent: "space-between", // Distribute space between top and bottom parts
  },
  courseBigHeader: {},
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  categoryText: {
    color: "#ff9500",
    fontSize: moderateScale(13),
    fontWeight: "500",
    marginBottom: verticalScale(4),
  },
  courseTitle: {
    color: "#1c1c1e",
    fontSize: moderateScale(15),
    fontWeight: "600",
    lineHeight: moderateScale(20),
    marginBottom: verticalScale(4),
  },
  coursePrice: {
    color: "#007aff",
    fontSize: moderateScale(17),
    fontWeight: "700",
  },
  courseFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
  ratingText: {
    color: "#8e8e93",
    fontSize: moderateScale(13),
  },
  enrollButton: {
    backgroundColor: "#007aff",
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(8),
  },
  enrollButtonText: {
    color: "#ffffff",
    fontSize: moderateScale(13),
    fontWeight: "500",
  },
  bottomSection: {
    paddingHorizontal: moderateScale(24),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(24), // Adjust for safe area on some phones
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5e5ea",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  subtotalLabel: {
    color: "#8e8e93",
    fontSize: moderateScale(16),
  },
  subtotalValue: {
    color: "#1c1c1e",
    fontSize: moderateScale(16),
    fontWeight: "500",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  totalLabel: {
    color: "#1c1c1e",
    fontSize: moderateScale(18),
    fontWeight: "600",
  },
  totalValue: {
    color: "#007aff",
    fontSize: moderateScale(18),
    fontWeight: "700",
  },
  checkoutButton: {
    backgroundColor: "#007aff",
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    alignItems: "center",
    marginBottom: verticalScale(24),
  },
  checkoutButtonText: {
    color: "#ffffff",
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
  // --- Loading & Error States ---
  loadingText: {
    marginTop: verticalScale(15),
    fontSize: moderateScale(16),
    color: "#6B7280",
  },
  errorText: {
    fontSize: moderateScale(18),
    color: "#d9534f",
    textAlign: "center",
    marginBottom: verticalScale(10),
    fontWeight: "500",
  },
  errorLink: {
    fontSize: moderateScale(16),
    color: "#0961f5",
    textDecorationLine: "underline",
    marginTop: verticalScale(10),
  },
});
