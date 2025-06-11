import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/NavigationType";
import { NavigationContainer } from "@react-navigation/native";
import Launching from "../components/Launching";
import LoginPage from "../components/authentication/LoginPage";
import StartPage from "../components/authentication/StartPage";
import SignUp from "../components/authentication/SignUp";
import FillProfile from "../components/authentication/FillProfile";
import FillProfileHeader from "../components/authentication/FillProfileHeader";

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
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default MainRouter;