import React, { memo, FC, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Star, Bookmark } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../../assets/styles/PopularCoursesStyles';

// Types
interface BaseCourse {
  id: string;
  category: string;
  title: string;
  rating: number;
  students?: string;
  duration?: string;
  image?: string;
}

interface OnlineCourse extends BaseCourse {
  price: string;
  isBookmarked: boolean;
}

interface MyCourse extends BaseCourse {
  isCompleted: boolean;
  progress?: number;
  totalLessons?: number;
  completedLessons?: number;
  progressPercentage?: number;
}

interface CourseCardProps {
  course: OnlineCourse | MyCourse;
  onToggleBookmark?: (id: string) => void;
  variant?: 'online' | 'mycourses';
}

const CourseCard: FC<CourseCardProps> = memo(({ course, onToggleBookmark, variant = 'online' }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return '#167F71'; // Green
    if (progress >= 50) return '#FF9500'; // Orange  
    if (progress >= 20) return '#FFD60A'; // Yellow
    return '#007AFF'; // Blue
  };

  const isOnlineCourse = (course: OnlineCourse | MyCourse): course is OnlineCourse => {
    return 'price' in course && 'isBookmarked' in course;
  };

  const isMyCourse = (course: OnlineCourse | MyCourse): course is MyCourse => {
    return 'isCompleted' in course;
  };

  return (
    <TouchableOpacity
      style={{
        height: 150,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginTop: 8,
        marginBottom: 8,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
      accessibilityRole="button"
      accessibilityLabel={`View ${course.title}`}
      activeOpacity={0.8}
    >
      <View
        style={{
          width: 134,
          height: 150,
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          backgroundColor: '#F3F4F6',
          overflow: 'hidden',
        }}
      >
        {course.image && !imageError ? (
          <>
            <Image
              source={{ uri: course.image }}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="contain"
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
            {imageLoading && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                }}
              >
                <ActivityIndicator size="small" color="#0961f5" />
              </View>
            )}
          </>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={require('../../../assets/images/LOGO.png')}
              style={{
                width: 60,
                height: 60,
                opacity: 0.5,
              }}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
      <View style={{ flex: 1, padding: 16, justifyContent: 'space-between' }}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={[styles.categoryTag, { fontSize: 12 }]}>{course.category}</Text>
            {isOnlineCourse(course) && onToggleBookmark && (
              <TouchableOpacity
                style={styles.bookmarkButton}
                onPress={() => onToggleBookmark(course.id)}
                accessibilityRole="button"
                accessibilityLabel={course.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                accessibilityState={{ checked: course.isBookmarked }}
              >
                <Bookmark
                  size={20}
                  color={course.isBookmarked ? '#167f71' : '#a0a4ab'}
                  fill={course.isBookmarked ? '#167f71' : 'transparent'}
                />
              </TouchableOpacity>
            )}
            {isMyCourse(course) && course.isCompleted && (
              <View>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              </View>
            )}
          </View>
          <Text style={[styles.courseTitle, { fontSize: 14, marginTop: 4 }]} numberOfLines={1} ellipsizeMode="tail">{course.title}</Text>
          {isOnlineCourse(course) && (
            <Text style={[styles.coursePrice, { fontSize: 16, marginTop: 4 }]}>{course.price}</Text>
          )}
        </View>

        {isMyCourse(course) && course.isCompleted ? (
          <TouchableOpacity style={{ backgroundColor: '#0961f5', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, alignSelf: 'flex-start' }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>VIEW CERTIFICATE</Text>
          </TouchableOpacity>
        ) : isMyCourse(course) && !course.isCompleted ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <View style={{ flex: 1, height: 6, backgroundColor: '#E5E7EB', borderRadius: 16, marginRight: 8 }}>
              <View
                style={{
                  width: `${course.progressPercentage || course.progress || 0}%`,
                  backgroundColor: getProgressColor(course.progressPercentage || course.progress || 0),
                  height: 6,
                  borderRadius: 16,
                }}
              />
            </View>
            <Text style={{ fontSize: 12, color: '#6B7280', fontWeight: '500' }}>
              {course.completedLessons || Math.round(((course.progressPercentage || course.progress || 0) * (course.totalLessons || 100)) / 100)}/{course.totalLessons}
            </Text>
          </View>
        ) : null}

        <View style={[styles.courseStats, { marginTop: 8 }]}>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#fac025" fill="#fac025" />
            <Text style={[styles.rating, { fontSize: 12, marginLeft: 4 }]}>{course.rating}</Text>
          </View>
          <Text style={[styles.separator, { fontSize: 12, marginHorizontal: 8 }]}>|</Text>
          <Text style={{ fontSize: 12, color: "#202244" }}>
            {course.students || course.duration}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default CourseCard;