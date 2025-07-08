import React, { useState, memo, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { ArrowLeft, Search } from 'lucide-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootStackParamList } from '../../types/NavigationType';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchCompletedCourses, fetchIncompleteCourses, clearError } from '../../redux/store/progressSlice';
import { CourseProgress } from '../../redux/services/progressService';
import BottomNav from '../courses/BottomNav';
import CourseCard from '../courses/CourseCard';
import { styles } from '../../../assets/styles/MyCoursesStyles';

type MyCoursesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MyCourses'>;
type MyCoursesScreenRouteProp = RouteProp<RootStackParamList, 'MyCourses'>;

interface MyCoursesScreenProps {
  navigation: MyCoursesScreenNavigationProp;
  route: MyCoursesScreenRouteProp;
}

// Extended interface that combines backend data with UI requirements
interface Course {
  // Backend fields
  courseId: string;
  courseTitle: string;
  courseThumbnail?: string;
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
  completedDate?: string;
  remainingLessons?: number;
  enrollmentDate?: string;
  lastUpdated?: string;

  // UI fields (mapped from backend)
  id: string;
  title: string;
  category: string;
  rating: number;
  duration: string;
  isCompleted: boolean;
  image?: string;
  progress?: number;
}

// MyCourseCard Component - now using shared CourseCard
const MyCourseCard = memo(({ course }: { course: Course }) => {
  return (
    <CourseCard
      course={course}
      variant="mycourses"
    />
  );
});

// Header Component
const Header = memo(({ onBackPress }: { onBackPress: () => void }) => (
  <View style={styles.myCoursesHeader}>
    <TouchableOpacity onPress={onBackPress} style={{ marginTop: 30 }}>
      <ArrowLeft color="#202244" />
    </TouchableOpacity>
    <Text style={styles.myCoursesHeaderText}>My Courses</Text>
  </View>
));

// SearchBar Component
const SearchBar = memo(
  ({
    onChangeText,
    searchQuery,
  }: {
    onChangeText: (text: string) => void;
    searchQuery: string;
  }) => (
    <View style={styles.myCoursesSearchContainer}>
      <View style={styles.myCoursesSearchBar}>
        <Search color="#9CA3AF" size={24} style={styles.myCoursesSearchIcon} />
        <TextInput
          placeholder="Search for ..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={onChangeText}
          style={styles.myCoursesSearchInput}
        />
        <TouchableOpacity style={styles.myCoursesFilterButton}>
          <Search color="white" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  )
);

// Tabs Component
const Tabs = memo(
  ({
    activeTab,
    setActiveTab,
  }: {
    activeTab: "Completed" | "Ongoing";
    setActiveTab: React.Dispatch<React.SetStateAction<"Completed" | "Ongoing">>;
  }) => (
    <View style={styles.myCoursesTabsContainer}>
      {(["Completed", "Ongoing"] as const).map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.myCoursesTabButton,
            activeTab === tab ? styles.myCoursesActiveTab : styles.myCoursesInactiveTab,
          ]}
          onPress={() => setActiveTab(tab)}
        >
          <Text
            style={[
              styles.myCoursesTabText,
              activeTab === tab ? styles.myCoursesActiveTabText : styles.myCoursesInactiveTabText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
);


// Helper function to convert backend data to UI format
const convertCourseProgressToUIFormat = (courseProgress: CourseProgress): Course => {
  // Generate category and rating based on courseTitle or use defaults
  const generateCategory = (title: string): string => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('graphic') || titleLower.includes('design')) return 'Graphic Design';
    if (titleLower.includes('web') || titleLower.includes('html') || titleLower.includes('css')) return 'Web Development';
    if (titleLower.includes('ui') || titleLower.includes('ux')) return 'UI/UX Design';
    if (titleLower.includes('marketing') || titleLower.includes('seo')) return 'Digital Marketing';
    if (titleLower.includes('3d') || titleLower.includes('blender')) return '3D Design';
    return 'Programming'; // Default
  };

  const generateRating = (): number => {
    // Generate a rating between 3.5 and 5.0
    return Math.round((3.5 + Math.random() * 1.5) * 10) / 10;
  };

  const generateDuration = (totalLessons: number): string => {
    // Estimate duration based on total lessons (assume 5-10 minutes per lesson)
    const minutes = totalLessons * (5 + Math.random() * 5);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);
    return `${hours} Hrs ${remainingMinutes} Mins`;
  };

  return {
    // Backend fields
    courseId: courseProgress.courseId,
    courseTitle: courseProgress.courseTitle,
    courseThumbnail: courseProgress.courseThumbnail,
    completedLessons: courseProgress.completedLessons,
    totalLessons: courseProgress.totalLessons,
    progressPercentage: courseProgress.progressPercentage,
    completedDate: courseProgress.completedDate,
    remainingLessons: courseProgress.remainingLessons,
    enrollmentDate: courseProgress.enrollmentDate,
    lastUpdated: courseProgress.lastUpdated,

    // UI fields (mapped from backend data)
    id: courseProgress.courseId,
    title: courseProgress.courseTitle,
    category: generateCategory(courseProgress.courseTitle),
    rating: generateRating(),
    duration: generateDuration(courseProgress.totalLessons),
    isCompleted: courseProgress.progressPercentage === 100,
    image: courseProgress.courseThumbnail, // This will be the image URL from backend
    progress: courseProgress.progressPercentage,
  };
};

