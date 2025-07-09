import React from "react";
import { Text, StyleSheet } from "react-native";

// Import Course type
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

const CourseDetailAbout = ({ course }: { course?: Course | null }) => {
  return <Text style={styles.description}>{course?.subTitle || ""}</Text>;
};

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    color: "#525252",
    lineHeight: 22,
    marginBottom: 24,
    fontFamily: "Inter-Regular",
  },
});

export default CourseDetailAbout;
