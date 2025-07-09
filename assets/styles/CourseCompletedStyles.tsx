import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  courseCompletedOverlay: {
    flex: 1,
    backgroundColor: 'rgba(76, 89, 139, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  courseCompletedContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: width * 0.9,
    maxWidth: 380,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  courseCompletedDecorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  // Decorative shapes
  courseCompletedStar: {
    position: 'absolute',
    width: 16,
    height: 16,
  },
  courseCompletedYellowStar: {
    top: 20,
    right: 60,
    backgroundColor: '#FFD60A',
    transform: [{ rotate: '45deg' }],
  },
  courseCompletedRedStar: {
    bottom: 120,
    left: 30,
    backgroundColor: '#FF3B30',
    transform: [{ rotate: '45deg' }],
  },
  
  courseCompletedLine: {
    position: 'absolute',
    width: 32,
    height: 3,
    borderRadius: 1.5,
  },
  courseCompletedBlackLine: {
    top: 40,
    left: 50,
    backgroundColor: '#000000',
    transform: [{ rotate: '45deg' }],
  },
  courseCompletedTealLine: {
    top: 60,
    right: 80,
    backgroundColor: '#34D399',
    transform: [{ rotate: '-45deg' }],
  },
  
  courseCompletedCircle: {
    position: 'absolute',
    borderRadius: 50,
  },
  courseCompletedOrangeCircle: {
    top: 80,
    left: 40,
    width: 12,
    height: 12,
    backgroundColor: '#FF9500',
  },
  courseCompletedBrownCircle: {
    top: 70,
    right: 40,
    width: 10,
    height: 10,
    backgroundColor: '#8B4513',
  },
  courseCompletedTealCircleSmall: {
    bottom: 140,
    left: 60,
    width: 8,
    height: 8,
    backgroundColor: '#34D399',
  },
  
  courseCompletedTriangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  courseCompletedTealTriangle: {
    top: 90,
    right: 20,
    borderBottomColor: '#34D399',
  },
  courseCompletedBlueTriangle: {
    bottom: 160,
    left: 90,
    borderBottomColor: '#0961F5',
  },
  
  // Main content
  courseCompletedContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  courseCompletedIconContainer: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  
  // Graduation cap
  courseCompletedGraduationCap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseCompletedCapBase: {
    width: 80,
    height: 60,
    backgroundColor: '#000000',
    borderRadius: 8,
    position: 'relative',
  },
  courseCompletedCapTop: {
    position: 'absolute',
    top: -8,
    width: 100,
    height: 8,
    backgroundColor: '#000000',
    borderRadius: 4,
  },
  courseCompletedCapTassel: {
    position: 'absolute',
    top: -12,
    right: -10,
    width: 4,
    height: 20,
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  
  // Headphones
  courseCompletedHeadphones: {
    position: 'absolute',
    top: 10,
    alignItems: 'center',
  },
  courseCompletedHeadphoneLeft: {
    position: 'absolute',
    left: -45,
    top: 15,
    width: 20,
    height: 30,
    backgroundColor: '#000000',
    borderRadius: 10,
  },
  courseCompletedHeadphoneRight: {
    position: 'absolute',
    right: -45,
    top: 15,
    width: 20,
    height: 30,
    backgroundColor: '#000000',
    borderRadius: 10,
  },
  courseCompletedHeadphoneBand: {
    width: 70,
    height: 8,
    backgroundColor: '#000000',
    borderRadius: 4,
    marginTop: 5,
  },
  
  // Text styles
  courseCompletedTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  courseCompletedSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  
  // Buttons
  courseCompletedBrowseButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#0961F5',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    shadowColor: '#0961F5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  courseCompletedBrowseButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0961F5',
    flex: 1,
    textAlign: 'center',
    marginRight: 8,
  },
  courseCompletedArrowContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

}); 