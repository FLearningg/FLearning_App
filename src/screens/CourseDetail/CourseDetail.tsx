import React, { useState } from "react";
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
} from "react-native";
import {
  AntDesign,
  Feather,
  Ionicons,
  FontAwesome,
  FontAwesome6,
} from "@expo/vector-icons";

const benefits = [
  {
    icon: <Feather name="book-open" size={18} color="#525252" />,
    text: "25 Lessons",
  },
  {
    icon: <Feather name="smartphone" size={18} color="#525252" />,
    text: "Access Mobile, Desktop & TV",
  },
  {
    icon: <FontAwesome6 name="chart-line" size={18} color="#525252" />,
    text: "Beginner Level",
  },
  {
    icon: <FontAwesome name="soundcloud" size={18} color="#525252" />,
    text: "Audio Book",
  },
  {
    icon: <Feather name="calendar" size={18} color="#525252" />,
    text: "Lifetime Access",
  },
  {
    icon: <Feather name="clipboard" size={18} color="#525252" />,
    text: "100 Quizzes",
  },
  {
    icon: <Feather name="award" size={18} color="#525252" />,
    text: "Certificate of Completion",
  },
];

const reviews = [
  {
    id: 1,
    avatar: "https://placehold.co/40x40/d1d1d1/ffffff?text=W",
    name: "Will",
    rating: 4.5,
    text: "This course has been very useful. Mentor was well spoken totally loved it.",
    likes: 578,
    timeAgo: "2 Weeks Ago",
  },
  {
    id: 2,
    avatar: "https://placehold.co/40x40/d1d1d1/ffffff?text=MT",
    name: "Martha E. Thompson",
    rating: 4.5,
    text: "This course has been very useful. Mentor was well spoken totally loved it. It had fun sessions as well.",
    likes: 578,
    timeAgo: "2 Weeks Ago",
  },
];

