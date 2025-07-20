import React, { useState, memo, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react-native";
import { styles } from "../../../assets/styles/OnlineCourseStyles";
import CourseCard from "./CourseCard";
import { Filters, INITIAL_FILTERS } from "./FilterComponents";
import type { RootStackParamList } from "../../types/NavigationType";
import type { RouteProp } from "@react-navigation/native";

import { getCourses } from "../../redux/services/courseService";
import GoBackButton from "../../components/GoBackButton";

// --- Types ---
interface ApiCourse {
  _id: string;
  title: string;
  subTitle?: string;
  price: number;
  rating: number;
  studentsEnrolled: string[];
  thumbnail: string;
  categoryIds: {
    _id: string;
    name: string;
    icon: string;
  }[];
}

interface Course {
  _id: string;
  title: string;
  subTitle?: string;
  price: number;
  rating: number;
  studentsEnrolledCount: number;
  thumbnail: string;
  categoryName: string;
  isBookmarked: boolean;
}

// --- Components ---

const SearchBar = memo(
  ({
    onFilterPress,
    onChangeText,
    searchQuery,
  }: {
    onFilterPress: () => void;
    onChangeText: (text: string) => void;
    searchQuery: string;
  }) => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Search color="#9CA3AF" size={24} style={styles.searchIcon} />
        <TextInput
          placeholder="Search courses..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={onChangeText}
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <SlidersHorizontal color="white" size={20} />
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
    activeTab: "courses" | "mentors";
    setActiveTab: React.Dispatch<React.SetStateAction<"courses" | "mentors">>;
  }) => (
    <View style={styles.tabsContainer}>
      {(["courses", "mentors"] as const).map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tabButton,
            activeTab === tab ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab(tab)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
);

const ResultHeader = memo(
  ({ count, searchQuery }: { count: number; searchQuery: string }) => (
    <View style={styles.resultHeader}>
      <Text style={[styles.resultText, { fontSize: 20, fontWeight: "bold" }]}>
        Result for{" "}
        <Text style={[styles.highlight, { fontSize: 20, fontWeight: "bold" }]}>
          "{searchQuery || "All"}"
        </Text>
      </Text>
      <View style={styles.resultCount}>
        <Text
          style={[styles.resultNumber, { fontSize: 18, fontWeight: "bold" }]}
        >
          {count} RESULTS
        </Text>
        <ChevronRight color="#0961f5" size={16} />
      </View>
    </View>
  )
);

// --- Main Component ---
const OnlineCourseScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, "OnlineCourses">>();

  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"courses" | "mentors">("courses");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData: ApiCourse[] = await getCourses();
        const formattedCourses: Course[] = coursesData.map((course) => ({
          _id: course._id,
          title: course.title,
          subTitle: course.subTitle,
          price: course.price,
          rating: course.rating,
          thumbnail: course.thumbnail,
          studentsEnrolledCount: course.studentsEnrolled.length,
          categoryName: course.categoryIds?.[0]?.name || "Uncategorized",
          isBookmarked: false,
        }));
        setCourses(formattedCourses);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (route.params?.filters) setFilters(route.params.filters);
  }, [route.params]);

  const filteredCourses = courses.filter((course) => {
    const isFree = course.price === 0;
    const matchesCategory =
      Object.entries(filters.subCategories).some(
        ([categoryName, selected]) =>
          selected && course.categoryName === categoryName
      ) || !Object.values(filters.subCategories).some(Boolean);

    const matchesPrice =
      (filters.price.Free && isFree) ||
      (filters.price.Paid && !isFree) ||
      (!filters.price.Free && !filters.price.Paid);

    const matchesRating =
      Object.entries(filters.rating).some(([rating, selected]) => {
        if (!selected) return false;
        const minRating = parseFloat(rating.split(" ")[0]);
        return course.rating >= minRating;
      }) || !Object.values(filters.rating).some(Boolean);

    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPrice && matchesRating && matchesSearch;
  });

  const handleToggleBookmark = useCallback((id: string) => {
    setCourses((prev) =>
      prev.map((course) =>
        course._id === id
          ? { ...course, isBookmarked: !course.isBookmarked }
          : course
      )
    );
  }, []);

  const navigateToFilter = () => {
    // Just pass the current state of the filters
    navigation.navigate("FilterOnlineCourses", {
      filters,
    });
  };

  // This useEffect will automatically handle the update when you navigate back
  useEffect(() => {
    if (route.params?.filters) {
      setFilters(route.params.filters);
    }
  }, [route.params]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0961f5" />
        <Text style={{ marginTop: 10 }}>Loading Courses...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", textAlign: "center" }}>
          Unable to load data. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Platform.OS === "android" ? "#fff" : undefined}
        translucent={false}
      />
      {Platform.OS === "android" && (
        <View style={{ height: 10, backgroundColor: "#fff" }} />
      )}
      {!route.params?.fromBottomTab && (
        <GoBackButton
          title="Online Courses"
          onPress={() => navigation.navigate("Home")}
        />
      )}
      <SearchBar
        onFilterPress={navigateToFilter}
        onChangeText={setSearchQuery}
        searchQuery={searchQuery}
      />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <ResultHeader count={filteredCourses.length} searchQuery={searchQuery} />
      <ScrollView contentContainerStyle={styles.courseList}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onToggleBookmark={handleToggleBookmark}
              onPress={() =>
                navigation.navigate("CourseDetail", {
                  courseId: course._id,
                })
              }
            />
          ))
        ) : (
          <Text style={styles.noResultsText}>Cannot find any courses.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnlineCourseScreen;