const MyCoursesScreen: React.FC<MyCoursesScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { completedCourses, incompleteCourses, loading, error } = useSelector(
    (state: RootState) => state.progress
  );

  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState<'Completed' | 'Ongoing'>('Ongoing');

  // Fetch courses when component mounts or tab changes
  useEffect(() => {
    if (activeTab === 'Completed') {
      dispatch(fetchCompletedCourses());
    } else {
      dispatch(fetchIncompleteCourses());
    }
  }, [dispatch, activeTab]);

  // Handle errors
  useEffect(() => {
    if (error) {
      Alert.alert(
        'Error',
        `Failed to load courses: ${error}`,
        [
          {
            text: 'Retry',
            onPress: () => {
              dispatch(clearError());
              if (activeTab === 'Completed') {
                dispatch(fetchCompletedCourses());
              } else {
                dispatch(fetchIncompleteCourses());
              }
            }
          },
          { text: 'OK', onPress: () => dispatch(clearError()) }
        ]
      );
    }
  }, [error, dispatch, activeTab]);

  // Get courses based on active tab and convert to UI format
  const coursesData = activeTab === 'Completed' ? completedCourses : incompleteCourses;
  const courses: Course[] = coursesData.map(convertCourseProgressToUIFormat);

  // Apply search filter
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchText.toLowerCase()) ||
      course.category.toLowerCase().includes(searchText.toLowerCase());
    return matchesSearch;
  });

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.myCoursesContainer}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />

      <Header onBackPress={handleBack} />
      <SearchBar onChangeText={setSearchText} searchQuery={searchText} />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0961f5" />
          <Text style={{ marginTop: 16, color: '#6B7280', textAlign: 'center' }}>
            Loading {activeTab.toLowerCase()} courses...
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={[styles.myCoursesList, { paddingHorizontal: 16 }]}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <MyCourseCard key={course.id} course={course} />
            ))
          ) : (
            <View style={styles.myCoursesEmptyContainer}>
              <Text style={styles.myCoursesEmptyText}>
                {searchText ?
                  `No ${activeTab.toLowerCase()} courses found matching "${searchText}"` :
                  coursesData.length === 0 ?
                    `You have no ${activeTab.toLowerCase()} courses yet` :
                    `No ${activeTab.toLowerCase()} courses found`
                }
              </Text>
              {!searchText && coursesData.length === 0 && (
                <Text style={{ color: '#9CA3AF', textAlign: 'center', marginTop: 8, fontSize: 14 }}>
                  {activeTab === 'Completed'
                    ? 'Complete some courses to see them here!'
                    : 'Enroll in courses to start learning!'
                  }
                </Text>
              )}
            </View>
          )}
        </ScrollView>
      )}

      <BottomNav />
    </View>
  );
};

export default MyCoursesScreen; 
