import React, { useRef, useEffect, useState } from "react"; // Thêm useState
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av"; // Thêm AVPlaybackStatus
import { Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import { X } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { markLessonAsCompleted } from "../../redux/services/progressService";

type VideoPlayerModalProps = {
  isVisible: boolean;
  videoUrl: string;
  onClose: () => void;
  // 💡 1. Thêm prop mới để xử lý khi video đạt mốc thời gian
  onMarkComplete: () => Promise<void>;
};

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isVisible,
  videoUrl,
  onClose,
  onMarkComplete, // 💡 Nhận prop mới
}) => {
  const videoRef = useRef<Video>(null);
  const insets = useSafeAreaInsets();
  // 💡 2. State để đảm bảo chỉ gọi API một lần
  const [isMarked, setIsMarked] = useState(false);

  // Reset trạng thái khi video mới được mở
  useEffect(() => {
    if (isVisible) {
      setIsMarked(false);
    } else if (videoRef.current) {
      videoRef.current.stopAsync();
    }
  }, [isVisible]);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    // Nếu video không load được thì bỏ qua
    if (!status.isLoaded) return;

    // 💡 3. Kiểm tra nếu video đã chạy hơn 4s và chưa được đánh dấu
    if (status.positionMillis >= 4000 && !isMarked) {
      setIsMarked(true); // Đánh dấu là đã xử lý
      onMarkComplete(); // Gọi hàm callback từ component cha
    }

    // Tự động đóng khi xem xong
    if (status.didJustFinish) {
      onClose();
    }
  };

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
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate} // 💡 4. Gắn hàm xử lý
        />
        <TouchableOpacity
          style={[
            styles.closeButton,
            { top: insets.top + 10, right: insets.right + 20 },
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
