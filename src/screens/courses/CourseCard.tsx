import React, { memo, FC, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Star, Bookmark } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../../assets/styles/Courses/CourseCardStyles";

// --- Types ---
interface OnlineCourseType {
  _id: string;
  categoryName: string;
  title: string;
  rating: number;
  studentsEnrolledCount: number;
  thumbnail: string;
  price: number;
  isBookmarked: boolean;
  duration?: string;
}

interface MyCourseType {
  _id: string;
  category: string;
  title: string;
  rating: number;
  thumbnail?: string;
  duration?: string;
  isCompleted: boolean;
  progressPercentage?: number;
  totalLessons?: number;
  completedLessons?: number;
  studentsEnrolledCount?: number;
}

interface CourseCardProps {
  course: OnlineCourseType | MyCourseType;
  onToggleBookmark?: (id: string) => void;
  onPress: () => void;
}

const getProgressColor = (progress: number) => {
  if (progress >= 80) return "#167F71";
  if (progress >= 50) return "#FF9500";
  if (progress >= 20) return "#FFD60A";
  return "#007AFF";
};

const isOnlineCourse = (c: any): c is OnlineCourseType =>
  "price" in c && "isBookmarked" in c && "studentsEnrolledCount" in c;

const isMyCourse = (c: any): c is MyCourseType => "isCompleted" in c;

const CourseCard: FC<CourseCardProps> = memo(
  ({ course, onToggleBookmark, onPress }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    const courseThumbnail = course.thumbnail || null;

    const handleImageError = () => {
      setImageError(true);
      setImageLoading(false);
    };

    const renderImage = () =>
      courseThumbnail && !imageError ? (
        <>
          <Image
            source={{ uri: courseThumbnail }}
            style={styles.courseImage}
            resizeMode="cover"
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={handleImageError}
          />
          {imageLoading && (
            <View style={styles.imageOverlay}>
              <ActivityIndicator size="small" color="#0961f5" />
            </View>
          )}
        </>
      ) : (
        <View style={styles.placeholderImageContainer}>
          <Image
            source={require("../../../assets/images/LOGO.png")}
            style={styles.placeholderImage}
            resizeMode="contain"
          />
        </View>
      );

    const renderBookmarkOrCompleted = () => {
      if (isOnlineCourse(course) && onToggleBookmark) {
        return (
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={() => onToggleBookmark(course._id)}
            accessibilityState={{ checked: course.isBookmarked }}
          >
            <Bookmark
              size={20}
              color={course.isBookmarked ? "#167f71" : "#a0a4ab"}
              fill={course.isBookmarked ? "#167f71" : "transparent"}
            />
          </TouchableOpacity>
        );
      }
      if (isMyCourse(course) && course.isCompleted) {
        return <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />;
      }
      return null;
    };

    const renderStats = () => (
      <View style={[styles.footerContainer, styles.courseStats]}>
        <View style={styles.ratingContainer}>
          <Star size={14} color="#fac025" fill="#fac025" />
          <Text style={styles.ratingText}>{course.rating ?? 0}</Text>
        </View>
        <Text style={styles.separator}>|</Text>
        <Text style={styles.studentsText}>
          {isOnlineCourse(course)
            ? `${course.studentsEnrolledCount} student${
                course.studentsEnrolledCount !== 1 ? "s" : ""
              }`
            : course.duration}
        </Text>
      </View>
    );

    const renderProgress = () => {
      if (isMyCourse(course) && !course.isCompleted) {
        const progress = course.progressPercentage || 0;
        return (
          <View
            style={[
              styles.footerContainer,
              styles.progressContainer,
              { marginTop: 8 },
            ]}
          >
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${progress}%`,
                    backgroundColor: getProgressColor(progress),
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {course.completedLessons || "0"}/{course.totalLessons}
            </Text>
          </View>
        );
      }
      return null;
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.cardContainer}
        accessibilityRole="button"
        accessibilityLabel={`View ${course.title}`}
        activeOpacity={0.8}
      >
        <View style={styles.imageWrapper}>{renderImage()}</View>
        <View style={styles.contentWrapper}>
          <View>
            <View style={styles.contentHeader}>
              <Text style={styles.categoryTag}>
                {isOnlineCourse(course) ? course.categoryName : course.category}
              </Text>
              {renderBookmarkOrCompleted()}
            </View>
            <Text
              style={styles.courseTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {course.title}
            </Text>
            {isOnlineCourse(course) && (
              <Text style={styles.coursePrice}>
                {course.price > 0 ? `$${course.price.toFixed(2)}` : "Free"}
              </Text>
            )}
          </View>
          {renderStats()}
          {renderProgress()}
        </View>
      </TouchableOpacity>
    );
  }
);

export default CourseCard;
