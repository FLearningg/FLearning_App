import React, { useState, FC, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Search, X } from "lucide-react-native";
import { styles } from "../../../assets/styles/PopularCoursesStyles";
import CourseCard from "./CourseCard";
import BottomNav from "./BottomNav";
import { getBestSelling } from "../../redux/services/courseService";

// --- Types ---
interface ApiCourse {
  _id: string;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  studentsEnrolled: string[];
  categoryIds: {
    _id: string;
    name: string;
  }[];
}

interface ProcessedCourse {
  _id: string;
  categoryName: string;
  title: string;
  price: number;
  rating: number;
  studentsEnrolledCount: number;
  thumbnail: string;
  isBookmarked: boolean;
}

// --- Constants ---
const CATEGORIES = [
  "All",
  "Web Development",
  "Graphic Design",
  "3D Design",
  "SEO & Marketing",
  "Arts & Media",
];

// --- Header Component ---
interface HeaderProps {
  onBackPress: () => void;
  onSearchPress: () => void;
  showSearchBar: boolean;
  searchValue: string;
  onChangeSearch: (text: string) => void;
  onCloseSearch: () => void;
}
const Header: FC<HeaderProps> = ({
  onBackPress,
  onSearchPress,
  showSearchBar,
  searchValue,
  onChangeSearch,
  onCloseSearch,
}) => (
  <View style={styles.header}>
    {showSearchBar ? (
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <TextInput
          style={[
            styles.headerTitle,
            {
              flex: 1,
              fontSize: 20,
              backgroundColor: "#f0f0f0",
              borderRadius: 8,
              paddingHorizontal: 12,
              marginLeft: 0,
            },
          ]}
          placeholder="Search courses..."
          value={searchValue}
          onChangeText={onChangeSearch}
          autoFocus
          accessibilityLabel="Search courses"
        />
        <TouchableOpacity
          onPress={onCloseSearch}
          accessibilityRole="button"
          accessibilityLabel="Close search"
          style={{ marginLeft: 8 }}
        >
          <X size={28} color="#202244" />
        </TouchableOpacity>
      </View>
    ) : (
      <>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={onBackPress}
          >
            <ArrowLeft size={28} color="#202244" />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              { fontSize: 24, fontWeight: "bold", marginLeft: 12 },
            ]}
          >
            Popular Courses
          </Text>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Search courses"
          onPress={onSearchPress}
        >
          <Search size={28} color="#202244" />
        </TouchableOpacity>
      </>
    )}
  </View>
);

// --- CategoryFilter Component ---
interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}
const CategoryFilter: FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.categoryContainer}
    contentContainerStyle={styles.categoryContent}
  >
    {categories.map((category) => (
      <TouchableOpacity
        key={category}
        style={[
          styles.categoryButton,
          selectedCategory === category && styles.selectedCategoryButton,
        ]}
        onPress={() => onSelectCategory(category)}
        accessibilityRole="button"
        accessibilityState={{ selected: selectedCategory === category }}
        accessibilityLabel={`Filter by ${category}`}
      >
        <Text
          style={[
            styles.categoryText,
            selectedCategory === category && styles.selectedCategoryText,
            { fontSize: 16 },
          ]}
        >
          {category}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

// --- Main Component ---
const PopularCoursesScreen: FC = () => {
  const navigation = useNavigation<any>();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [courses, setCourses] = useState<ProcessedCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Fetch courses
  useEffect(() => {
    let isMounted = true;
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const apiCourses: ApiCourse[] = await getBestSelling();
        if (!isMounted) return;
        setCourses(
          apiCourses.map((course) => ({
            _id: course._id,
            title: course.title,
            price: course.price,
            rating: course.rating,
            thumbnail: course.thumbnail,
            studentsEnrolledCount: course.studentsEnrolled.length,
            categoryName: course.categoryIds?.[0]?.name || "Uncategorized",
            isBookmarked: false,
          }))
        );
        setIsError(false);
      } catch (error) {
        if (isMounted) setIsError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchCourses();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered courses
  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" || course.categoryName === selectedCategory;
    const matchesSearch =
      !searchValue.trim() ||
      course.title.toLowerCase().includes(searchValue.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handlers
  const handleToggleBookmark = useCallback((id: string) => {
    setCourses((prev) =>
      prev.map((course) =>
        course._id === id
          ? { ...course, isBookmarked: !course.isBookmarked }
          : course
      )
    );
  }, []);

  const handleSearchPress = () => setShowSearchBar(true);
  const handleCloseSearch = () => {
    setShowSearchBar(false);
    setSearchValue("");
  };

  // Render
  if (isLoading) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#0961f5" />
        <Text style={{ marginTop: 10 }}>Loading Courses...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: "red" }}>
          Failed to load courses. Please try again.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Bọc nội dung chính vào một View có flex: 1 */}
      <View style={{ flex: 1 }}>
        <Header
          onBackPress={() => navigation.goBack()}
          onSearchPress={handleSearchPress}
          showSearchBar={showSearchBar}
          searchValue={searchValue}
          onChangeSearch={setSearchValue}
          onCloseSearch={handleCloseSearch}
        />
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <ScrollView
          style={styles.courseList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }} // Thêm paddingBottom ở đây
        >
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onToggleBookmark={handleToggleBookmark}
                onPress={() =>
                  navigation.navigate("CourseDetail", { courseId: course._id })
                }
              />
            ))
          ) : (
            // Cải thiện phần hiển thị khi không có khóa học
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No courses found.</Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* BottomNav nằm ngoài View đó */}
      <BottomNav />
    </SafeAreaView>
  );
};

export default PopularCoursesScreen;
