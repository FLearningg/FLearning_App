import React, { useState, memo, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Home,
  BookOpen,
  MessageSquare,
  CreditCard,
  User,
} from 'lucide-react-native';
import { styles } from '../../../assets/styles/OnlineCourseStyles';
import CourseCard from './CourseCard';
import { Filters, INITIAL_FILTERS } from './FilterComponents';
import type { RootStackParamList } from '../../types/NavigationType';
import type { RouteProp } from '@react-navigation/native';

// Types
interface Course {
  id: string;
  category: string;
  title: string;
  price: string;
  originalPrice?: string;
  rating: number;
  students: string;
  isBookmarked: boolean;
  isFree: boolean;
}

// Constants
const COURSES: Course[] = [
  {
    id: '1',
    category: 'Graphic Design',
    title: 'Graphic Design Advanced',
    price: '89/-',
    originalPrice: '499',
    rating: 4.2,
    students: '7830 Std',
    isBookmarked: true,
    isFree: false,
  },
  {
    id: '2',
    category: 'Graphic Design',
    title: 'Advance Diploma in Gra..',
    price: '800/-',
    rating: 4.0,
    students: '12680 Std',
    isBookmarked: false,
    isFree: false,
  },
  {
    id: '3',
    category: 'Graphic Design',
    title: 'Graphic Design Advanced',
    price: '799/-',
    rating: 4.2,
    students: '990 Std',
    isBookmarked: true,
    isFree: false,
  },
  {
    id: '4',
    category: 'Web Development',
    title: 'Web Developer conce..',
    price: '900/-',
    rating: 4.5,
    students: '1250 Std',
    isBookmarked: true,
    isFree: false,
  },
];

const NAV_ITEMS = [
  { icon: Home, label: 'HOME', active: true },
  { icon: BookOpen, label: 'MY COURSES' },
  { icon: MessageSquare, label: 'INBOX' },
  { icon: CreditCard, label: 'TRANSACTION' },
  { icon: User, label: 'PROFILE' },
];

// Header Component
const Header = memo(({ onBackPress }: { onBackPress: () => void }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{ marginTop: 30 }}
      >
        <ArrowLeft color="#202244" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Online Courses</Text>
    </View>
  );
});

// SearchBar Component
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
          placeholder="Graphic Design"
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

// Tabs Component
const Tabs = memo(
  ({
    activeTab,
    setActiveTab,
  }: {
    activeTab: 'courses' | 'mentors';
    setActiveTab: React.Dispatch<React.SetStateAction<'courses' | 'mentors'>>;
  }) => (
    <View style={styles.tabsContainer}>
      {(['courses', 'mentors'] as const).map((tab) => (
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

// ResultHeader Component
const ResultHeader = memo(
  ({ count, searchQuery }: { count: number; searchQuery: string }) => (
    <View style={styles.resultHeader}>
      <Text style={[styles.resultText, { fontSize: 20, fontWeight: 'bold' }]}>
        Result for{' '}
        <Text
          style={[styles.highlight, { fontSize: 20, fontWeight: 'bold' }]}
        >
          "{searchQuery || 'All Courses'}"
        </Text>
      </Text>
      <View style={styles.resultCount}>
        <Text style={[styles.resultNumber, { fontSize: 18, fontWeight: 'bold' }]}>
          {count} FOUNDS
        </Text>
        <ChevronRight color="#0961f5" size={16} />
      </View>
    </View>
  )
);

// BottomNav Component
const BottomNav = memo(() => (
  <View style={styles.navbar}>
    {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
      <TouchableOpacity
        key={label}
        style={styles.navItem}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ selected: !!active }}
      >
        <Icon color={active ? '#167f71' : '#a0a4ab'} size={24} />
        <Text style={[styles.navText, { color: active ? '#167f71' : '#a0a4ab' }]}>
          {label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
));

// Main Component
const OnlineCourseScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'OnlineCourses'>>();
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'courses' | 'mentors'>('courses');

  // Handle filters returned from FilterScreen
  useEffect(() => {
    if (route.params?.filters) {
      setFilters(route.params.filters);
    }
  }, [route.params]);

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      Object.entries(filters.subCategories).some(
        ([category, selected]) => selected && course.category === category
      ) || !Object.values(filters.subCategories).some(Boolean);

    const matchesPrice =
      (filters.price.Free && course.isFree) ||
      (filters.price.Paid && !course.isFree) ||
      (!filters.price.Free && !filters.price.Paid);

    const matchesRating =
      Object.entries(filters.rating).some(([rating, selected]) => {
        if (!selected) return false;
        const minRating = parseFloat(rating.split(' ')[0]);
        return course.rating >= minRating;
      }) || !Object.values(filters.rating).some(Boolean);

    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPrice && matchesRating && matchesSearch;
  });

  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setSearchQuery('');
  }, []);

  const handleToggleBookmark = useCallback((id: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id
          ? { ...course, isBookmarked: !course.isBookmarked }
          : course
      )
    );
  }, []);

  const navigateToFilter = () => {
    navigation.navigate('FilterOnlineCourses', {
      filters,
      onApplyFilters: handleFilterChange,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header onBackPress={() => navigation.goBack()} />
      <SearchBar
        onFilterPress={navigateToFilter}
        onChangeText={setSearchQuery}
        searchQuery={searchQuery}
      />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <ResultHeader count={filteredCourses.length} searchQuery={searchQuery} />
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
    </View>
  );
};

export default OnlineCourseScreen;