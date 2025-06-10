import React, { useState, memo } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Switch,
} from "react-native";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Star,
  Bookmark,
  Home,
  BookOpen,
  MessageSquare,
  CreditCard,
  User,
  ArrowRight,
} from "lucide-react-native";
import { styles } from "../../../assets/styles/OnlineCourseStyles";

// Types
interface Course {
  id: number;
  category: string;
  title: string;
  price: string;
  originalPrice?: string;
  rating: number;
  students: string;
  bookmarked: boolean;
  isFree: boolean;
}

type Filters = typeof INITIAL_FILTERS;
type FilterCategory = keyof Filters;
type FilterItem<C extends FilterCategory> = keyof Filters[C];

// Constants
const INITIAL_FILTERS = {
  subCategories: {
    "Web Development": false,
    "3D Animation": false,
    "3D Design": false,
    "Graphic Design": false,
    "SEO & Marketing": false,
    "Arts & Humanities": false,
  },
  levels: {
    "All Levels": false,
    Beginners: false,
    Intermediate: false,
    Expert: false,
  },
  price: { Paid: false, Free: false },
  features: {
    "All Caption": false,
    Quizzes: false,
    "Coding Exercise": false,
    "Practice Tests": false,
  },
  rating: {
    "4.5 & Up Above": false,
    "4.0 & Up Above": false,
    "3.5 & Up Above": false,
    "3.0 & Up Above": false,
  },
  videoDurations: {
    "0-2 Hours": false,
    "3-6 Hours": false,
    "7-16 Hours": false,
    "17+ Hours": false,
  },
};

const COURSES: Course[] = [
  {
    id: 1,
    category: "Graphic Design",
    title: "Graphic Design Advanced",
    price: "89/-",
    originalPrice: "499",
    rating: 4.2,
    students: "7830 Std",
    bookmarked: true,
    isFree: false,
  },
  {
    id: 2,
    category: "Graphic Design",
    title: "Advance Diploma in Gra..",
    price: "800/-",
    rating: 4.0,
    students: "12680 Std",
    bookmarked: false,
    isFree: false,
  },
  {
    id: 3,
    category: "Graphic Design",
    title: "Graphic Design Advanced",
    price: "799/-",
    rating: 4.2,
    students: "990 Std",
    bookmarked: true,
    isFree: false,
  },
  {
    id: 4,
    category: "Web Development",
    title: "Web Developer conce..",
    price: "900/-",
    rating: 4.5,
    students: "1250 Std",
    bookmarked: true,
    isFree: false,
  },
];

const NAV_ITEMS = [
  { icon: Home, label: "HOME", active: true },
  { icon: BookOpen, label: "MY COURSES" },
  { icon: MessageSquare, label: "INBOX" },
  { icon: CreditCard, label: "TRANSACTION" },
  { icon: User, label: "PROFILE" },
];

// Components
const Header = memo(() => (
  <View style={styles.header}>
    <ArrowLeft color="#202244" />
    <Text style={styles.headerText}>Online Courses</Text>
  </View>
));

const SearchBar = memo(
  ({
    onFilterPress,
    onChangeText,
  }: {
    onFilterPress: () => void;
    onChangeText: (text: string) => void;
  }) => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Search color="#b4bdc4" style={styles.searchIcon} />
        <TextInput
          placeholder="Graphic Design"
          placeholderTextColor="#b4bdc4"
          style={styles.searchInput}
          accessibilityRole="search"
          accessibilityLabel="Search courses"
          onChangeText={onChangeText}
        />
      </View>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={onFilterPress}
        accessibilityRole="button"
        accessibilityLabel="Open filter options"
      >
        <SlidersHorizontal color="white" />
      </TouchableOpacity>
    </View>
  )
);

const Tabs = memo(() => (
  <View style={styles.tabContainer}>
    <TouchableOpacity style={styles.activeTab}>
      <Text style={styles.activeTabText}>Courses</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.inactiveTab}>
      <Text style={styles.inactiveTabText}>Mentors</Text>
    </TouchableOpacity>
  </View>
));

const ResultHeader = memo(({ count }: { count: number }) => (
  <View style={styles.resultHeader}>
    <Text style={styles.resultText}>
      Result for <Text style={styles.highlight}>"Graphic Design"</Text>
    </Text>
    <View style={styles.resultCount}>
      <Text style={styles.resultNumber}>{count} FOUNDS</Text>
      <ChevronRight color="#0961f5" size={16} />
    </View>
  </View>
));

const CourseCard = memo(
  ({ course, onToggleBookmark }: { course: Course; onToggleBookmark: (id: number) => void }) => (
    <TouchableOpacity
      style={styles.courseCard}
      accessibilityRole="button"
      accessibilityLabel={`View ${course.title}`}
    >
      <View style={styles.courseRow}>
        <View style={styles.thumbnail} />
        <View style={styles.courseContent}>
          <Text style={styles.courseCategory}>{course.category}</Text>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.coursePrice}>{course.price}</Text>
            {course.originalPrice && (
              <Text style={styles.originalPrice}>{course.originalPrice}</Text>
            )}
          </View>
          <View style={styles.statsRow}>
            <View style={styles.rating}>
              <Star color="#fac025" fill="#fac025" size={16} />
              <Text style={styles.ratingText}>{course.rating}</Text>
            </View>
            <Text style={styles.divider}>|</Text>
            <Text style={styles.students}>{course.students}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onToggleBookmark(course.id)}
          accessibilityRole="button"
          accessibilityLabel={course.bookmarked ? "Remove bookmark" : "Add bookmark"}
          accessibilityState={{ checked: course.bookmarked }}
        >
          <Bookmark
            size={20}
            color={course.bookmarked ? "#167f71" : "#b4bdc4"}
            fill={course.bookmarked ? "#167f71" : "none"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
);

