import React from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen/CategoryScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';

// Types
export type RootStackParamList = {
  Home: undefined;
  Category: undefined;
  Search: undefined;
};

// Navigation ref for external navigation
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Navigation functions
export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function resetToHome() {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  }
}

// Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

// Main Route Component
export const HomeRoutes: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 0 } },
            close: { animation: 'timing', config: { duration: 0 } },
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 