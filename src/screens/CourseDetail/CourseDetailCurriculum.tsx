import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";

// Types for API response
interface Lesson {
  _id: string;
  title: string;
  duration?: string;
  videoUrl?: string;
}
interface Section {
  _id: string;
  title: string;
  lessons: Lesson[];
  duration?: string;
  name?: string;
}

const curriculumSections: Section[] = [];

const CourseDetailCurriculum = ({ 
  sections, 
  isEnrolled = false 
}: { 
  sections?: Section[]; 
  isEnrolled?: boolean; 
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set()
  );
  const [showLessonVideo, setShowLessonVideo] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const data = sections && sections.length > 0 ? sections : curriculumSections;

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

  // Function to check if lesson is unlocked
  const isLessonUnlocked = (sectionIndex: number, lessonIndex: number) => {
    // Only first lesson of first section is unlocked for preview
    return sectionIndex === 0 && lessonIndex === 0;
  };

  const playLessonVideo = (
    lesson: Lesson,
    sectionIndex: number,
    lessonIndex: number
  ) => {
    if (!isLessonUnlocked(sectionIndex, lessonIndex)) {
      // Show alert or toast that user needs to enroll
      return;
    }
    setCurrentLesson(lesson);
    setShowLessonVideo(true);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      {data.map((section, sIdx) => (
        <View key={section._id || section.title}>
          <TouchableOpacity
            onPress={() => toggleSection(sIdx)}
            style={styles.sectionHeader}
          >
            <Text
              style={styles.sectionTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {section.title || section.name}
            </Text>
            <View style={styles.sectionDurationContainer}>
              <Text style={styles.sectionDuration}>
                {section.duration || ""}
              </Text>
            </View>
            <AntDesign
              name={expandedSections.has(sIdx) ? "up" : "down"}
              size={16}
              color="#0961F5"
            />
          </TouchableOpacity>
          {expandedSections.has(sIdx) && (
            <>
              {section.lessons.map((lesson, lIdx) => {
                const isUnlocked = isLessonUnlocked(sIdx, lIdx);
                return (
                  <View
                    key={lesson._id}
                    style={[
                      styles.lessonItem,
                      !isUnlocked && styles.lockedLessonItem,
                    ]}
                  >
                    <View
                      style={[
                        styles.lessonNumberContainer,
                        !isUnlocked && styles.lockedLessonNumberContainer,
                      ]}
                    >
                      <Image
                        source={require("../../../assets/images/LOGO.png")}
                        style={{
                          width: 32,
                          height: 32,
                          resizeMode: "contain",
                          opacity: isUnlocked ? 1 : 0.3,
                        }}
                      />
                    </View>
                    <View style={styles.lessonTextContainer}>
                      <Text
                        style={[
                          styles.lessonTitle,
                          !isUnlocked && styles.lockedLessonTitle,
                        ]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {lesson.title}
                      </Text>
                      {!isUnlocked && (
                        <Text style={styles.lockedText}>
                          {isEnrolled 
                            ? "Go to course to watch full" 
                            : "Enroll to unlock this lesson"
                          }
                        </Text>
                      )}
                    </View>
                    <View style={styles.lessonDurationContainer}>
                      <Text
                        style={[
                          styles.lessonDuration,
                          !isUnlocked && styles.lockedLessonDuration,
                        ]}
                      >
                        {lesson.duration || ""}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.playIcon,
                        !isUnlocked && styles.lockedPlayIcon,
                      ]}
                      onPress={() => playLessonVideo(lesson, sIdx, lIdx)}
                      disabled={!isUnlocked}
                    >
                      {isUnlocked ? (
                        <AntDesign
                          name="playcircleo"
                          size={24}
                          color="#0961F5"
                        />
                      ) : (
                        <AntDesign name="lock" size={24} color="#CCCCCC" />
                      )}
                    </TouchableOpacity>
                  </View>
                );
              })}
            </>
          )}
        </View>
      ))}

      {/* Modal player for lesson videos */}
      <Modal
        visible={showLessonVideo}
        animationType="slide"
        onRequestClose={() => setShowLessonVideo(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            justifyContent: "center",
          }}
        >
          {currentLesson?.videoUrl && (
            <Video
              source={{ uri: currentLesson.videoUrl }}
              style={{ width: "100%", height: 300 }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay
            />
          )}
          <TouchableOpacity
            onPress={() => setShowLessonVideo(false)}
            style={{ position: "absolute", top: 40, right: 20 }}
          >
            <AntDesign name="close" size={32} color="#FFF" />
          </TouchableOpacity>

          {/* Lesson info overlay */}
          <View
            style={{ position: "absolute", bottom: 60, left: 20, right: 20 }}
          >
            <Text
              style={{
                color: "#FFF",
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              {currentLesson?.title}
            </Text>
            <Text style={{ color: "#FFF", fontSize: 14, opacity: 0.8 }}>
              Duration: {currentLesson?.duration || "N/A"}
            </Text>
          </View>
        </View>
      </Modal>
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
  lockedLessonItem: {
    opacity: 0.9,
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
  lockedLessonNumberContainer: {
    opacity: 0.3,
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
  lockedLessonTitle: {
    color: "#CCCCCC",
  },
  lockedText: {
    fontSize: 12,
    color: "#CCCCCC",
    marginTop: 4,
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
  lockedLessonDuration: {
    color: "#CCCCCC",
  },
  playIcon: {
    marginLeft: 10,
  },
  lockedPlayIcon: {
    opacity: 0.3,
  },
});

export default CourseDetailCurriculum;
