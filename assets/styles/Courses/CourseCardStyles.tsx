import { StyleSheet, Dimensions, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");

// Đặt chiều rộng cơ sở của thiết bị thiết kế (ví dụ: iPhone 11, SE)
const guidelineBaseWidth = 375;
/**
 * Hàm co giãn kích thước theo chiều rộng của màn hình.
 * size: Kích thước gốc (px) trong thiết kế.
 */
const scale = (size: number): number => (width / guidelineBaseWidth) * size;
/**
 * Hàm co giãn kích thước theo chiều dọc, hữu ích cho các thuộc tính như height, margin-top, v.v.
 * size: Kích thước gốc (px).
 * factor: Yếu tố điều chỉnh.
 */
const verticalScale = (size: number): number => (height / 812) * size; // 812 là chiều cao của iPhone 11
/**
 * Hàm co giãn cho font-size, giúp văn bản không bị quá to hoặc quá nhỏ.
 * size: Kích thước font gốc.
 * factor: Yếu tố điều chỉnh, giảm tốc độ co giãn so với scale().
 */
const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scale(size) - size) * factor;

export const styles = StyleSheet.create({
  // --- Main Container ---
  cardContainer: {
    minHeight: moderateScale(150), // Sử dụng minHeight để linh hoạt
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(16),
    marginVertical: moderateScale(8),
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(8),
    elevation: 4,
  },

  // --- Image Section ---
  imageWrapper: {
    width: scale(134),
    height: 153,
    borderTopLeftRadius: moderateScale(16),
    borderBottomLeftRadius: moderateScale(16),
    backgroundColor: "#F3F4F6",
    overflow: "hidden",
  },
  courseImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderImage: {
    width: moderateScale(60),
    height: moderateScale(60),
    opacity: 0.5,
  },

  // --- Content Section ---
  contentWrapper: {
    flex: 1,
    padding: moderateScale(16),
    justifyContent: "space-between",
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  categoryTag: {
    color: "#ff6b00",
    fontSize: moderateScale(12),
    fontWeight: "500",
    flexShrink: 1, // Cho phép thu nhỏ nếu tên category dài
    marginRight: scale(8),
  },
  courseTitle: {
    color: "#202244",
    fontSize: moderateScale(14),
    fontWeight: "600",
    marginTop: moderateScale(4),
  },
  coursePrice: {
    color: "#0961f5",
    fontSize: moderateScale(16),
    fontWeight: "700",
    marginTop: moderateScale(4),
  },

  // --- Footer Section (Stats or Progress) ---
  footerContainer: {
    marginTop: moderateScale(8),
  },
  courseStats: {
    alignItems: "center",
    flexDirection: "row",
  },
  ratingContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  ratingText: {
    color: "#202244",
    fontSize: moderateScale(12),
    marginLeft: scale(4),
    fontWeight: "bold",
  },
  rating: {
    color: "#202244",
    fontSize: moderateScale(12),
    marginLeft: scale(4),
    fontWeight: "bold",
  },
  separator: {
    color: "#a0a4ab",
    fontSize: moderateScale(12),
    marginHorizontal: scale(8),
    fontWeight: "bold",
  },
  studentsText: {
    fontSize: moderateScale(12),
    color: "#202244",
  },

  // --- Progress Bar for MyCourse ---
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBarBackground: {
    flex: 1,
    height: moderateScale(6),
    backgroundColor: "#E5E7EB",
    borderRadius: moderateScale(16),
    marginRight: scale(8),
  },
  progressBarFill: {
    height: "100%",
    borderRadius: moderateScale(16),
  },
  progressText: {
    fontSize: moderateScale(12),
    color: "#6B7280",
    fontWeight: "500",
  },

  // --- Bookmark Button ---
  bookmarkButton: {
    padding: moderateScale(4), // Tăng vùng có thể nhấn
    display: "none", // Ẩn
  },
});
