import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/NavigationType";
import { NavigationContainer } from "@react-navigation/native";
import Launching from "../components/Launching";
import LoginPage from "../screens/authentication/LoginPage";
import StartPage from "../screens/authentication/StartPage";
import SignUp from "../screens/authentication/SignUp";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen/ForgotPasswordScreen";
import VerificationCodeScreen from "../screens/ForgotPasswordScreen/VerificationCodeScreen";
import CreateNewPasswordScreen from "../screens/ForgotPasswordScreen/CreateNewPasswordScreen";
import CongratulationsScreen from "../screens/ForgotPasswordScreen/CongratulationsScreen";
import OnlineCourseScreen from "../screens/courses/OnlineCourses";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen/CategoryScreen";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import CourseDetail from "../screens/CourseDetail/CourseDetail";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";
import EditPasswordScreen from "../screens/Profile/EditPasswordScreen";
import NotificationScreen from "../screens/Notification/NotificationScreen";
import MyCoursesScreen from "../screens/MyCourses/MyCoursesScreen";
import Cart from "../screens/Cart/Cart";
import Progress from "../screens/Progress/Progress";
import BottomTabNavigator from "./BottomTabNavigator";
import FilterScreen from "../screens/courses/FilterComponents";
import ERecipeScreen from "../screens/ERecipe/ERecipeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const MainRouter: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Launching">
        <Stack.Screen
          name="Launching"
          component={Launching}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Start"
          component={StartPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="FillProfile" component={FillProfile} options={{ header: () => (<FillProfileHeader />) }} /> bỏ màn này*/}
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerificationCode"
          component={VerificationCodeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateNewPassword"
          component={CreateNewPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Congratulations"
          component={CongratulationsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{ headerShown: false }}
        />
        {/* Main Tab Navigator - This should be the main screen */}
        <Stack.Screen
          name="MainTabs"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />

        {/* Other standalone screens */}
        <Stack.Screen
          name="OnlineCourses"
          component={OnlineCourseScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CourseDetail"
          component={CourseDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{ headerShown: false, title: "Edit Profile" }}
        />
        <Stack.Screen
          name="EditPasswordScreen"
          component={EditPasswordScreen}
          options={{ headerShown: true, title: "Change Password" }}
        />
        <Stack.Screen
          name="Progress"
          component={Progress}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FilterOnlineCourses"
          component={FilterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ERecipe"
          component={ERecipeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainRouter;
