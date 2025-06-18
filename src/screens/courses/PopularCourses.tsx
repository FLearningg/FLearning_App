import React, { useState, memo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft,
  Search,
  Star,
  Bookmark,
  Home,
  BookOpen,
  MessageCircle,
  CreditCard,
  User,
} from 'lucide-react-native';
import { styles } from '../../../assets/styles/PopularCoursesStyles';

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
const CATEGORIES = ['All', 'Graphic Design', '3D Design', 'Arts & Media'];

const COURSES: Course[] = [
  {
    id: '1',
    category: 'Graphic Design',
    title: 'Graphic Design Advanced',
    price: '7058/-',
    rating: 4.2,
    students: '7830 Std',
    isBookmarked: true,
  },
  {
    id: '2',
    category: 'Graphic Design',
    title: 'Advertisement Design',
    price: '800/-',
    rating: 3.9,
    students: '12680 Std',
    isBookmarked: false,
  },
  {
    id: '3',
    category: 'Programming',
    title: 'Graphic Design Advanced',
    price: '599/-',
    rating: 4.2,
    students: '990 Std',
    isBookmarked: true,
  },
  {
    id: '4',
    category: 'Web Development',
    title: 'Web Developer concept',
    price: '499/-',
    rating: 4.9,
    students: '14580 Std',
    isBookmarked: true,
  },
  {
    id: '5',
    category: 'SEO & Marketing',
    title: 'Digital Marketing Course',
    price: '399/-',
    rating: 4.5,
    students: '8920 Std',
    isBookmarked: false,
  },
];

const NAV_ITEMS = [
  { icon: Home, label: 'HOME', active: true },
  { icon: BookOpen, label: 'MY COURSES', active: false },
  { icon: MessageCircle, label: 'INBOX', active: false },
  { icon: CreditCard, label: 'TRANSACTION', active: false },
  { icon: User, label: 'PROFILE', active: false },
];

// Components
const Header = ({ onBackPress }: { onBackPress: () => void }) => (
  <View style={styles.header}>
    <TouchableOpacity 
      accessibilityRole="button" 
      accessibilityLabel="Go back"
      onPress={onBackPress}
    >
      <ArrowLeft size={24} color="#202244" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>Popular Courses</Text>
    <TouchableOpacity accessibilityRole="button" accessibilityLabel="Search courses">
      <Search size={24} color="#202244" />
    </TouchableOpacity>
  </View>
);

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
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
          ]}
        >
          {category}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const CourseCard = memo(
  ({
    course,
    onToggleBookmark,
  }: {
    course: Course;
    onToggleBookmark: (id: string) => void;
  }) => (
    <TouchableOpacity
      style={styles.courseCard}
      accessibilityRole="button"
      accessibilityLabel={`View ${course.title}`}
    >
      <View style={styles.courseImage} />
      <View style={styles.courseContent}>
        <Text style={styles.categoryTag}>{course.category}</Text>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.coursePrice}>{course.price}</Text>
        <View style={styles.courseStats}>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#fac025" fill="#fac025" />
            <Text style={styles.rating}>{course.rating}</Text>
          </View>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.students}>{course.students}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.bookmarkButton}
        onPress={() => onToggleBookmark(course.id)}
        accessibilityRole="button"
        accessibilityLabel={course.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        accessibilityState={{ checked: course.isBookmarked }}
      >
        <Bookmark
          size={20}
          color={course.isBookmarked ? "#167f71" : "#a0a4ab"}
          fill={course.isBookmarked ? "#167f71" : "transparent"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  )
);

const BottomNav = () => (
  <View style={styles.bottomNav}>
    {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
      <TouchableOpacity
        key={label}
        style={styles.navItem}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ selected: active }}
      >
        <Icon size={24} color={active ? "#167f71" : "#a0a4ab"} />
        <Text
          style={[styles.navText, active && styles.activeNavText]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

// Main Component
const PopularCoursesScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [courses, setCourses] = useState(COURSES);

  const filteredCourses = selectedCategory === 'All'
    ? courses
    : courses.filter((course) => course.category === selectedCategory);

  const handleToggleBookmark = (id: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, isBookmarked: !course.isBookmarked } : course
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Header onBackPress={() => navigation.goBack()} />
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
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
};

export default PopularCoursesScreen;