const CourseDetail = () => {
  const [activeTab, setActiveTab] = useState("about");
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Image and Back Button */}
        <View style={styles.headerImageContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
            }}
            style={styles.headerImage}
          />
          <View style={styles.headerOverlay} />
          <TouchableOpacity style={styles.headerBackButton}>
            <AntDesign name="arrowleft" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Main Content Card */}
        <View style={styles.mainCard}>
          <TouchableOpacity style={styles.floatingPlayButton}>
            <AntDesign name="play" size={28} color="#FFF" />
          </TouchableOpacity>

          <Text style={styles.categoryText}>Graphic Design</Text>
          <View style={styles.designPrinciplesSection}>
            <Text style={styles.title}>Design Principles: Organizing ..</Text>
            <View style={styles.ratingContainer}>
              <AntDesign name="star" size={12} color="#FFC107" />
              <Text style={styles.ratingText}>4.2</Text>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Feather name="book-open" size={14} color="#202244" />
              <Text style={styles.detailText}>21 Class</Text>
            </View>
            <View style={styles.detailItem}>
              <Feather name="clock" size={14} color="#202244" />
              <Text style={styles.detailText}>42 Hours</Text>
            </View>
            <Text style={styles.price}>499/-</Text>
          </View>

          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "about" && styles.activeTab]}
              onPress={() => setActiveTab("about")}
            >
              <Text
                style={
                  activeTab === "about" ? styles.activeTabText : styles.tabText
                }
              >
                About
              </Text>
            </TouchableOpacity>
            <View style={styles.tabDivider} />
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "curriculum" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("curriculum")}
            >
              <Text
                style={
                  activeTab === "curriculum"
                    ? styles.activeTabText
                    : styles.tabText
                }
              >
                Curriculum
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === "about" && (
            <Text style={styles.description}>
              Graphic Design now a popular profession graphic design by off your
              career about tantas regiones barbarorum pedibus obiit{"\n\n"}
              Graphic Design n a popular profession I Cur tantas regiones
              barbarorum pedibus obiit, maria transmi Et ne nimium beatus est;
              Addidisti ad extremum etiam{" "}
              <Text style={styles.readMore}>Read More</Text>
            </Text>
          )}
          {activeTab === "curriculum" && (
            <Text style={styles.description}>
              {/* Replace this with your curriculum content */}
              Curriculum content goes here.
            </Text>
          )}
        </View>

        {/* Instructor Section */}
        <Text style={styles.sectionTitle}>Instructor</Text>
        <View style={styles.instructorContainer}>
          <Image
            source={{
              uri: "https://placehold.co/60x60/d1d1d1/ffffff?text=RJ",
            }}
            style={styles.instructorImage}
          />
          <View style={styles.instructorInfo}>
            <Text style={styles.instructorName}>Robert jr</Text>
            <Text style={styles.instructorTitle}>Graphic Design</Text>
          </View>
          <Feather name="message-circle" size={20} color="#202244" />
        </View>

        {/* What You'll Get Section */}
        <Text style={styles.sectionTitle}>What You'll Get</Text>
        <View style={styles.whatYoullGetContainer}>
          {benefits.map((item, index) => (
            <View key={index} style={styles.whatYoullGetItem}>
              {item.icon}
              <Text style={styles.whatYoullGetText}>{item.text}</Text>
            </View>
          ))}
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsHeader}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>SEE ALL</Text>
            <AntDesign name="right" size={14} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewAvatarContainer}>
              <Image
                source={{ uri: review.avatar }}
                style={styles.reviewAvatar}
              />
            </View>
            <View style={styles.reviewContent}>
              <View style={styles.reviewMeta}>
                <Text style={styles.reviewerName}>{review.name}</Text>
                <View style={styles.reviewRating}>
                  <AntDesign name="star" size={12} color="#FFC107" />
                  <Text style={styles.reviewRatingText}>{review.rating}</Text>
                </View>
              </View>
              <Text style={styles.reviewText}>{review.text}</Text>
              <View style={styles.reviewStats}>
                <AntDesign name="heart" size={14} color="#E53935" />
                <Text style={styles.reviewStatText}>{review.likes}</Text>
                <Text style={styles.reviewStatText}>{review.timeAgo}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Enrollment Button */}
      <View style={styles.enrollButtonContainer}>
        <TouchableOpacity style={styles.enrollButton}>
          <Text style={styles.enrollButtonText}>Enroll Course - 499/-</Text>
          <AntDesign name="arrowright" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
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
  },
  floatingPlayButton: {
    position: "absolute",
    top: -28,
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
  },
  categoryText: {
    fontSize: 13,
    color: "#202244",
    marginBottom: 8,
    marginTop: 10,
    fontFamily: "Inter-Regular", // Set font family
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
    fontFamily: "Inter-SemiBold", // Set font family
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 13,
    color: "#525252",
    fontFamily: "Inter-Regular", // Set font family
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
    fontFamily: "Inter-Regular", // Set font family
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0961F5",
    marginLeft: "auto",
    fontFamily: "Inter-Bold", // Set font family
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#EAF2FF",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#B3D4FC",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    backgroundColor: "#EAF2FF",
  },
  activeTab: {
    backgroundColor: "#F5F9FF",
  },
  tabText: {
    fontSize: 15,
    color: "#222",
    fontWeight: "500",
  },
  activeTabText: {
    fontSize: 15,
    color: "#222",
    fontWeight: "700",
  },
  tabDivider: {
    width: 1,
    backgroundColor: "#B3D4FC",
    height: "70%",
    alignSelf: "center",
  },
  description: {
    fontSize: 14,
    color: "#525252",
    lineHeight: 22,
    marginBottom: 24,
    fontFamily: "Inter-Regular", // Set font family
  },
  readMore: {
    color: "#0961F5",
    fontWeight: "600",
    fontFamily: "Inter-SemiBold", // Set font family
    textDecorationLine: "underline",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
    color: "#1F1F1F",
    fontFamily: "Inter-SemiBold", // Set font family
  },
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    marginBottom: 16,
  },
  instructorImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F1F1F",
    fontFamily: "Inter-SemiBold", // Set font family
  },
  instructorTitle: {
    fontSize: 13,
    color: "#202244",
    fontFamily: "Inter-Regular", // Set font family
  },
  whatYoullGetContainer: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    marginBottom: 16,
  },
  whatYoullGetItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  whatYoullGetText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#0B0F2F", // dark navy
    fontFamily: "Inter-SemiBold",
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  seeAllText: {
    color: "#007AFF",
    fontSize: 13,
    fontWeight: "500",
    marginRight: 4,
    fontFamily: "Inter-Medium", // Set font family
  },
  reviewCard: {
    flexDirection: "row",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  reviewAvatarContainer: {
    marginRight: 12,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewContent: {
    flex: 1,
  },
  reviewMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0B0F2F",
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#0961F5",
    backgroundColor: "#E8F1FF",
  },
  reviewRatingText: {
    marginLeft: 4,
    fontSize: 12,
    color: "##",
    fontFamily: "Inter-Regular", // Set font family
  },
  reviewText: {
    fontSize: 14,
    color: "#202244",
    lineHeight: 20,
    marginBottom: 10,
    fontFamily: "Inter-Regular", // Set font family
  },
  reviewStats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  reviewStatText: {
    marginLeft: 4,
    marginRight: 16,
    fontSize: 12,
    color: "#202244",
    fontFamily: "Inter-Regular", // Set font family
    fontWeight: "bold",
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
    elevation: 10,
  },
  enrollButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    marginRight: 10,
  },
});

export default CourseDetail;
