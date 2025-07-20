import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import {
  ArrowLeft,
  Search,
  Play,
  Award,
  ArrowRight,
  Lock,
} from "lucide-react-native";

import { styles } from "../../../assets/styles/Progress/ProgressStyles";
import {
  getCourseDetail,
  getCourseProgress,
} from "../../redux/services/courseService";
import { RootStackParamList } from "../../types/NavigationType";
import { VideoPlayerModal } from "./VideoPlayerModal";

// --- Types ---
interface Lesson {
  _id: string;
  title: string;
  duration: number;
  videoUrl: string;
}

interface Section {
  _id: string;
  name: string;
  lessons: Lesson[];
}

interface CourseDetailType {
  _id: string;
  title: string;
  sections: Section[];
}

// --- Helper Components ---
const LoadingView = () => (
  <SafeAreaView style={[styles.container, styles.centerContent]}>
    <ActivityIndicator size="large" color="#0961f5" />
    <Text style={styles.loadingText}>Loading Course Progress...</Text>
  </SafeAreaView>
);

const ErrorView = () => (
  <SafeAreaView style={[styles.container, styles.centerContent]}>
    <Text style={styles.errorText}>Could not load course content.</Text>
  </SafeAreaView>
);

const Header = ({ onBack, title }: { onBack: () => void; title: string }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack} style={styles.backButton}>
      <ArrowLeft size={24} color="#202244" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>My Courses</Text>
    <View style={styles.headerSpacer} />
  </View>
);

const SearchBar = ({ value }: { value: string }) => (
  <View style={styles.searchContainer}>
    <View style={styles.searchWrapper}>
      <TextInput style={styles.searchInput} value={value} editable={false} />
      <View style={styles.searchIconWrapper}>
        <Search size={20} color="white" />
      </View>
    </View>
  </View>
);

const LessonCard = ({
  lesson,
  index,
  isUnlocked,
  onPress,
}: {
  lesson: Lesson;
  index: number;
  isUnlocked: boolean;
  onPress: () => void;
}) => (
  <View key={lesson._id} style={styles.lessonCard}>
    <View style={styles.lessonNumber}>
      <Text style={styles.lessonNumberText}>
        {String(index + 1).padStart(2, "0")}
      </Text>
    </View>
    <View style={styles.lessonContent}>
      <Text style={styles.lessonTitle} numberOfLines={1}>
        {lesson.title}
      </Text>
      <Text style={styles.lessonDuration}>
        {lesson.duration >= 60
          ? `${Math.floor(lesson.duration / 60)}m ${lesson.duration % 60}s`
          : `${lesson.duration}s`}
      </Text>
    </View>
    <TouchableOpacity
      style={[styles.playButton, !isUnlocked && { backgroundColor: "#cccccc" }]}
      disabled={!isUnlocked}
      onPress={onPress}
    >
      {isUnlocked ? (
        <Play size={16} color="white" fill="white" />
      ) : (
        <Lock size={16} color="white" fill="white" />
      )}
    </TouchableOpacity>
  </View>
);

const SectionView = ({
  section,
  sectionIndex,
  unlockedLessonIds,
  onLessonPress,
  getTotalDuration,
}: {
  section: Section;
  sectionIndex: number;
  unlockedLessonIds: Set<string>;
  onLessonPress: (lesson: Lesson) => void;
  getTotalDuration: (lessons: Lesson[]) => string;
}) => (
  <View key={section._id} style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>
        Section {String(sectionIndex + 1).padStart(2, "0")} -{" "}
        <Text style={styles.sectionHighlight}>{section.name}</Text>
      </Text>
      <Text style={styles.sectionDuration}>
        {getTotalDuration(section.lessons)}
      </Text>
    </View>
    <View style={styles.lessons}>
      {section.lessons.map((lesson, lessonIndex) => (
        <LessonCard
          key={lesson._id}
          lesson={lesson}
          index={lessonIndex}
          isUnlocked={unlockedLessonIds.has(lesson._id)}
          onPress={() => onLessonPress(lesson)}
        />
      ))}
    </View>
  </View>
);

