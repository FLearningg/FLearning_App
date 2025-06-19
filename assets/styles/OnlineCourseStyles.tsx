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
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 12,
    marginTop: 30,
  },

  searchContainer: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    height: 64,
    paddingHorizontal: 16,
    position: "relative",
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: "#4B5563",
    paddingRight: 60,
  },
  filterButton: {
    position: "absolute",
    right: 12,
    width: 40,
    height: 40,
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#0D9488",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inactiveTab: {
    backgroundColor: "#EFF6FF",
  },
  tabText: {
    fontSize: 18,
    fontWeight: "500",
  },
  activeTabText: {
    color: "white",
  },
  inactiveTabText: {
    color: "#4B5563",
  },
  contentArea: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  },
  contentText: {
    color: "#6B7280",
    textAlign: "center",
    fontSize: 16,
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
    marginTop: 30,
    marginBottom: 30,
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
});