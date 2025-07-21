import React, { use, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Platform,
  BackHandler,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/NavigationType";
import SearchBar from "../../components/SearchBar/SearchBar";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}
interface PopularCourse {
  _id: string;
  title: string;
  subTitle: string;
  message: {
    welcome: string;
    congrats: string;
  };
  detail: {
    description: string;
    willLearn: string[];
    targetAudience: string[];
    requirement: string[];
  };
  materials: string[];
  studentsEnrolled: string[];
  thumbnail: string;
  trailer: string;
  price: number;
  discountId: {
    _id: string;
    discountCode: string;
    description: string;
    category: string;
    typee: string;
    value: number;
    usage: number;
    usageLimit: number;
    status: string;
    minimumOrder: number;
    maximumDiscount: number;
    startDate: string;
    endDate: string;
  };
  rating: number;
  level: string;
  duration: string;
  language: string;
  subtitleLanguage: string | null;
  sections: {
    _id: string;
    name: string;
    courseId: string;
    lessons: string[];
    order: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
  categoryIds: {
    _id: string;
    name: string;
    icon: string;
  }[];
  studentsCount: number;
}

import { homeScreenStyles } from "../../../assets/styles/HomeScreen/HomeScreenStyles";
import { responsiveWidth } from "../../../assets/styles/utils/responsive";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { markNotificationAsRead } from "../../redux/services/notificationService";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/services/categoryService";
import { getPopularCourses } from "../../redux/services/courseService";
import LoadingComponent from "../../components/Loading/LoadingComponent";
import { INITIAL_FILTERS } from "../courses/FilterComponents";

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const markAllAsRead = async () => {
    try {
      await markNotificationAsRead(currentUser?._id, dispatch);
      navigation.navigate("Notification");
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };
  // Fetch categories from Redux store
  const categories = useSelector(
    (state: RootState) => state.categories.getCategories.categories
  );
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await getCategories(dispatch);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [dispatch]);
  // Fetch popular courses
  const [popularCourses, setPopularCourses] = useState<PopularCourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);
    getPopularCourses()
      .then((courses) => {
        // setPopularCourses(courses);
        setPopularCourses(Array.isArray(courses) ? courses : []);
        setError(null);
      })
      .catch((error) => {
        setError(
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Error fetching popular courses"
        );
        setPopularCourses([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);
  const filteredCourses =
    activeTab === "All"
      ? popularCourses
      : popularCourses.filter(
        (course) =>
          Array.isArray(course.categoryIds) &&
          course.categoryIds.length > 0 &&
          course.categoryIds[0].name === activeTab
      );

  // Prevent back navigation when on Home screen
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Return true to prevent default back action
        return true;
      };

      // Add event listener for hardware back button on Android
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );
  // Also set navigation options to disable gesture back on iOS
  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
    });
  }, [navigation]);

  const filterTabs = [
    "All",
    ...Array.from(
      new Set(
        popularCourses
          .flatMap(course =>
            Array.isArray(course.categoryIds)
              ? course.categoryIds.map(cat => cat.name).filter(Boolean)
              : []
          )
      )
    ),
  ];
  const navigateToFilter = () => {
    navigation.navigate("FilterOnlineCourses", {
      filters: INITIAL_FILTERS,
    });
  };
  return (
    <View style={homeScreenStyles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Platform.OS === "android" ? "#f8f9fa" : undefined}
        translucent={false}
      />

      <SafeAreaView style={homeScreenStyles.safeArea}>
        {Platform.OS === "android" && (
          <View style={homeScreenStyles.androidStatusBarSpacer} />
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={homeScreenStyles.scrollContent}
          bounces={Platform.OS === "ios"}
          overScrollMode={Platform.OS === "android" ? "never" : "auto"}
        >
          {/* Header - Inside ScrollView so it scrolls with content */}
          <View style={homeScreenStyles.header}>
            <View style={homeScreenStyles.headerTextContainer}>
              <Text style={homeScreenStyles.greeting}>
                Hi, {currentUser?.firstName} {currentUser?.lastName}
              </Text>
              <Text style={homeScreenStyles.subGreeting}>
                What Would you like to learn Today?
              </Text>
              <Text style={homeScreenStyles.searchHint}>Search Below.</Text>
            </View>
            <TouchableOpacity
              style={homeScreenStyles.notificationButton}
              onPress={markAllAsRead}
            >
              <Image
                source={require("../../../assets/images/NOTIFICATIONS.jpg")}
                style={homeScreenStyles.notificationIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {/* Search Bar */}
          <SearchBar
            onFilterPress={navigateToFilter}
            onSearchPress={() => navigation.navigate("Search")}
            onChangeText={(text) => console.log("Search text:", text)}
          />

          {/* Promotional Banner */}
          <View style={homeScreenStyles.promoBanner}>
            <View style={homeScreenStyles.promoContent}>
              <Text style={homeScreenStyles.promoDiscount}>25% OFF*</Text>
              <Text style={homeScreenStyles.promoTitle}>Today's Special</Text>
              <Text style={homeScreenStyles.promoText}>
                Get a Discount for Every
              </Text>
              <Text style={homeScreenStyles.promoText}>
                Course Order only Valid for
              </Text>
              <Text style={homeScreenStyles.promoText}>today!</Text>
              <View style={homeScreenStyles.promoDots}>
                <View
                  style={[homeScreenStyles.dot, homeScreenStyles.activeDot]}
                />
                <View style={homeScreenStyles.dot} />
                <View style={homeScreenStyles.dot} />
              </View>
            </View>
          </View>

          {/* Categories */}
          <View style={homeScreenStyles.section}>
            <View style={homeScreenStyles.sectionHeader}>
              <Text style={homeScreenStyles.sectionTitle}>Categories</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Category")}>
                <Text style={homeScreenStyles.seeAll}>SEE ALL</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={homeScreenStyles.categoriesContainer}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category._id}
                  style={[
                    homeScreenStyles.categoryItem,
                    activeCategoryId === category._id &&
                    homeScreenStyles.activeCategoryItem,
                  ]}
                  onPress={() => {
                    setActiveCategoryId(category._id);
                    navigation.navigate("OnlineCourses", {
                      filters: {
                        ...INITIAL_FILTERS,
                        subCategories: {
                          ...INITIAL_FILTERS.subCategories,
                          [category.name]: true,
                        },
                      },
                    });
                  }}
                >
                  <Text
                    style={[
                      homeScreenStyles.categoryText,
                      activeCategoryId === category._id &&
                      homeScreenStyles.activeCategoryText,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Popular Courses */}
          <View style={homeScreenStyles.section}>
            <View style={homeScreenStyles.sectionHeader}>
              <Text style={homeScreenStyles.sectionTitle}>Popular Courses</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("PopularCourses")}
              >
                <Text style={homeScreenStyles.seeAll}>SEE ALL</Text>
              </TouchableOpacity>
            </View>

            {/* Filter Tabs */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={homeScreenStyles.filterTabsContainer}
            >
              {filterTabs.map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    homeScreenStyles.filterTab,
                    activeTab === tab && homeScreenStyles.activeFilterTab,
                  ]}
                  onPress={() => {
                    if (tab === "All") {
                      navigation.navigate("MainTabs");
                    }
                    setActiveTab(tab);
                  }}
                >
                  <Text
                    style={[
                      homeScreenStyles.filterTabText,
                      activeTab === tab && homeScreenStyles.activeFilterTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {/* Courses List */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={homeScreenStyles.coursesScrollContainer}
            >
              {filteredCourses?.map((course) => {
                let finalPrice = course.price;
                if (course.discountId) {
                  if (course.discountId.typee === "fixedAmount") {
                    finalPrice = Math.max(
                      0,
                      course.price - course.discountId.value
                    );
                  } else if (course.discountId.typee === "percent") {
                    finalPrice = Math.max(
                      0,
                      course.price * (1 - course.discountId.value / 100)
                    );
                  }
                }
                return (
                  <TouchableOpacity
                    key={course._id}
                    style={homeScreenStyles.courseCard}
                    onPress={() =>
                      navigation.navigate("CourseDetail", {
                        courseId: course._id,
                      })
                    }
                  >
                    <View style={homeScreenStyles.courseImage}>
                      {/* Placeholder for course image */}
                      <Image
                        source={{ uri: course.thumbnail }}
                        style={homeScreenStyles.courseImage}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={homeScreenStyles.courseInfo}>
                      <Text style={homeScreenStyles.courseCategory}>
                        {course.categoryIds?.[0]?.name || "Uncategorized"}
                      </Text>
                      <Text
                        style={homeScreenStyles.courseTitle}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {course.title}
                      </Text>
                      <View style={homeScreenStyles.courseStats}>
                        <Text style={homeScreenStyles.coursePrice}>
                          {/* {course.price} */}
                          {finalPrice.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                          $
                          {course.discountId && (
                            <Text>
                              {" / "}
                              <Text
                                style={{
                                  textDecorationLine: "line-through",
                                  color: "#888",
                                  fontSize: responsiveWidth(12),
                                }}
                              >
                                {course.price.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                                $
                              </Text>
                            </Text>
                          )}
                        </Text>
                        <View style={homeScreenStyles.ratingContainer}>
                          <Ionicons
                            name="star"
                            size={responsiveWidth(14)}
                            color="#FFD700"
                          />
                          <Text style={homeScreenStyles.rating}>
                            {course.rating}
                          </Text>
                        </View>
                        <Text style={homeScreenStyles.students}>
                          {course.studentsCount} Std
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
