import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator,
  Linking,
  Modal,
} from "react-native";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome6,
} from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import {
  getCourseDetail,
  getCourseFeedbacks,
  checkCourseEnrollment,
  enrollCourse,
} from "../../redux/services/courseService";
import { getCourseProgress } from "../../redux/services/progressService";
import CourseDetailAbout from "./CourseDetailAbout";
import CourseDetailCurriculum from "./CourseDetailCurriculum";
import ButtonNavigate1 from "../../components/ButtonNavigate1";
import { Video, ResizeMode } from "expo-av";
import { RootStackParamList } from "../../types/NavigationType";
import { StackNavigationProp } from "@react-navigation/stack";

// Types for API response
interface Lesson {
  _id: string;
  title: string;
}

interface Section {
  _id: string;
  title: string;
  lessons: Lesson[];
}

interface Discount {
  price?: string;
  [key: string]: any;
}

interface Course {
  _id: string;
  title: string;
  sections: Section[];
  categoryIds?: string[];
  discountId?: Discount;
  imageUrl?: string;
  instructorName?: string;
  instructorImage?: string;
  subTitle?: string;
  [key: string]: any;
}

interface Feedback {
  _id: string;
  content: string;
  rateStar: number;
  courseId: string;
  userId: {
    _id: string;
    firstName?: string;
    lastName?: string;
    userImage?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface FeedbackResponse {
  feedback: Feedback[];
  averageRating: number;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalFeedback: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

const CourseDetail = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "CourseDetail">>();
  const courseId = route.params?.courseId;
  const [selectedTab, setSelectedTab] = useState<string>("About");
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [comments, setComments] = useState<Feedback[]>([]);
  const [failedAvatars, setFailedAvatars] = useState<Set<string>>(new Set());
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [enrollmentLoading, setEnrollmentLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!courseId) {
      setError("No courseId provided");
      setLoading(false);
      return;
    }
    setLoading(true);
    getCourseDetail(courseId)
      .then((data) => {
        setCourse(data);
        setError(null);
        // Check enrollment status after getting course details
        return checkCourseEnrollment(courseId);
      })
      .then((enrollmentData) => {
        setIsEnrolled(enrollmentData?.isEnrolled || false);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            "Error fetching course details"
        );
        setCourse(null);
      })
      .finally(() => setLoading(false));
  }, [courseId]);

  useEffect(() => {
    if (courseId) {
      getCourseFeedbacks(courseId)
        .then((data) => {
          setComments(data.feedback || []);
        })
        .catch((err) => {
          console.error("Error fetching feedbacks:", err);
          console.error("Error details:", err.response?.data);
        });
    }
  }, [courseId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator
          size="large"
          color="#0961F5"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!course) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "#202244", fontSize: 16 }}>
            Course not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Lấy thumbnail, trailer, description, detail, v.v. từ course
  const thumbnail =
    course.thumbnail ||
    course.imageUrl ||
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80";
  const trailer = course.trailer;
  const description = course.subTitle;
  const willLearn = course.detail?.willLearn || [];
  const targetAudience = course.detail?.targetAudience || [];
  const requirement = course.detail?.requirement || [];

  // Helper function to get user avatar
  const getUserAvatar = (userImage?: string) => {
    if (!userImage) {
      return "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80";
    }

    // Firebase URLs can be very long but are valid - use them directly
    return userImage;
  };

  // Handle go to course
  const handleGoToCourse = async () => {
    try {
      const progressResponse = await getCourseProgress(course._id);
      const progressData = progressResponse.data.data;
      const isCompleted = progressData.progressPercentage === 100;

      navigation.navigate("Progress", {
        courseId: course._id,
        status: isCompleted ? "Completed" : "Ongoing",
      });
    } catch (error) {
      console.error("Error fetching course progress:", error);
      // Default to Ongoing if there's an error
      navigation.navigate("Progress", {
        courseId: course._id,
        status: "Ongoing",
      });
    }
  };

  return (
    <View style={styles.safeArea}>
      {Platform.OS === "ios" && (
        <>
          <View
            style={{
              height: 44,
              backgroundColor: "#000",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10,
            }}
          />
          <StatusBar barStyle="light-content" backgroundColor="#000" />
        </>
      )}
      {Platform.OS === "android" && (
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
      )}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Image and Back Button */}
        <View style={styles.headerImageContainer}>
          <Image source={{ uri: thumbnail }} style={styles.headerImage} />
          <View style={styles.headerOverlay} />
          <TouchableOpacity
            style={styles.headerBackButton}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="#FFF" />
          </TouchableOpacity>
          {trailer && (
            <TouchableOpacity
              style={styles.playButtonOnHeader}
              onPress={() => setShowTrailer(true)}
            >
              <AntDesign name="play" size={36} color="#FFF" />
            </TouchableOpacity>
          )}
        </View>
        {/* Main Content Card with Custom Tab Navigation */}
        <View style={styles.mainCard}>
          {/* Category */}
          <Text style={styles.categoryText}>
            {Array.isArray(course.categoryIds) && course.categoryIds.length > 0
              ? course.categoryIds
                  .map((cat: any) => (typeof cat === "string" ? cat : cat.name))
                  .join(", ")
              : "Category"}
          </Text>
          <View style={styles.designPrinciplesSection}>
            <Text style={styles.title}>{course.title}</Text>
            <View style={styles.ratingContainer}>
              <AntDesign name="star" size={12} color="#FFC107" />
              <Text style={styles.ratingText}>{course.rating || "4.2"}</Text>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Feather name="book-open" size={14} color="#202244" />
              <Text style={styles.detailText}>
                {course.sections?.reduce(
                  (acc: number, s: Section) => acc + (s.lessons?.length || 0),
                  0
                )}{" "}
                Lessons
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Feather name="clock" size={14} color="#202244" />
              <Text style={styles.detailText}>
                {course.duration !== undefined && course.duration !== null
                  ? course.duration
                  : "-- Hours"}
              </Text>
            </View>
            {!isEnrolled && (
              <Text style={styles.price}>
                {course.discountId?.price || course.price || "499/-"}
              </Text>
            )}
            {isEnrolled && (
              <View style={styles.enrolledBadge}>
                <AntDesign name="checkcircle" size={16} color="#23C485" />
                <Text style={styles.enrolledText}>Enrolled</Text>
              </View>
            )}
          </View>

          {/* Custom Tab Bar */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === "About" && styles.tabButtonActive,
              ]}
              onPress={() => setSelectedTab("About")}
            >
              <Text
                style={[
                  styles.tabLabel,
                  selectedTab === "About" && styles.tabLabelActive,
                ]}
              >
                About
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === "Curriculum" && styles.tabButtonActive,
              ]}
              onPress={() => setSelectedTab("Curriculum")}
            >
              <Text
                style={[
                  styles.tabLabel,
                  selectedTab === "Curriculum" && styles.tabLabelActive,
                ]}
              >
                Curriculum
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content - About: all sections in card, Curriculum: only curriculum */}
          {selectedTab === "About" ? (
            <>
              {/* Description */}
              <CourseDetailAbout course={course} />
            </>
          ) : (
            <CourseDetailCurriculum
              sections={course.sections}
              isEnrolled={isEnrolled}
            />
          )}
        </View>
        {/* Kết thúc mainCard */}
        {/* OUTSIDE the card: */}
        {selectedTab === "About" && (
          <>
            {/* What you'll learn và Target Audience nằm ngoài card trắng */}
            {willLearn.length > 0 && (
              <View
                style={[
                  styles.whatYoullGetContainer,
                  { marginHorizontal: 20, marginTop: 8 },
                ]}
              >
                <View style={styles.sectionTitleContainer}>
                  <FontAwesome
                    name="graduation-cap"
                    size={22}
                    color="#0961F5"
                  />
                  <Text
                    style={[
                      styles.sectionTitle,
                      { marginLeft: 12, marginBottom: 0 },
                    ]}
                  >
                    What you'll learn
                  </Text>
                </View>
                {willLearn.map((item: string, idx: number) => (
                  <View key={idx} style={styles.whatYoullGetItem}>
                    <AntDesign name="checkcircle" size={18} color="#23C485" />
                    <Text style={styles.whatYoullGetText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}
            {targetAudience.length > 0 && (
              <View
                style={[
                  styles.whatYoullGetContainer,
                  { marginHorizontal: 20, marginTop: 8 },
                ]}
              >
                <View style={styles.sectionTitleContainer}>
                  <FontAwesome name="users" size={22} color="#0961F5" />
                  <Text
                    style={[
                      styles.sectionTitle,
                      { marginLeft: 12, marginBottom: 0 },
                    ]}
                  >
                    Target Audience
                  </Text>
                </View>
                {targetAudience.map((item: string, idx: number) => (
                  <View key={idx} style={styles.whatYoullGetItem}>
                    <AntDesign name="user" size={18} color="#0961F5" />
                    <Text style={styles.whatYoullGetText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}
            {/* Reviews/Comments Section */}
            {comments.length > 0 && (
              <View style={{ marginHorizontal: 20, marginBottom: 16 }}>
                <View style={styles.reviewsHeader}>
                  <View style={styles.sectionTitleContainer}>
                    <FontAwesome name="comments" size={22} color="#0961F5" />
                    <Text
                      style={[
                        styles.sectionTitle,
                        { marginLeft: 12, marginBottom: 0 },
                      ]}
                    >
                      Comments
                    </Text>
                  </View>
                </View>
                {comments.map((comment: Feedback, idx: number) => (
                  <View key={comment._id || idx} style={styles.reviewCard}>
                    <View style={styles.reviewAvatarContainer}>
                      <Image
                        source={{
                          uri: failedAvatars.has(comment._id)
                            ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80"
                            : getUserAvatar(comment.userId?.userImage),
                        }}
                        style={styles.reviewAvatar}
                        onError={() => {
                          setFailedAvatars((prev) =>
                            new Set(prev).add(comment._id)
                          );
                        }}
                      />
                    </View>
                    <View style={styles.reviewContent}>
                      <View style={styles.reviewMeta}>
                        <Text style={styles.reviewerName}>
                          {comment.userId?.firstName || "User"}
                        </Text>
                        <View style={styles.reviewRating}>
                          <AntDesign name="star" size={12} color="#FFC107" />
                          <Text style={styles.reviewRatingText}>
                            {comment.rateStar || ""}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.reviewText}>{comment.content}</Text>
                      <View style={styles.reviewStats}>
                        <AntDesign name="heart" size={14} color="#E53935" />
                        <Text style={styles.reviewStatText}>
                          {/* Likes not available in Feedback schema */}
                        </Text>
                        <Text style={styles.reviewStatText}>
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
        {/* Spacer for enroll button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Enrollment Button */}
      <View style={styles.enrollButtonContainer}>
        {isEnrolled ? (
          <ButtonNavigate1
            onPress={handleGoToCourse}
            buttonText="Go to Course"
            disabled={enrollmentLoading}
          />
        ) : (
          <ButtonNavigate1
            onPress={() => {
              navigation.navigate("Cart", { courseId: course._id });
            }}
            buttonText={
              enrollmentLoading
                ? "Enrolling..."
                : `Enroll Course - ${
                    course.discountId?.price || course.price || "499/-"
                  }`
            }
            disabled={enrollmentLoading}
          />
        )}
      </View>

      {/* Modal player */}
      <Modal
        visible={showTrailer}
        animationType="slide"
        onRequestClose={() => setShowTrailer(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            justifyContent: "center",
          }}
        >
          <Video
            source={{ uri: trailer }}
            style={{ width: "100%", height: 300 }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
          />
          <TouchableOpacity
            onPress={() => setShowTrailer(false)}
            style={{ position: "absolute", top: 40, right: 20 }}
          >
            <AntDesign name="close" size={32} color="#FFF" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F9FF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F9FF",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  headerImageContainer: {
    height: 400,
    overflow: "hidden",
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  headerBackButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 30,
    left: 20,
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 8,
  },
  mainCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginTop: -10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    position: "relative",
    marginBottom: 25,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#EAF2FF",
    borderRadius: 10,
    marginHorizontal: 0,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#B3D4FC",
    overflow: "hidden",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  tabButtonActive: {
    backgroundColor: "#fff",
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#202244",
    fontFamily: "Inter-Medium",
  },
  tabLabelActive: {
    color: "#0961F5",
    fontWeight: "700",
  },
  tabContent: {
    // paddingTop: 8,
  },
  playButtonOnHeader: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#23C485",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 3,
  },
  categoryText: {
    fontSize: 13,
    color: "#202244",
    marginBottom: 8,
    marginTop: 32,
    fontFamily: "Inter-Regular",
  },
  designPrinciplesSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    flex: 1,
    color: "#1F1F1F",
    lineHeight: 28,
    fontFamily: "Inter-SemiBold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 13,
    color: "#202244",
    fontFamily: "Inter-Regular",
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  detailText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#202244",
    fontFamily: "Inter-Regular",
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0961F5",
    marginLeft: "auto",
    fontFamily: "Inter-Bold",
  },
  enrolledBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F8F5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: "auto",
  },
  enrolledText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#23C485",
    marginLeft: 4,
    fontFamily: "Inter-SemiBold",
  },
  enrollButtonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  enrollButton: {
    backgroundColor: "#0961F5",
    borderRadius: 32,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#007BFF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  enrollButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1F1F1F",
    lineHeight: 28,
    fontFamily: "Inter-SemiBold",
    marginBottom: 16,
  },
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  instructorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1F1F1F",
    fontFamily: "Inter-SemiBold",
  },
  instructorTitle: {
    fontSize: 13,
    color: "#202244",
    fontFamily: "Inter-Regular",
  },
  whatYoullGetContainer: {
    flexDirection: "column",
    marginBottom: 30,
    gap: 8,
  },
  whatYoullGetItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
  },
  whatYoullGetText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#202244",
    fontFamily: "Inter-Regular",
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 14,
    color: "#007AFF",
    fontFamily: "Inter-Medium",
    marginRight: 4,
  },
  reviewCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  reviewAvatarContainer: {
    marginRight: 10,
  },
  reviewAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  reviewContent: {
    flex: 1,
  },
  reviewMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F1F1F",
    fontFamily: "Inter-SemiBold",
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4D81E5",
    borderRadius: 12,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginRight: 4,
    marginBottom: 4,
  },
  reviewRatingText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#202244",
    fontFamily: "Inter-Regular",
  },
  reviewText: {
    fontSize: 14,
    color: "#202244",
    fontFamily: "Inter-Regular",
    marginBottom: 26,
  },
  reviewStats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  reviewStatText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#202244",
    fontFamily: "Inter-Regular",
    fontWeight: "bold",
    marginRight: 22,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
});

export default CourseDetail;
