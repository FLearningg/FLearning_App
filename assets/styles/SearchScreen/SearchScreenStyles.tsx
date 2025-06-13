import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Base dimensions for iPhone X (375x812)
const baseWidth = 375;
const baseHeight = 812;

// Scale factors
const scaleWidth = screenWidth / baseWidth;
const scaleHeight = screenHeight / baseHeight;
const scaleFont = Math.min(scaleWidth, scaleHeight);

// Helper functions for responsive design
const responsiveWidth = (size: number) => size * scaleWidth;
const responsiveHeight = (size: number) => size * scaleHeight;
const responsiveFont = (size: number) => Math.min(size * scaleFont, size * 1.2);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(20),
    paddingVertical: responsiveHeight(15),
    backgroundColor: '#F8F9FA',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  
  backButton: {
    padding: responsiveWidth(5),
    marginRight: responsiveWidth(15),
  },
  
  headerTitle: {
    fontSize: responsiveFont(18),
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  
  searchContainer: {
    paddingHorizontal: responsiveWidth(20),
    paddingVertical: responsiveHeight(15),
    backgroundColor: '#F8F9FA',
  },
  
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: responsiveWidth(12),
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: Platform.OS === 'android' ? responsiveHeight(8) : responsiveHeight(12),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  
  searchIcon: {
    marginRight: responsiveWidth(10),
  },
  
  searchInput: {
    flex: 1,
    fontSize: responsiveFont(16),
    color: '#000',
    paddingVertical: Platform.OS === 'android' ? responsiveHeight(4) : 0,
  },
  
  searchButton: {
    backgroundColor: '#0961F5',
    borderRadius: responsiveWidth(8),
    padding: responsiveWidth(8),
    marginLeft: responsiveWidth(10),
  },
  
  recentSearchContainer: {
    flex: 1,
    paddingHorizontal: responsiveWidth(20),
    paddingTop: responsiveHeight(20),
  },
  
  recentSearchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(15),
  },
  
  recentSearchTitle: {
    fontSize: responsiveFont(16),
    fontWeight: '600',
    color: '#000',
  },
  
  seeAllText: {
    fontSize: responsiveFont(14),
    fontWeight: '600',
    color: '#0961F5',
  },
  
  recentSearchList: {
    flex: 1,
  },
  
  recentSearchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveHeight(15),
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  
  recentSearchText: {
    fontSize: responsiveFont(16),
    color: '#333',
    flex: 1,
  },
  
  removeButton: {
    padding: responsiveWidth(5),
  },
}); 