const BottomNav = memo(() => (
  <View style={styles.navbar}>
    {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
      <TouchableOpacity
        key={label}
        style={styles.navItem}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ selected: active }}
      >
        <Icon color={active ? "#167f71" : "#a0a4ab"} size={24} />
        <Text style={[styles.navText, { color: active ? "#167f71" : "#a0a4ab" }]}>
          {label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
));

const FilterSection = memo(
  <C extends FilterCategory>({
    title,
    items,
    category,
    onFilterChange,
  }: {
    title: string;
    items: Filters[C];
    category: C;
    onFilterChange: (category: C, item: FilterItem<C>) => void;
  }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {Object.entries(items).map(([item, checked]) => (
        <TouchableOpacity
          key={item}
          style={styles.optionRow}
          accessibilityRole="switch"
          accessibilityState={{ checked }}
          accessibilityLabel={`${item} filter`}
        >
          <Switch
            value={!!checked}
            onValueChange={() => onFilterChange(category, item as FilterItem<C>)}
            thumbColor={checked ? "#167f71" : "#f4f3f4"}
            trackColor={{ false: "#b4bdc4", true: "#d1f0ec" }}
          />
          <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
);

const FilterModal = memo(
  ({
    visible,
    onClose,
    filters,
    onFilterChange,
    onClear,
    onApply,
  }: {
    visible: boolean;
    onClose: () => void;
    filters: Filters;
    onFilterChange: <C extends FilterCategory>(category: C, item: FilterItem<C>) => void;
    onClear: () => void;
    onApply: () => void;
  }) => (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      accessibilityViewIsModal
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close filter"
            >
              <ArrowLeft color="#202244" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Filter</Text>
          </View>
          <TouchableOpacity
            onPress={onClear}
            accessibilityRole="button"
            accessibilityLabel="Clear filters"
          >
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <FilterSection
            title="SubCategories:"
            items={filters.subCategories}
            category="subCategories"
            onFilterChange={onFilterChange}
          />
          <FilterSection
            title="Levels:"
            items={filters.levels}
            category="levels"
            onFilterChange={onFilterChange}
          />
          <FilterSection
            title="Price:"
            items={filters.price}
            category="price"
            onFilterChange={onFilterChange}
          />
          <FilterSection
            title="Features:"
            items={filters.features}
            category="features"
            onFilterChange={onFilterChange}
          />
          <FilterSection
            title="Rating:"
            items={filters.rating}
            category="rating"
            onFilterChange={onFilterChange}
          />
          <FilterSection
            title="Video Durations:"
            items={filters.videoDurations}
            category="videoDurations"
            onFilterChange={onFilterChange}
          />
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={onApply}
            accessibilityRole="button"
            accessibilityLabel="Apply filters"
          >
            <Text style={styles.applyText}>Apply</Text>
            <ArrowRight color="#ffffff" size={20} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  )
);

// Main Component
const OnlineCourseScreen = () => {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      Object.entries(filters.subCategories).some(
        ([category, selected]) => selected && course.category === category
      ) || !Object.values(filters.subCategories).some((selected) => selected);

    const matchesPrice =
      (filters.price.Free && course.isFree) ||
      (filters.price.Paid && !course.isFree) ||
      (!filters.price.Free && !filters.price.Paid);

    const matchesRating =
      Object.entries(filters.rating).some(([rating, selected]) => {
        if (!selected) return false;
        const minRating = parseFloat(rating.split(" ")[0]);
        return course.rating >= minRating;
      }) || !Object.values(filters.rating).some((selected) => selected);

    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPrice && matchesRating && matchesSearch;
  });

  const handleFilterChange = <C extends FilterCategory>(
    category: C,
    item: FilterItem<C>
  ) => {
    setFilters((prev) => {
      if (!(category in prev)) {
        console.error(`Category ${category} does not exist in filters`);
        return prev;
      }
      return {
        ...prev,
        [category]: {
          ...prev[category],
          [item]: !prev[category][item],
        },
      };
    });
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchQuery("");
  };

  const handleApplyFilters = () => {
    setFilterVisible(false);
  };

  const handleToggleBookmark = (id: number) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, bookmarked: !course.bookmarked } : course
      )
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar
        onFilterPress={() => setFilterVisible(true)}
        onChangeText={setSearchQuery} // Add search functionality
      />
      <Tabs />
      <ResultHeader count={filteredCourses.length} />
      <ScrollView contentContainerStyle={styles.courseList}>
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onToggleBookmark={handleToggleBookmark}
          />
        ))}
      </ScrollView>
      <BottomNav />
      <FilterModal
        visible={isFilterVisible}
        onClose={() => setFilterVisible(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={handleClearFilters}
        onApply={handleApplyFilters}
      />
    </View>
  );
};

export default OnlineCourseScreen;