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

// --- Styles đã được cập nhật ---
export const styles = StyleSheet.create({
  // Container
  container: {
    backgroundColor: "#f5f9ff",
    flex: 1,
    paddingTop: verticalScale(16), // Sử dụng paddingTop thay vì marginTop để tránh khoảng trắng
  },

  // Header
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(16),
  },
  headerTitle: {
    color: "#202244",
    fontSize: moderateScale(20),
    fontWeight: "600",
  },

  // Category Filter
  categoryContainer: {
    paddingVertical: verticalScale(10),
    flexGrow: 0, // Ngăn ScrollView chiếm toàn bộ không gian
  },
  categoryContent: {
    paddingHorizontal: scale(20),
    alignItems: "center",
  },
  categoryButton: {
    backgroundColor: "#e8f1ff",
    borderRadius: moderateScale(20),
    marginRight: scale(12),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
  },
  selectedCategoryButton: {
    backgroundColor: "#167f71",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  categoryText: {
    color: "#202244",
    fontSize: moderateScale(14),
    fontWeight: "500",
  },
  selectedCategoryText: {
    color: "#ffffff",
  },

  // Course List
  courseList: {
    flex: 1,
    paddingHorizontal: scale(20),
  },

  // Các style này nên được dùng trong component CourseCard
  // để đảm bảo tính nhất quán
  courseCard: {
    backgroundColor: "#ffffff",
    borderRadius: moderateScale(16),
    elevation: 4,
    flexDirection: "row",
    marginVertical: verticalScale(8),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courseImage: {
    width: scale(100),
    height: "100%",
    borderTopLeftRadius: moderateScale(16),
    borderBottomLeftRadius: moderateScale(16),
  },
  courseContent: {
    flex: 1,
    padding: scale(12),
    justifyContent: "space-between",
  },
  categoryTag: {
    color: "#ff6b00",
    fontSize: moderateScale(12),
    fontWeight: "500",
    marginBottom: verticalScale(4),
  },
  courseTitle: {
    color: "#202244",
    fontSize: moderateScale(15),
    fontWeight: "600",
    flexShrink: 1, // Cho phép text thu nhỏ nếu cần
  },
  coursePrice: {
    color: "#0961f5",
    fontSize: moderateScale(16),
    fontWeight: "700",
    marginTop: verticalScale(4),
  },
  courseStats: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: verticalScale(8),
  },
  ratingContainer: {
    alignItems: "center",
    flexDirection: "row",
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
  students: {
    color: "#6B7280", // Thay đổi màu cho dễ đọc hơn
    fontSize: moderateScale(12),
    fontWeight: "500",
  },

  // Bottom Navigation
  bottomNav: {
    backgroundColor: "#ffffff",
    borderTopColor: "#e2e6ea",
    borderTopWidth: 1,
    flexDirection: "row",
    paddingHorizontal: scale(8),
    paddingBottom: verticalScale(15), // Thêm không gian cho các thiết bị có "tai thỏ"
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  navText: {
    color: "#a0a4ab",
    fontSize: moderateScale(10),
    fontWeight: "500",
    marginTop: verticalScale(4),
  },
  activeNavText: {
    color: "#167f71",
  },
});
