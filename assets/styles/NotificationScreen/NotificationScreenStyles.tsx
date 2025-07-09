import { StyleSheet, Platform } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFont } from '../utils/responsive';

export const notificationScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9FF",
    paddingHorizontal: responsiveWidth(16),
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F1FF',
    borderRadius: responsiveWidth(18),
    padding: responsiveWidth(16),
    marginVertical: responsiveHeight(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#B4BDC433',
  },
  iconContainer: {
    width: responsiveWidth(40),
    height: responsiveWidth(40),
    borderRadius: responsiveWidth(20),
    backgroundColor: "#E8F1FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: responsiveWidth(12),
  },
  textContainer: { flex: 1 },
  title: {
    fontSize: responsiveFont(16),
    fontWeight: "600",
    color: "#000",
  },
  description: {
    fontSize: responsiveFont(14),
    color: '#666',
    lineHeight: responsiveHeight(20),
    fontWeight: '500',
  },
  time: {
    fontSize: responsiveFont(12),
    color: "#999",
    marginTop: responsiveHeight(2),
  },
  sectionHeader: {
    marginTop: responsiveHeight(16),
  },
  sectionTitle: {
    fontSize: responsiveFont(16),
    fontWeight: "700",
    color: "#333",
  },
  markAllButton: {
    alignSelf: "flex-end",
    backgroundColor: "#337AB7",
    padding: responsiveWidth(8),
    borderRadius: responsiveWidth(8),
    marginBottom: responsiveHeight(8),
  },
  markAllText: {
    color: "#fff",
    fontWeight: "600",
  },
  showMoreButton: {
    backgroundColor: "#337AB7",
    alignItems: "center",
    padding: responsiveWidth(12),
    borderRadius: responsiveWidth(8),
    marginTop: responsiveHeight(10),
  },
  showMoreText: {
    color: "#fff",
    fontWeight: "600",
  },
});