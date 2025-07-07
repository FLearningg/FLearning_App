import React, { useState, FC } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowLeft,
  Search,
  Home,
  BookOpen,
  MessageCircle,
  CreditCard,
  User,
  X,
} from "lucide-react-native";
import { styles } from "../../../assets/styles/PopularCoursesStyles";
import CourseCard from "./CourseCard";
import BottomNav from "./BottomNav";

// Types
interface Course {
  id: string;
  category: string;
  title: string;
  price: string;
  rating: number;
  students: string;
  isBookmarked: boolean;
}

// Constants
const CATEGORIES = ["All", "Graphic Design", "3D Design", "Arts & Media"];

const COURSES: Course[] = [
  {
    id: "1",
    category: "Graphic Design",
    title: "Graphic Design Advanced",
    price: "7058/-",
    rating: 4.2,
    students: "7830 Std",
    isBookmarked: true,
  },
  {
    id: "2",
    category: "Graphic Design",
    title: "Advertisement Design",
    price: "800/-",
    rating: 3.9,
    students: "12680 Std",
    isBookmarked: false,
  },
  {
    id: "3",
    category: "Programming",
    title: "Graphic Design Advanced",
    price: "599/-",
    rating: 4.2,
    students: "990 Std",
    isBookmarked: true,
  },
  {
    id: "4",
    category: "Web Development",
    title: "Web Developer concept",
    price: "499/-",
    rating: 4.9,
    students: "14580 Std",
    isBookmarked: true,
  },
  {
    id: "5",
    category: "SEO & Marketing",
    title: "Digital Marketing Course",
    price: "399/-",
    rating: 4.5,
    students: "8920 Std",
    isBookmarked: false,
  },
];

const NAV_ITEMS = [
  { icon: Home, label: "HOME", active: true },
  { icon: BookOpen, label: "MY COURSES", active: false },
  { icon: MessageCircle, label: "INBOX", active: false },
  { icon: CreditCard, label: "TRANSACTION", active: false },
  { icon: User, label: "PROFILE", active: false },
];

// Header Component
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

// CategoryFilter Component
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

// Main Component
const PopularCoursesScreen: FC = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [courses, setCourses] = useState(COURSES);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch =
      searchValue.trim() === "" ||
      course.title.toLowerCase().includes(searchValue.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleBookmark = (id: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id
          ? { ...course, isBookmarked: !course.isBookmarked }
          : course
      )
    );
  };

  const handleSearchPress = () => setShowSearchBar(true);

  const handleCloseSearch = () => {
    setShowSearchBar(false);
    setSearchValue("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
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
        contentContainerStyle={styles.courseListContent}
      >
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onToggleBookmark={handleToggleBookmark}
          />
        ))}
        {filteredCourses.length === 0 && (
          <Text
            style={{
              textAlign: "center",
              marginTop: 40,
              fontSize: 18,
              color: "#888",
            }}
          >
            No courses found.
          </Text>
        )}
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
};

export default PopularCoursesScreen;
