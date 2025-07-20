import React, { useRef, useEffect } from "react";
import { Video, ResizeMode } from "expo-av";
import { Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import { X } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type VideoPlayerModalProps = {
  isVisible: boolean;
  videoUrl: string;
  onClose: () => void;
};

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isVisible,
  videoUrl,
  onClose,
}) => {
  const videoRef = useRef<Video>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!isVisible && videoRef.current) {
      videoRef.current.stopAsync();
    }
  }, [isVisible]);

  if (!videoUrl) return null;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
      supportedOrientations={["portrait", "landscape"]}
    >
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          style={styles.videoPlayer}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded && status.didJustFinish) {
              onClose();
            }
          }}
        />
        <TouchableOpacity
          style={[
            styles.closeButton,
            {
              top: insets.top + 10,
              right: insets.right + 20,
            },
          ]}
          onPress={onClose}
        >
          <X size={30} color="white" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  videoPlayer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  closeButton: {
    position: "absolute",
    zIndex: 1,
    padding: 5,
  },
});

export default VideoPlayerModal;