const BottomSection = ({
  status,
  onStartAgain,
  onContinue,
}: {
  status?: string;
  onStartAgain: () => void;
  onContinue: () => void;
}) => (
  <View style={styles.bottomSection}>
    <View style={styles.bottomContent}>
      {status === "Completed" ? (
        <>
          <View style={styles.certificateWrapper}>
            <Award size={24} color="#167f71" />
          </View>
          <TouchableOpacity style={styles.startButton} onPress={onStartAgain}>
            <Text style={styles.startButtonText}>Start Course Again</Text>
            <ArrowRight size={20} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.startButton} onPress={onContinue}>
          <Text style={styles.startButtonText}>Continue Course</Text>
          <ArrowRight size={20} color="white" />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

// --- Main Component ---
export default function Progress() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "Progress">>();
  const courseId = route.params?.courseId;
  const status = route.params?.status;

  const [course, setCourse] = useState<CourseDetailType | null>(null);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  useEffect(() => {
    if (!courseId) {
      setIsError(true);
      setIsLoading(false);
      return;
    }
    const fetchCourseData = async () => {
      try {
        setIsLoading(true);
        const [courseDetailResponse, courseProgressResponse] =
          await Promise.all([
            getCourseDetail(courseId),
            getCourseProgress(courseId),
          ]);
        setCourse(courseDetailResponse);
        if (courseProgressResponse && courseProgressResponse.data) {
          setCompletedCount(courseProgressResponse.data.completedLessons);
        }
      } catch (error) {
        console.error("Failed to fetch course data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourseData();
  }, [courseId]);

  const unlockedLessonIds = useMemo<Set<string>>(() => {
    if (!course) return new Set<string>();
    const allLessons = course.sections.flatMap((section) => section.lessons);
    return new Set<string>(
      allLessons.slice(0, completedCount + 1).map((l) => l._id)
    );
  }, [course, completedCount]);

  const getTotalDuration = (lessons: Lesson[]) => {
    const totalSeconds = lessons.reduce((sum, l) => sum + (l.duration || 0), 0);
    if (!totalSeconds) return "0s";
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (mins && secs) return `${mins}m ${secs}s`;
    if (mins) return `${mins}m`;
    return `${secs}s`;
  };

  const handleLessonPress = (lesson: Lesson) => {
    if (lesson.videoUrl) {
      setCurrentVideoUrl(lesson.videoUrl);
      setIsPlayerVisible(true);
    } else {
      console.warn(`Lesson ${lesson._id} does not have a videoUrl.`);
    }
  };

  const handleClosePlayer = () => {
    setIsPlayerVisible(false);
    setCurrentVideoUrl("");
  };

  // 💡 1. Hàm xử lý cho nút "Continue Course"
  const handleContinueCourse = () => {
    if (!course) return;

    // Gộp tất cả các bài học thành một mảng duy nhất
    const allLessons = course.sections.flatMap((section) => section.lessons);

    // Bài học tiếp theo chính là bài học ở vị trí có chỉ số bằng số bài đã hoàn thành
    // Kiểm tra xem chỉ số này có nằm trong giới hạn của mảng không
    if (completedCount < allLessons.length) {
      const nextLessonToPlay = allLessons[completedCount];
      handleLessonPress(nextLessonToPlay);
    } else {
      console.log("Course already completed.");
    }
  };

  if (isLoading) return <LoadingView />;
  if (isError || !course) return <ErrorView />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f9ff" />
      <Header onBack={() => navigation.goBack()} title="My Courses" />
      <SearchBar value={course.title} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {course.sections.map((section, idx) => (
          <SectionView
            key={section._id}
            section={section}
            sectionIndex={idx}
            unlockedLessonIds={unlockedLessonIds}
            onLessonPress={handleLessonPress}
            getTotalDuration={getTotalDuration}
          />
        ))}
      </ScrollView>
      <VideoPlayerModal
        isVisible={isPlayerVisible}
        videoUrl={currentVideoUrl}
        onClose={handleClosePlayer}
      />
      {/* 💡 2. Cập nhật prop onContinue */}
      <BottomSection
        status={status}
        onStartAgain={() => console.log("Starting course again")}
        onContinue={handleContinueCourse}
      />
    </SafeAreaView>
  );
}
