import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const curriculumSections = [
  {
    title: "Section 01 - Introduction",
    duration: "25 Mins",
    lessons: [
      { number: "01", title: "Why Using Graphic De..", duration: "15 Mins" },
      { number: "02", title: "Setup Your Graphic De..", duration: "10 Mins" },
    ],
  },
  {
    title: "Section 02 - Advanced Topics",
    duration: "60 Mins",
    lessons: [
      { number: "03", title: "Color Theory", duration: "20 Mins" },
      { number: "04", title: "Typography Basics", duration: "15 Mins" },
      { number: "05", title: "Layout & Composition", duration: "15 Mins" },
      { number: "06", title: "Branding Essentials", duration: "10 Mins" },
    ],
  },
  {
    title: "Section 03 - Projects",
    duration: "30 Mins",
    lessons: [{ number: "07", title: "Final Project", duration: "30 Mins" }],
  },
];

const CourseDetailCurriculum = () => {
  const [expandedSections, setExpandedSections] = useState(new Set());

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      {curriculumSections.map((section, sIdx) => (
        <View key={section.title}>
          <TouchableOpacity
            onPress={() => toggleSection(sIdx)}
            style={styles.sectionHeader}
          >
            <Text
              style={styles.sectionTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {section.title}
            </Text>
            <View style={styles.sectionDurationContainer}>
              <Text style={styles.sectionDuration}>{section.duration}</Text>
            </View>
            <AntDesign
              name={expandedSections.has(sIdx) ? "up" : "down"}
              size={16}
              color="#0961F5"
            />
          </TouchableOpacity>
          {expandedSections.has(sIdx) && (
            <>
              {section.lessons.map((lesson) => (
                <View key={lesson.number} style={styles.lessonItem}>
                  <View style={styles.lessonNumberContainer}>
                    <Text style={styles.lessonNumber}>{lesson.number}</Text>
                  </View>
                  <View style={styles.lessonTextContainer}>
                    <Text
                      style={styles.lessonTitle}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {lesson.title}
                    </Text>
                  </View>
                  <View style={styles.lessonDurationContainer}>
                    <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                  </View>
                  <TouchableOpacity style={styles.playIcon}>
                    <AntDesign name="playcircleo" size={24} color="#0961F5" />
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    marginBottom: 10,
    gap: 8,
  },
  sectionTitle: {
    maxWidth: 350,
    flexShrink: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#1F1F1F",
    flexWrap: "wrap",
    fontFamily: "Inter-SemiBold",
  },
  sectionDurationContainer: {
    width: 80,
    alignItems: "flex-end",
  },
  sectionDuration: {
    fontSize: 14,
    color: "#202244",
    marginBottom: 15,
    fontWeight: "bold",
    alignItems: "flex-end",
    fontFamily: "Inter-Bold",
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  lessonNumberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  lessonNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    fontFamily: "Inter-Bold",
  },
  lessonTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Inter-SemiBold",
  },
  lessonDurationContainer: {
    width: 70,
    alignItems: "flex-end",
  },
  lessonDuration: {
    fontSize: 14,
    color: "#202244",
    fontWeight: "bold",
    textAlign: "right",
    fontFamily: "Inter-Bold",
  },
  playIcon: {
    marginLeft: 10,
  },
});

export default CourseDetailCurriculum;
