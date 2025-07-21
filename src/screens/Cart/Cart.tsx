import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { ArrowLeft, Star, Trash2 } from "lucide-react-native";
import { styles } from "../../../assets/styles/Cart/CartStyles";

// Import services và types
import { getCourseDetail } from "../../redux/services/courseService";
import { RootStackParamList } from "../../types/NavigationType";

// Import component Modal từ file cùng thư mục
import PaymentModal from "./PaymentModal";
import { useSelector } from "react-redux";

// --- Types ---
interface CourseDetailType {
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

// --- Component Chính ---
export default function MobileCart() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "Cart">>();
  const { courseId } = route.params;
  const currentUser = useSelector((state: any) => state.auth.currentUser);

  const [course, setCourse] = useState<CourseDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // State để điều khiển modal thanh toán
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);

  // ⚠️ LƯU Ý: Thay thế bằng ID người dùng đã đăng nhập thực tế của bạn
  const userId = currentUser?._id;

  useEffect(() => {
    if (!courseId) {
      setIsLoading(false);
      setIsError(true);
      console.error("No courseId provided to Cart screen.");
      return;
    }

    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const courseData = await getCourseDetail(courseId);
        setCourse(courseData);
        setIsError(false);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  // Giao diện khi đang tải
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#0961f5" />
        <Text style={styles.loadingText}>Loading Cart...</Text>
      </SafeAreaView>
    );
  }

  // Giao diện khi có lỗi
  if (isError || !course) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Cannot fetch the courses.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.errorLink}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const subtotal = course.price;
  const total = course.price;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f7" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Nội dung chính */}
      <View style={styles.contentArea}>
        <View style={styles.cartCard}>
          <View style={styles.cardContent}>
            {/* Ảnh khóa học */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: course.thumbnail }}
                style={styles.courseImage}
              />
              <View style={styles.courseBadge}>
                <Text style={styles.courseBadgeText}>Courses</Text>
              </View>
            </View>

            {/* Chi tiết khóa học */}
            <View style={styles.courseDetails}>
              <View style={styles.courseBigHeader}>
                <View style={styles.courseHeader}>
                  <Text style={styles.categoryText}>
                    {course.categoryIds?.[0]?.name || "Chưa phân loại"}
                  </Text>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Trash2 size={20} color="#8e8e93" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.courseTitle} numberOfLines={2}>
                  {course.title}
                </Text>
                <Text style={styles.coursePrice}>
                  ${course.price.toFixed(2)}
                </Text>
              </View>
              <View style={styles.courseFooter}>
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#ff9500" fill="#ff9500" />
                  <Text style={styles.ratingText}>
                    {course.rating} | {course.studentsEnrolled.length} students
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Phần thanh toán ở dưới */}
      <View style={styles.bottomSection}>
        <View style={styles.priceRow}>
          <Text style={styles.subtotalLabel}>Current Price</Text>
          <Text style={styles.subtotalValue}>${subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => setPaymentModalVisible(true)}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>

      {/* Render Modal (nó sẽ ẩn cho đến khi isVisible là true) */}
      <PaymentModal
        isVisible={isPaymentModalVisible}
        onClose={() => setPaymentModalVisible(false)}
        course={course}
        userId={userId}
      />
    </SafeAreaView>
  );
}
