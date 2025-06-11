import React from "react";
import { Text, StyleSheet } from "react-native";

const CourseDetailAbout = () => {
  return (
    <Text style={styles.description}>
      Graphic Design now a popular profession graphic design by off your career
      about tantas regiones barbarorum pedibus obiit{"\n\n"}
      Graphic Design n a popular profession I Cur tantas regiones barbarorum
      pedibus obiit, maria transmi Et ne nimium beatus est; Addidisti ad
      extremum etiam <Text style={styles.readMore}>Read More</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    color: "#525252",
    lineHeight: 22,
    marginBottom: 24,
    fontFamily: "Inter-Regular",
  },
  readMore: {
    color: "#0961F5",
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    textDecorationLine: "underline",
  },
});

export default CourseDetailAbout;
