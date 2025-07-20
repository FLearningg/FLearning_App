import { StyleSheet, Dimensions } from "react-native";

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
  },

  // Header
  header: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(0),
  },
  headerText: {
    color: "#202244",
    fontSize: moderateScale(24), // Giảm size gốc để có không gian
    fontWeight: "bold",
    marginLeft: scale(12),
    marginTop: verticalScale(28), // Giảm khoảng cách trên
  },

  // Search
  searchContainer: {
    marginHorizontal: scale(24),
    marginVertical: verticalScale(16),
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eeeff0ff",
    borderRadius: moderateScale(16),
    height: verticalScale(56), // Giảm chiều cao một chút
    paddingHorizontal: scale(16),
  },
  searchIcon: {
    marginRight: scale(12),
  },
  searchInput: {
    flex: 1,
    fontSize: moderateScale(16),
    color: "#4B5563",
  },
  filterButton: {
    width: moderateScale(30),
    height: moderateScale(30),
    backgroundColor: "#3B82F6",
    borderRadius: moderateScale(8),
    justifyContent: "center",
    alignItems: "center",
  },

  // Tabs
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: scale(24),
    gap: scale(16),
    marginBottom: verticalScale(24),
  },
  tabButton: {
    flex: 1,
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(24),
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#0D9488",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inactiveTab: {
    backgroundColor: "#EFF6FF",
  },
  tabText: {
    fontSize: moderateScale(16),
    fontWeight: "500",
  },
  activeTabText: {
    color: "white",
  },
  inactiveTabText: {
    color: "#4B5563",
  },

  // Result Header
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(12),
    paddingHorizontal: scale(16),
  },
  resultText: {
    color: "#202244",
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
  highlight: {
    color: "#0961f5",
  },
  resultCount: {
    alignItems: "center",
    flexDirection: "row",
  },
  resultNumber: {
    color: "#0961f5",
    marginRight: scale(4),
    fontSize: moderateScale(14),
    fontWeight: "bold",
  },

  // Course List
  courseList: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(100), // Tăng padding để không bị che bởi navbar
  },
  noResultsText: {
    textAlign: "center",
    marginTop: verticalScale(50),
    fontSize: moderateScale(16),
    color: "#6B7280",
  },

  // Bottom Navigation
  navbar: {
    backgroundColor: "white",
    borderTopColor: "#e2e6ea",
    borderTopWidth: 1,
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(18), // Thêm padding cho các thiết bị có tai thỏ
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  navText: {
    fontSize: moderateScale(10),
    fontWeight: "500",
    marginTop: verticalScale(2),
  },
});
