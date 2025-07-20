import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { Home, BookOpen, User, GraduationCap } from "lucide-react-native";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import OnlineCourseScreen from "../screens/courses/OnlineCourses";
import MyCoursesScreen from "../screens/MyCourses/MyCoursesScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ route }: { route: any }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#e5e5e5",
          paddingBottom: Platform.OS === "ios" ? 20 : 5,
          paddingTop: 5,
          height: Platform.OS === "ios" ? 80 : 60,
        },
        tabBarActiveTintColor: "#167f71",
        tabBarInactiveTintColor: "#a0a4ab",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen as any}
        initialParams={route.params}
        options={{
          tabBarLabel: "HOME",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="OnlineCourses"
        component={OnlineCourseScreen as any}
        initialParams={{ fromBottomTab: true }}
        options={{
          tabBarLabel: "ALL COURSES",
          tabBarIcon: ({ color, size }) => (
            <BookOpen color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyCoursesTab"
        component={MyCoursesScreen as any}
        initialParams={{ fromBottomTab: true }}
        options={{
          tabBarLabel: "MY COURSES",
          tabBarIcon: ({ color, size }) => (
            <GraduationCap color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen as any}
        initialParams={{ fromBottomTab: true }}
        options={{
          tabBarLabel: "PROFILE",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
