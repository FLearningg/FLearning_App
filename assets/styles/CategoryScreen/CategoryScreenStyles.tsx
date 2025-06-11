import { StyleSheet, Platform, Dimensions } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFont } from '../utils/responsive';

const { width: screenWidth } = Dimensions.get('window');

export const categoryScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  safeArea: {
    flex: 1,
  },
  androidStatusBarSpacer: {
    height: Platform.OS === 'android' ? 10 : 0,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(20),
    paddingTop: Platform.OS === 'android' ? responsiveHeight(15) : responsiveHeight(10),
    paddingBottom: responsiveHeight(15),
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    padding: responsiveWidth(8),
    marginRight: responsiveWidth(12),
  },
  headerTitle: {
    fontSize: responsiveFont(Platform.OS === 'android' ? 20 : 18),
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginRight: responsiveWidth(44), // Offset for back button
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
  headerSpacer: {
    width: responsiveWidth(44),
  },
  scrollContent: {
    paddingBottom: responsiveHeight(10),
  },

  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: responsiveWidth(20),
    paddingTop: responsiveHeight(20),
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (screenWidth - responsiveWidth(60)) / 2, // 2 columns with spacing
    backgroundColor: '#fff',
    borderRadius: responsiveWidth(16),
    padding: responsiveWidth(20),
    marginBottom: responsiveHeight(20),
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  iconContainer: {
    width: responsiveWidth(80),
    height: responsiveWidth(80),
    borderRadius: responsiveWidth(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(16),
  },
  categoryImage: {
    width: responsiveWidth(50),
    height: responsiveWidth(50),
  },
  categoryName: {
    fontSize: responsiveFont(Platform.OS === 'android' ? 15 : 14),
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    lineHeight: responsiveHeight(20),
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
}); 