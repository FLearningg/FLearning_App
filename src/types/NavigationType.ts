import { PurchaseHistoryItem } from './../redux/services/profileService';
import { Filters } from "../screens/courses/FilterComponents";

export type RootStackParamList = {
  Launching: undefined;
  Start: undefined;
  Login: undefined;
  SignUp: undefined;
  FillProfile: undefined;
  ForgotPassword: undefined;
  VerificationCode: undefined;
  CreateNewPassword: undefined;
  Congratulations: undefined;
  OnlineCourses:
    | { filters?: Filters; fromBottomTab?: boolean; searchQuery?: string }
    | undefined;
  FilterOnlineCourses: {
    filters: Filters;
    searchQuery?: string;
  };
  PopularCourses: undefined;
  Home: undefined;
  Category: undefined;
  Search: undefined;
  CourseDetail: { courseId: string };
  Profile: { fromBottomTab?: boolean } | undefined;
  EditProfileScreen: undefined;
  EditPasswordScreen: undefined;
  Notification: undefined;
  MyCourses: { fromBottomTab?: boolean } | undefined;
  Cart: { courseId: string };
  Progress: { courseId: string; status: "Completed" | "Ongoing" };
  MainTabs: { filters?: Filters } | undefined;
  ERecipe: { transactionId?: string; purchaseData?: PurchaseHistoryItem };
};

export type MainTabsParamList = {
  Home: undefined;
  OnlineCourses: { fromBottomTab?: boolean } | undefined;
  MyCoursesTab: { fromBottomTab?: boolean } | undefined;
  ProfileTab: { fromBottomTab?: boolean } | undefined;
};
