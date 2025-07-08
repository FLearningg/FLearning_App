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
  OnlineCourses: { filters?: Filters } | undefined;
  FilterOnlineCourses: {
    filters: Filters;
    onApplyFilters: (filters: Filters) => void;
  };
  PopularCourses: undefined;
  Home: undefined;
  Category: undefined;
  Search: undefined;
  CourseDetail: undefined;
  Profile: undefined;
  EditProfileScreen: undefined;
  EditPasswordScreen: undefined;
  MyCourses: undefined;
};