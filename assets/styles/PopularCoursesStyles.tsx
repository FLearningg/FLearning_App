import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  // Container
  container: {
    backgroundColor: '#f5f9ff',
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  // Header
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    color: '#202244',
    fontSize: 20,
    fontWeight: '600',
  },

  // Category Filter
  categoryContainer: {
    paddingVertical: 16,
    maxHeight: 70,
  },
  categoryContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: '#e8f1ff',
    borderRadius: 20,
    marginRight: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  selectedCategoryButton: {
    backgroundColor: '#167f71',
  },
  categoryText: {
    color: '#202244',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#ffffff',
  },

  // Course List
  courseList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  courseListContent: {
    paddingBottom: 16,
  },
  courseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 5,
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  courseImage: {
    backgroundColor: '#000000',
    borderRadius: 8,
    height: 80,
    width: 80,
  },
  courseContent: {
    flex: 1,
    marginLeft: 16,
  },
  categoryTag: {
    color: '#ff6b00',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  courseTitle: {
    color: '#202244',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  coursePrice: {
    color: '#0961f5',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  courseStats: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  ratingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rating: {
    color: '#202244',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  separator: {
    color: '#a0a4ab',
    fontSize: 12,
    marginHorizontal: 8,
  },
  students: {
    color: '#a0a4ab',
    fontSize: 12,
  },
  bookmarkButton: {
    padding: 4,
  },

  // Bottom Navigation
  bottomNav: {
    backgroundColor: '#ffffff',
    borderTopColor: '#e2e6ea',
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  navText: {
    color: '#a0a4ab',
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
  activeNavText: {
    color: '#167f71',
  },
});