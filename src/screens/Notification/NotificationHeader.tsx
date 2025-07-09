import { Text, View } from "react-native";
import GoBackButton from "../../components/GoBackButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationHeader() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView>
      <GoBackButton
        title="Notifications"
        onPress={() => {
          navigation.goBack();
        }}
        backgroundColor="#F5F9FF"
      />
    </SafeAreaView>
  );
}
