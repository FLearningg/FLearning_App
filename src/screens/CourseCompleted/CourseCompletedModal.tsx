import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { styles } from '../../../assets/styles/CourseCompletedStyles';

interface CourseCompletedModalProps {
  visible: boolean;
  onClose: () => void;
  onBrowseNewCourse: () => void;
}

const CourseCompletedModal: React.FC<CourseCompletedModalProps> = ({
  visible,
  onClose,
  onBrowseNewCourse,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.courseCompletedOverlay}>
        <View style={styles.courseCompletedContainer}>
          {/* Decorative Elements */}
          <View style={styles.courseCompletedDecorativeElements}>
            <View style={[styles.courseCompletedStar, styles.courseCompletedYellowStar]} />
            <View style={[styles.courseCompletedLine, styles.courseCompletedBlackLine]} />
            <View style={[styles.courseCompletedLine, styles.courseCompletedTealLine]} />
            <View style={[styles.courseCompletedCircle, styles.courseCompletedOrangeCircle]} />
            <View style={[styles.courseCompletedCircle, styles.courseCompletedBrownCircle]} />
            <View style={[styles.courseCompletedTriangle, styles.courseCompletedTealTriangle]} />
            <View style={[styles.courseCompletedStar, styles.courseCompletedRedStar]} />
            <View style={[styles.courseCompletedCircle, styles.courseCompletedTealCircleSmall]} />
            <View style={[styles.courseCompletedTriangle, styles.courseCompletedBlueTriangle]} />
          </View>

          {/* Main Content */}
          <View style={styles.courseCompletedContent}>
            {/* Graduation Cap Icon */}
            <View style={styles.courseCompletedIconContainer}>
              <View style={styles.courseCompletedGraduationCap}>
                <View style={styles.courseCompletedCapBase} />
                <View style={styles.courseCompletedCapTop} />
                <View style={styles.courseCompletedCapTassel} />
              </View>
              <View style={styles.courseCompletedHeadphones}>
                <View style={styles.courseCompletedHeadphoneLeft} />
                <View style={styles.courseCompletedHeadphoneRight} />
                <View style={styles.courseCompletedHeadphoneBand} />
              </View>
            </View>

            {/* Title */}
            <Text style={styles.courseCompletedTitle}>Course Completed</Text>

            {/* Subtitle */}
            <Text style={styles.courseCompletedSubtitle}>
              Congratulation !!! You've just complete the course.
            </Text>

            {/* Browse New Course Button */}
            <TouchableOpacity
              style={styles.courseCompletedBrowseButton}
              onPress={onBrowseNewCourse}
              activeOpacity={0.8}
            >
              <Text style={styles.courseCompletedBrowseButtonText}>Browse New Course</Text>
              <View style={styles.courseCompletedArrowContainer}>
                <ArrowRight size={20} color="#0961F5" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CourseCompletedModal; 