import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/NavigationType";
import { NavigationContainer } from "@react-navigation/native";
import Launching from "../components/Launching";
import LoginPage from "../components/authentication/LoginPage";
import StartPage from "../components/authentication/StartPage";
import SignUp from "../components/authentication/SignUp";
import FillProfile from "../components/authentication/FillProfile";
import FillProfileHeader from "../components/authentication/FillProfileHeader";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen/ForgotPasswordScreen";
import VerificationCodeScreen from "../screens/ForgotPasswordScreen/VerificationCodeScreen";
import CreateNewPasswordScreen from "../screens/ForgotPasswordScreen/CreateNewPasswordScreen";
import CongratulationsScreen from "../screens/ForgotPasswordScreen/CongratulationsScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen/CategoryScreen";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import CourseDetail from "../screens/CourseDetail/CourseDetail";

const Stack = createNativeStackNavigator<RootStackParamList>();
const MainRouter: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Launching">
                <Stack.Screen name="Launching" component={Launching} options={{ headerShown: false }}/>
                <Stack.Screen name="Start" component={StartPage} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name="FillProfile" component={FillProfile} options={{ header: () => (<FillProfileHeader />) }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
                <Stack.Screen name="VerificationCode" component={VerificationCodeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Congratulations" component={CongratulationsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Category" component={CategoryScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CourseDetail" component={CourseDetail} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default MainRouter;