import { StyleSheet } from "react-native";

export // Styles
const styles = StyleSheet.create({
  // Container
  container: {
    backgroundColor: "#f5f9ff",
    flex: 1,
    marginTop: 30,
  },

  // Header
  header: {
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
  },
  headerText: {
    color: "#202244",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
  },

  // Search Bar
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
    paddingHorizontal: 16,
    maxHeight: 50,
  },
  searchBar: {
    backgroundColor: "white",
    borderRadius: 16,
    flex: 1,
    flexDirection: "row",
    paddingLeft: 40,
    paddingVertical: 0,
    position: "relative",
  },
  searchIcon: {
    left: 12,
    position: "absolute",
    top: 14,
  },
  searchInput: {
    color: "#202244",
    flex: 1,
  },
  filterButton: {
    backgroundColor: "#0961f5",
    borderRadius: 12,
    marginLeft: 8,
    padding: 12,
  },

  // Tabs
  tabContainer: {
    flexDirection: "row",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  activeTab: {
    backgroundColor: "#167f71",
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  activeTabText: {
    color: "white",
    fontWeight: "500",
  },
  inactiveTab: {
    backgroundColor: "#e8f1ff",
    borderRadius: 24,
    marginLeft: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  inactiveTabText: {
    color: "#202244",
    fontWeight: "500",
  },

  // Result Header
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  resultText: {
    color: "#202244",
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
    marginRight: 4,
  },

  // Course List
  courseList: {
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  courseCard: {
    backgroundColor: "white",
    borderRadius: 16,
    elevation: 2,
    marginBottom: 12,
    padding: 12,
  },
  courseRow: {
    flexDirection: "row",
    gap: 12,
  },
  thumbnail: {
    backgroundColor: "black",
    borderRadius: 12,
    height: 80,
    width: 80,
  },
  courseContent: {
    flex: 1,
  },
  courseCategory: {
    color: "#ff6b00",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  courseTitle: {
    color: "#202244",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  priceRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 4,
  },
  coursePrice: {
    color: "#0961f5",
    fontSize: 16,
    fontWeight: "700",
  },
  originalPrice: {
    color: "#b4bdc4",
    fontSize: 12,
    marginLeft: 8,
    textDecorationLine: "line-through",
  },
  statsRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  rating: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  ratingText: {
    color: "#202244",
  },
  divider: {
    color: "#b4bdc4",
  },
  students: {
    color: "#202244",
  },

  // Bottom Navigation
  navbar: {
    backgroundColor: "white",
    borderColor: "#e2e6ea",
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    position: "absolute",
    width: "100%",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
  },

  // Filter Modal
  modalContainer: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  modalHeader: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#e2e6ea",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLeft: {
    alignItems: "center",
    flexDirection: "row",
  },
  headerTitle: {
    color: "#202244",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
  },
  clearText: {
    color: "#545454",
    fontSize: 16,
  },
  scrollContent: {
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#202244",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  optionRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 12,
  },
  optionText: {
    color: "#545454",
    fontSize: 16,
    marginLeft: 12,
  },
  footer: {
    backgroundColor: "#ffffff",
    borderColor: "#e2e6ea",
    borderTopWidth: 1,
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    position: "absolute",
    width: "100%",
  },
  applyButton: {
    alignItems: "center",
    backgroundColor: "#0961f5",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 14,
  },
  applyText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
});