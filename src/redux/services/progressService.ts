import apiClient from "./authService";

// Types for progress API responses
export interface CourseProgress {
  courseId: string;
  courseTitle: string;
  courseThumbnail?: string;
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
  completedDate?: string;
  remainingLessons?: number;
  enrollmentDate?: string;
  lastUpdated?: string;
}

export interface ProgressApiResponse {
  success: boolean;
  data: CourseProgress[];
  count?: number;
  message?: string;
}

export interface SingleCourseProgressResponse {
  success: boolean;
  data: {
    courseId: string;
    courseTitle: string;
    completedLessons: number;
    totalLessons: number;
    progressPercentage: number;
  };
}

// Simple test function to check if progress API works
export const testProgressAPI = async () => {
  try {
    const response = await apiClient.get('/progress/completed');
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// Progress API functions
export const getAllCoursesProgress = () =>
  apiClient.get<ProgressApiResponse>("/progress");

export const getCompletedCourses = () =>
  apiClient.get<ProgressApiResponse>("/progress/completed");

export const getIncompleteCourses = () =>
  apiClient.get<ProgressApiResponse>("/progress/incomplete");

export const getCourseProgress = (courseId: string) =>
  apiClient.get<SingleCourseProgressResponse>(`/progress/${courseId}`);

export const markLessonAsCompleted = async (courseId: string, lessonId: string) => {
  const res = await apiClient.post(
    `/progress/${courseId}/lessons/${lessonId}/complete`
  );
  return res.data;
};

export default {
  testProgressAPI,
  getAllCoursesProgress,
  getCompletedCourses,
  getIncompleteCourses,
  getCourseProgress,
}; 