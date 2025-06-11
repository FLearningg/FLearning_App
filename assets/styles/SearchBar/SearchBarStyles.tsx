import { StyleSheet, Platform } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFont } from '../utils/responsive';

export const searchBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(20),
    marginBottom: responsiveHeight(20),
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: responsiveWidth(27),
    paddingHorizontal: responsiveWidth(20),
    paddingVertical: Platform.OS === 'android' ? responsiveHeight(8) : responsiveHeight(4),
    height: Platform.OS === 'android' ? responsiveHeight(56) : responsiveHeight(54),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: responsiveWidth(12),
      },
      android: {
        elevation: 4,
        borderWidth: 1,
        borderColor: '#f0f0f0',
      },
    }),
  },
  searchIconContainer: {
    marginRight: responsiveWidth(12),
    padding: responsiveWidth(2),
  },
  searchInputContainer: {
    flex: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: responsiveFont(16),
    color: '#333',
    fontWeight: '400',
    ...Platform.select({
      android: {
        paddingVertical: 0,
        textAlignVertical: 'center',
        includeFontPadding: false,
      },
      ios: {
        paddingVertical: 0,
      },
    }),
  },
  filterButton: {
    backgroundColor: '#0961F5',
    borderRadius: responsiveWidth(15),
    width: responsiveWidth(36),
    height: responsiveWidth(36),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(8),
    ...Platform.select({
      ios: {
        shadowColor: '#0961F5',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: responsiveWidth(4),
      },
      android: {
        elevation: 3,
      },
    }),
  },
  // Separated variant styles
  separatedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(20),
    marginBottom: responsiveHeight(20),
  },
  separatedSearchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: responsiveWidth(20),
    paddingHorizontal: responsiveWidth(20),
    paddingVertical: Platform.OS === 'android' ? responsiveHeight(8) : responsiveHeight(4),
    height: Platform.OS === 'android' ? responsiveHeight(56) : responsiveHeight(54),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: responsiveWidth(8),
      },
      android: {
        elevation: 2,
        borderWidth: 1,
        borderColor: '#f0f0f0',
      },
    }),
  },
  separatedSearchInput: {
    flex: 1,
    fontSize: responsiveFont(16),
    color: '#333',
    fontWeight: '400',
    ...Platform.select({
      android: {
        paddingVertical: 0,
        textAlignVertical: 'center',
        includeFontPadding: false,
      },
      ios: {
        paddingVertical: 0,
      },
        }),
  },
  separatedSearchIcon: {
    backgroundColor: '#0961F5',
    borderRadius: Platform.OS === 'android' ? responsiveWidth(10) : responsiveWidth(12),
    width: Platform.OS === 'android' ? responsiveWidth(32) : responsiveWidth(40),
    height: Platform.OS === 'android' ? responsiveWidth(32) : responsiveWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(8),
    ...Platform.select({
      ios: {
        shadowColor: '#0961F5',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: responsiveWidth(4),
      },
      android: {
        elevation: 3,
      },
    }),
  },
 
  }); 