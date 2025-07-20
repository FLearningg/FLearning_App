import { StyleSheet, StatusBar, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const scale = (size: number): number =>
  (screenWidth / guidelineBaseWidth) * size;
const verticalScale = (size: number): number =>
  (screenHeight / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scale(size) - size) * factor;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f9ff",
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
    marginTop: verticalScale(16),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(24),
    paddingVertical: verticalScale(12),
  },
  backButton: {
    padding: moderateScale(4),
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: moderateScale(20),
    fontWeight: "600",
    color: "#202244",
  },
  headerSpacer: {
    width: scale(28),
  },
  searchContainer: {
    paddingHorizontal: moderateScale(24),
    paddingBottom: verticalScale(20),
  },
  searchWrapper: {
    position: "relative",
    justifyContent: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderRadius: moderateScale(16),
    paddingRight: scale(52),
    paddingHorizontal: moderateScale(16),
  },
  searchInput: {
    height: verticalScale(52),
    fontSize: moderateScale(15),
    color: "#202244",
  },
  searchIconWrapper: {
    position: "absolute",
    right: scale(8),
    backgroundColor: "#0961f5",
    padding: moderateScale(4),
    borderRadius: moderateScale(12),
    marginRight: moderateScale(8),
  },
  content: {
    flex: 1,
    paddingHorizontal: moderateScale(24),
  },
  section: {
    marginBottom: verticalScale(24),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  sectionTitle: {
    fontSize: moderateScale(17),
    fontWeight: "600",
    color: "#202244",
    flex: 1,
  },
  sectionHighlight: {
    color: "#0961f5",
  },
  sectionDuration: {
    color: "#0961f5",
    fontWeight: "500",
    fontSize: moderateScale(13),
  },
  lessons: {
    gap: verticalScale(12),
  },
  lessonCard: {
    backgroundColor: "white",
    borderRadius: moderateScale(16),
    padding: moderateScale(12),
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  lessonNumber: {
    backgroundColor: "#e8f1ff",
    borderRadius: moderateScale(24),
    width: scale(48),
    height: scale(48),
    justifyContent: "center",
    alignItems: "center",
    marginRight: moderateScale(12),
  },
  lessonNumberText: {
    fontWeight: "600",
    color: "#0961f5",
    fontSize: moderateScale(15),
  },
  lessonContent: {
    flex: 1,
    marginRight: moderateScale(8),
  },
  lessonTitle: {
    fontWeight: "600",
    color: "#202244",
    marginBottom: verticalScale(4),
    fontSize: moderateScale(15),
  },
  lessonDuration: {
    color: "#b4bdc4",
    fontSize: moderateScale(13),
  },
  playButton: {
    backgroundColor: "#0961f5",
    borderRadius: moderateScale(20),
    width: scale(40),
    height: scale(40),
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    paddingHorizontal: moderateScale(24),
    paddingVertical: verticalScale(16),
    backgroundColor: "#f5f9ff", // Match container background
  },
  bottomContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(16),
  },
  certificateWrapper: {
    backgroundColor: "#e2e6ea",
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
  },
  startButton: {
    flex: 1,
    backgroundColor: "#0961f5",
    borderRadius: moderateScale(16),
    paddingVertical: verticalScale(16),
    paddingHorizontal: moderateScale(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(8),
  },
  startButtonText: {
    color: "white",
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
