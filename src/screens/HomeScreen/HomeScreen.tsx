import React, { useEffect } from "react";
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
import { RouteProp, useFocusEffect } from "@react-navigation/native";
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
import { homeScreenStyles } from "../../../assets/styles/HomeScreen/HomeScreenStyles";
import { responsiveWidth } from "../../../assets/styles/utils/responsive";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { markNotificationAsRead } from "../../redux/services/notificationService";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
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

  const categories = [
    { id: "1", name: "3D Design", active: false },
    { id: "2", name: "Arts & Humanities", active: false },
    { id: "3", name: "Graphic Design", active: true },
  ];

  const popularCourses = [
    {
      id: "1",
      title: "Graphic Design Advanced",
      category: "Graphic Design",
      price: "850/-",
      rating: 4.2,
      students: "7838 Std",
      image: null,
    },
    {
      id: "2",
      title: "Advertisement Design",
      category: "Graphic Design",
      price: "400/-",
      rating: 4.8,
      students: "5234 Std",
      image: null,
    },
    {
      id: "3",
      title: "3D Modeling Fundamentals",
      category: "3D Design",
      price: "650/-",
      rating: 4.5,
      students: "6142 Std",
      image: null,
    },
    {
      id: "4",
      title: "Art History & Culture",
      category: "Arts & Humanities",
      price: "300/-",
      rating: 4.1,
      students: "4567 Std",
      image: null,
    },
  ];

  const filterTabs = [
    "All",
    "Graphic Design",
    "3D Design",
    "Arts & Humanities",
  ];
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
              <Text style={homeScreenStyles.greeting}>Hi, ALEX</Text>
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
            onFilterPress={() => console.log("Filter pressed")}
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
                  key={category.id}
                  style={[
                    homeScreenStyles.categoryItem,
                    category.active && homeScreenStyles.activeCategoryItem,
                  ]}
                >
                  <Text
                    style={[
                      homeScreenStyles.categoryText,
                      category.active && homeScreenStyles.activeCategoryText,
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
                    index === 1 && homeScreenStyles.activeFilterTab,
                  ]}
                  onPress={() => {
                    if (tab === "All") {
                      navigation.navigate("OnlineCourses");
                    }
                  }}
                >
                  <Text
                    style={[
                      homeScreenStyles.filterTabText,
                      index === 1 && homeScreenStyles.activeFilterTabText,
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
              {popularCourses.map((course) => (
                <TouchableOpacity
                  key={course.id}
                  style={homeScreenStyles.courseCard}
                  onPress={() =>
                    navigation.navigate("CourseDetail", {
                      courseId: "6857bd159375c0165721340d",
                      // courseId: "686d385d6aef0b860bdbdd5d",
                    })
                  }
                >
                  <View style={homeScreenStyles.courseImage}>
                    {/* Placeholder for course image */}
                  </View>
                  <TouchableOpacity style={homeScreenStyles.bookmarkButton}>
                    <Ionicons
                      name="bookmark-outline"
                      size={20}
                      color="#0961F5"
                    />
                  </TouchableOpacity>
                  <View style={homeScreenStyles.courseInfo}>
                    <Text style={homeScreenStyles.courseCategory}>
                      {course.category}
                    </Text>
                    <Text style={homeScreenStyles.courseTitle}>
                      {course.title}
                    </Text>
                    <View style={homeScreenStyles.courseStats}>
                      <Text style={homeScreenStyles.coursePrice}>
                        {course.price}
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
                        {course.students}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
