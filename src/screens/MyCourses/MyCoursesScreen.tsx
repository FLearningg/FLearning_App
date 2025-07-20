import React, { useState, memo, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ArrowLeft, Search } from "lucide-react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootStackParamList } from "../../types/NavigationType";
import { RootState, AppDispatch } from "../../redux/store";
import { getCourseDetail } from "../../redux/services/courseService";
import {
  fetchCompletedCourses,
  fetchIncompleteCourses,
  clearError,
} from "../../redux/store/progressSlice";
import { CourseProgress } from "../../redux/services/progressService";
import BottomNav from "../courses/BottomNav";
import CourseCard from "../courses/CourseCard";
import { styles } from "../../../assets/styles/MyCoursesStyles";

type MyCoursesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MyCourses"
>;
type MyCoursesScreenRouteProp = RouteProp<RootStackParamList, "MyCourses">;

interface MyCoursesScreenProps {
  navigation: MyCoursesScreenNavigationProp;
  route: MyCoursesScreenRouteProp;
}

interface Course {
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
  id: string;
  title: string;
  category: string;
  rating: number;
  duration: string;
  isCompleted: boolean;
  thumbnail?: string;
  progress?: number;
  studentsEnrolledCount?: number;
}

const MyCourseCard = memo(
  ({ course, onPress }: { course: Course; onPress?: () => void }) => (
    <CourseCard course={course as any} variant="mycourses" onPress={onPress} />
  )
);

const Header = memo(({ onBackPress }: { onBackPress: () => void }) => (
  <View style={styles.myCoursesHeader}>
    <TouchableOpacity onPress={onBackPress} style={{ marginTop: 30 }}>
      <ArrowLeft color="#202244" />
    </TouchableOpacity>
    <Text style={styles.myCoursesHeaderText}>My Courses</Text>
  </View>
));

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
            activeTab === tab
              ? styles.myCoursesActiveTab
              : styles.myCoursesInactiveTab,
          ]}
          onPress={() => setActiveTab(tab)}
        >
          <Text
            style={[
              styles.myCoursesTabText,
              activeTab === tab
                ? styles.myCoursesActiveTabText
                : styles.myCoursesInactiveTabText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
);

const calculateAndFormatDuration = (sections: any[]): string => {
  if (!Array.isArray(sections) || sections.length === 0) return "0h 0m";
  try {
    const totalSeconds = sections.reduce((acc, section) => {
      const sectionDuration = (section.lessons || []).reduce(
        (lessonAcc: number, lesson: any) =>
          lessonAcc + (Number(lesson.duration) || 0),
        0
      );
      return acc + sectionDuration;
    }, 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  } catch {
    return "N/A";
  }
};

const convertCourseProgressToUIFormat = (
  courseProgress: CourseProgress,
  details: any
): Course => ({
  courseId: courseProgress.courseId,
  courseTitle: courseProgress.courseTitle,
  courseThumbnail: details?.thumbnail || courseProgress.courseThumbnail,
  completedLessons: courseProgress.completedLessons,
  totalLessons: courseProgress.totalLessons,
  progressPercentage: courseProgress.progressPercentage,
  completedDate: courseProgress.completedDate,
  remainingLessons: courseProgress.remainingLessons,
  enrollmentDate: courseProgress.enrollmentDate,
  lastUpdated: courseProgress.lastUpdated,
  id: courseProgress.courseId,
  title: courseProgress.courseTitle,
  category: details?.categoryIds?.[0]?.name || "Uncategorized",
  rating: details?.rating || 0,
  studentsEnrolledCount: details?.studentsEnrolled?.length || 0,
  duration: calculateAndFormatDuration(details?.sections),
  isCompleted: courseProgress.progressPercentage === 100,
  thumbnail: details?.thumbnail || courseProgress.courseThumbnail,
  progress: courseProgress.progressPercentage,
});

const MyCoursesScreen: React.FC<MyCoursesScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { completedCourses, incompleteCourses, loading, error } = useSelector(
    (state: RootState) => state.progress
  );
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState<"Completed" | "Ongoing">(
    "Ongoing"
  );
  const [courseDetails, setCourseDetails] = useState<{ [key: string]: any }>(
    {}
  );

  useEffect(() => {
    dispatch(
      activeTab === "Completed"
        ? fetchCompletedCourses()
        : fetchIncompleteCourses()
    );
  }, [dispatch, activeTab]);

  const coursesData =
    activeTab === "Completed" ? completedCourses : incompleteCourses;

  useEffect(() => {
    const fetchDetailsForAllCourses = async () => {
      if (coursesData && coursesData.length > 0) {
        try {
          const detailPromises = coursesData.map((course) =>
            getCourseDetail(course.courseId)
          );
          const detailsResults = await Promise.all(detailPromises);
          const detailsMap = detailsResults.reduce((acc, detail, index) => {
            if (detail) acc[coursesData[index].courseId] = detail;
            return acc;
          }, {} as { [key: string]: any });
          setCourseDetails(detailsMap);
        } catch (err) {
          console.error("Failed to fetch course details:", err);
        }
      }
    };
    fetchDetailsForAllCourses();
  }, [coursesData]);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", `Failed to load courses: ${error}`, [
        {
          text: "Retry",
          onPress: () => {
            dispatch(clearError());
            dispatch(
              activeTab === "Completed"
                ? fetchCompletedCourses()
                : fetchIncompleteCourses()
            );
          },
        },
        { text: "OK", onPress: () => dispatch(clearError()) },
      ]);
    }
  }, [error, dispatch, activeTab]);

  const courses: Course[] = coursesData.map((course) =>
    convertCourseProgressToUIFormat(course, courseDetails[course.courseId])
  );

  const filteredCourses = courses.filter((course) => {
    const search = searchText.toLowerCase();
    return (
      course.title.toLowerCase().includes(search) ||
      course.category.toLowerCase().includes(search)
    );
  });

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

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
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0961f5" />
          <Text
            style={{ marginTop: 16, color: "#6B7280", textAlign: "center" }}
          >
            Loading {activeTab.toLowerCase()} courses...
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[
            styles.myCoursesList,
            { paddingHorizontal: 16 },
          ]}
        >
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <MyCourseCard
                key={course.id}
                course={course}
                onPress={() =>
                  navigation.navigate("Progress", {
                    courseId: course.courseId,
                    status: activeTab,
                  })
                }
              />
            ))
          ) : (
            <View style={styles.myCoursesEmptyContainer}>
              <Text style={styles.myCoursesEmptyText}>
                {searchText
                  ? `No ${activeTab.toLowerCase()} courses found matching "${searchText}"`
                  : coursesData.length === 0
                  ? `You have no ${activeTab.toLowerCase()} courses yet`
                  : `No ${activeTab.toLowerCase()} courses found`}
              </Text>
              {!searchText && coursesData.length === 0 && (
                <Text
                  style={{
                    color: "#9CA3AF",
                    textAlign: "center",
                    marginTop: 8,
                    fontSize: 14,
                  }}
                >
                  {activeTab === "Completed"
                    ? "Complete some courses to see them here!"
                    : "Enroll in courses to start learning!"}
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
