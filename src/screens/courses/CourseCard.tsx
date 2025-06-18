import React, { memo, FC } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Star, Bookmark } from 'lucide-react-native';
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

interface CourseCardProps {
  course: Course;
  onToggleBookmark: (id: string) => void;
}

const CourseCard: FC<CourseCardProps> = memo(({ course, onToggleBookmark }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
    <View
      style={[
        styles.courseImage,
        {
          width: 190,
          height: 190,
          backgroundColor: '#000',
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderLeftWidth: 4,
        },
      ]}
    />
    <TouchableOpacity
      style={[
        styles.courseCard,
        { flex: 1, flexDirection: 'row', alignItems: 'center', minHeight: 100 },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`View ${course.title}`}
      activeOpacity={0.8}
    >
      <View style={[styles.courseContent, { flex: 1, padding: 15 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={[styles.categoryTag, { fontSize: 18 }]}>{course.category}</Text>
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={() => onToggleBookmark(course.id)}
            accessibilityRole="button"
            accessibilityLabel={course.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            accessibilityState={{ checked: course.isBookmarked }}
          >
            <Bookmark
              size={24}
              color={course.isBookmarked ? '#167f71' : '#a0a4ab'}
              fill={course.isBookmarked ? '#167f71' : 'transparent'}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.courseTitle, { fontSize: 20 }]}>{course.title}</Text>
        <Text style={[styles.coursePrice, { fontSize: 20 }]}>{course.price}</Text>
        <View style={styles.courseStats}>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#fac025" fill="#fac025" />
            <Text style={[styles.rating, { fontSize: 20 }]}>{course.rating}</Text>
          </View>
          <Text style={[styles.separator, { fontSize: 18 }]}>|</Text>
          <Text style={[styles.students, { fontSize: 18 }]}>{course.students}</Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
));

export default CourseCard;