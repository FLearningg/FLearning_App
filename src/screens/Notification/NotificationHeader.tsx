import { Dimensions, Text, View } from "react-native";
import GoBackButton from "../../components/GoBackButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";

const { height } = Dimensions.get("window");

export default function NotificationHeader() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={{ marginTop: height * 0.03 }}>
      <GoBackButton
        title="Notifications"
        onPress={() => {
          navigation.goBack();
        }}
        backgroundColor="#F5F9FF"
      />
    </View>
  );
}
