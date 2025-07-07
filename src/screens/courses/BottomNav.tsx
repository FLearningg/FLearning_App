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

const NAV_ITEMS = [
  { icon: Home, label: "HOME", active: true },
  { icon: BookOpen, label: "MY COURSES" },
  { icon: MessageSquare, label: "INBOX" },
  { icon: CreditCard, label: "TRANSACTION" },
  { icon: User, label: "PROFILE" },
];

const BottomNav = () => (
  <View style={styles.navbar}>
    {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
      <TouchableOpacity
        key={label}
        style={styles.navItem}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ selected: !!active }}
      >
        <Icon color={active ? "#167f71" : "#a0a4ab"} size={24} />
        <Text
          style={[styles.navText, { color: active ? "#167f71" : "#a0a4ab" }]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default memo(BottomNav);
