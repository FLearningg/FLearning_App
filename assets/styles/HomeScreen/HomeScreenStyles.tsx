import { StyleSheet, Platform, Dimensions } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFont } from '../utils/responsive';

const { width: screenWidth } = Dimensions.get('window');

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  safeArea: {
    flex: 1,
  },
  androidStatusBarSpacer: {
    height: Platform.OS === 'android' ? 5 : 0,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: responsiveWidth(20),
    paddingTop: Platform.OS === 'android' ? responsiveHeight(15) : responsiveHeight(10),
    paddingBottom: Platform.OS === 'android' ? responsiveHeight(15) : responsiveHeight(20),
    backgroundColor: '#f8f9fa',
  },
  headerTextContainer: {
    flex: 1,
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'android' ? responsiveHeight(10) : responsiveHeight(10),
  },
  greeting: {
    fontSize: responsiveFont(Platform.OS === 'android' ? 26 : 24),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: responsiveHeight(Platform.OS === 'android' ? 6 : 4),
    ...Platform.select({
      android: {
        includeFontPadding: false,
        textAlignVertical: 'center',
      },
    }),
  },
  subGreeting: {
    fontSize: responsiveFont(Platform.OS === 'android' ? 15 : 14),
    color: '#666',
    marginBottom: responsiveHeight(Platform.OS === 'android' ? 4 : 2),
    lineHeight: responsiveHeight(Platform.OS === 'android' ? 20 : 18),
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
  searchHint: {
    fontSize: responsiveFont(Platform.OS === 'android' ? 13 : 12),
    color: '#999',
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
  notificationButton: {
    padding: responsiveWidth(8),
    marginTop: Platform.OS === 'android' ? responsiveHeight(2) : 0,
    borderRadius: responsiveWidth(12),
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    width: 60,
    height: 60,
  },
  promoBanner: {
    marginHorizontal: responsiveWidth(20),
    backgroundColor: '#0961F5',
    borderRadius: responsiveWidth(16),
    padding: Platform.OS === 'android' ? responsiveWidth(24) : responsiveWidth(20),
    marginBottom: responsiveHeight(24),
  },
  promoContent: {
    flex: 1,
  },
  promoDiscount: {
    color: '#fff',
    fontSize: responsiveFont(Platform.OS === 'android' ? 17 : 16),
    fontWeight: '600',
    marginBottom: Platform.OS === 'android' ? responsiveHeight(6) : responsiveHeight(4),
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
  promoTitle: {
    color: '#fff',
    fontSize: responsiveFont(Platform.OS === 'android' ? 22 : 20),
    fontWeight: 'bold',
    marginBottom: Platform.OS === 'android' ? responsiveHeight(10) : responsiveHeight(8),
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
  promoText: {
    color: '#fff',
    fontSize: responsiveFont(Platform.OS === 'android' ? 15 : 14),
    lineHeight: responsiveHeight(Platform.OS === 'android' ? 20 : 18),
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
  promoDots: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? responsiveHeight(18) : responsiveHeight(16),
  },
  dot: {
    width: Platform.OS === 'android' ? responsiveWidth(10) : responsiveWidth(8),
    height: Platform.OS === 'android' ? responsiveWidth(10) : responsiveWidth(8),
    borderRadius: Platform.OS === 'android' ? responsiveWidth(5) : responsiveWidth(4),
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginRight: responsiveWidth(8),
  },
  activeDot: {
    backgroundColor: '#FFD700',
  },
  section: {
    marginBottom: Platform.OS === 'android' ? responsiveHeight(20) : responsiveHeight(24),
    paddingBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(20),
    marginBottom: Platform.OS === 'android' ? responsiveHeight(18) : responsiveHeight(16),
  },
  sectionTitle: {
    fontSize: responsiveFont(Platform.OS === 'android' ? 20 : 18),
    fontWeight: 'bold',
    color: '#333',
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
  seeAll: {
    fontSize: responsiveFont(Platform.OS === 'android' ? 15 : 14),
    color: '#0961F5',
    fontWeight: '600',
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
  categoriesContainer: {
    paddingLeft: responsiveWidth(20),
  },
  categoryItem: {
    paddingHorizontal: Platform.OS === 'android' ? responsiveWidth(22) : responsiveWidth(20),
    paddingVertical: Platform.OS === 'android' ? responsiveHeight(10) : responsiveHeight(8),
    marginRight: responsiveWidth(12),
    borderRadius: responsiveWidth(20),
    backgroundColor: '#f5f5f5',
  },
  activeCategoryItem: {
    backgroundColor: '#f5f5f5',
  },
  categoryText: {
    fontSize: responsiveFont(Platform.OS === 'android' ? 15 : 14),
    color: '#666',
    fontWeight: '500',
    ...Platform.select({
      android: {
        includeFontPadding: false,
        textAlignVertical: 'center',
      },
    }),
  },
  activeCategoryText: {
    color: '#0961F5',
    fontWeight: '600',
  },
  filterTabsContainer: {
    paddingLeft: responsiveWidth(20),
    marginBottom: Platform.OS === 'android' ? responsiveHeight(18) : responsiveHeight(16),
  },
  filterTab: {
    paddingHorizontal: Platform.OS === 'android' ? responsiveWidth(18) : responsiveWidth(16),
    paddingVertical: Platform.OS === 'android' ? responsiveHeight(10) : responsiveHeight(8),
    marginRight: responsiveWidth(12),
    borderRadius: responsiveWidth(20),
    backgroundColor: '#f5f5f5',
  },
  activeFilterTab: {
    backgroundColor: '#167F71',
  },
  filterTabText: {
    fontSize: responsiveFont(Platform.OS === 'android' ? 15 : 14),
    color: '#666',
    fontWeight: '500',
    ...Platform.select({
      android: {
        includeFontPadding: false,
        textAlignVertical: 'center',
      },
    }),
  },
  activeFilterTabText: {
    color: '#fff',
  },
  coursesScrollContainer: {
    paddingBottom: responsiveHeight(5),
    paddingRight: responsiveWidth(20),
  },
  courseCard: {
    width: Platform.OS === 'android' ? screenWidth * 0.55 : responsiveWidth(200),
    marginLeft: responsiveWidth(20),
    backgroundColor: '#fff',
    borderRadius: responsiveWidth(12),
    marginBottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: responsiveWidth(8),
      },
      android: {
        elevation: 4,
      },
    }),
  },
  courseImage: {
    height: Platform.OS === 'android' ? responsiveHeight(130) : responsiveHeight(120),
    backgroundColor: '#fff',
    borderTopLeftRadius: responsiveWidth(12),
    borderTopRightRadius: responsiveWidth(12),
    position: 'relative',
  },
  bookmarkButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? responsiveHeight(138) : responsiveHeight(128),
    right: responsiveWidth(12),
    backgroundColor: '#fff',
    borderRadius: responsiveWidth(6),
    padding: responsiveWidth(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: responsiveWidth(4),
    elevation: 2,
  },
  courseInfo: {
    padding: Platform.OS === 'android' ? responsiveWidth(18) : responsiveWidth(16),
  },
  courseCategory: {
    fontSize: responsiveFont(Platform.OS === 'android' ? 13 : 12),
    color: '#FF5722',
    fontWeight: '600',
    marginBottom: Platform.OS === 'android' ? responsiveHeight(6) : responsiveHeight(4),
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
  courseTitle: {
    fontSize: responsiveFont(Platform.OS === 'android' ? 17 : 16),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: Platform.OS === 'android' ? responsiveHeight(10) : responsiveHeight(8),
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
  courseStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coursePrice: {
    fontSize: responsiveFont(Platform.OS === 'android' ? 15 : 14),
    fontWeight: 'bold',
    color: '#333',
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: responsiveFont(Platform.OS === 'android' ? 13 : 12),
    color: '#666',
    marginLeft: responsiveWidth(4),
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
  students: {
    fontSize: responsiveFont(Platform.OS === 'android' ? 13 : 12),
    color: '#999',
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
}); 