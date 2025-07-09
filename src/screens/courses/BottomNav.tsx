// BottomNav.tsx
import React, { memo } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import {
  Home,
  BookOpen,
  MessageSquare,
  CreditCard,
  User,
} from "lucide-react-native";
import { styles } from "../../../assets/styles/OnlineCourseStyles";
import { useNavigation, useRoute } from "@react-navigation/native";

const NAV_ITEMS = [
  { icon: Home, label: "HOME", route: "OnlineCourses" },
  { icon: BookOpen, label: "MY COURSES", route: "MyCourses" },
  { icon: MessageSquare, label: "INBOX", route: "INBOX" },
  { icon: CreditCard, label: "TRANSACTION", route: "TRANSACTION" },
  { icon: User, label: "PROFILE", route: "Profile" },
];

const BottomNav = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  return (
    <View style={styles.navbar}>
      {NAV_ITEMS.map(({ icon: Icon, label, route: routeName }) => {
        const isActive = route.name === routeName;
        return (
          <TouchableOpacity
            key={label}
            style={styles.navItem}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ selected: isActive }}
            onPress={() => routeName && navigation.navigate(routeName)}
          >
            <Icon color={isActive ? "#167f71" : "#a0a4ab"} size={24} />
            <Text
              style={[
                styles.navText,
                { color: isActive ? "#167f71" : "#a0a4ab" },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default memo(BottomNav);