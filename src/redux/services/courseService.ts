import apiClient from "./authService";

// Lấy tất cả khoá học
export const getCourses = async () => {
  const res = await apiClient.get(`/courses`);
  return res.data;
};
// Lấy tất cả khoá học bán chạy
export const getBestSelling = async () => {
  const res = await apiClient.get(`/courses/top-selling`);
  return res.data;
};

// Lấy tất cả thể loại khoá học
export const getCategories = async () => {
  const res = await apiClient.get(`/categories/top`);
  return res.data;
};

// Lấy danh sách khoá học nổi bật
export const getPopularCourses = async () => {
  const response = await apiClient.get(`courses/top-selling?limit=5`);
  return response.data;
};
// Lấy chi tiết khoá học
export const getCourseDetail = async (courseId: string) => {
  const res = await apiClient.get(`/courses/${courseId}`);
  return res.data;
};

// Lấy thông tin rằng user đã học khoá học hay chưa
export const getCourseProgress = async (courseId: string) => {
  const res = await apiClient.get(`/progress/${courseId}`);
  return res.data;
};


// Lấy khoá học liên quan
export const getRelatedCourses = async (courseId: string) => {
  const res = await apiClient.get(`/courses/${courseId}/related`);
  return res.data;
};

// Lấy chi tiết bài học (cần token)
export const getLessonDetail = async (
  courseId: string,
  lessonId: string,
  token?: string // token không cần thiết vì apiClient đã tự thêm
) => {
  const res = await apiClient.get(`/courses/${courseId}/lessons/${lessonId}`);
  return res.data;
};

// Lấy tất cả bình luận của bài học (cần token)
export const getLessonComments = async (
  courseId: string,
  lessonId: string,
  token?: string
) => {
  const res = await apiClient.get(
    `/courses/${courseId}/lessons/${lessonId}/comments`
  );
  return res.data;
};

// Thêm bình luận vào bài học (cần token)
export const addLessonComment = async (
  courseId: string,
  lessonId: string,
  content: string,
  token?: string
) => {
  const res = await apiClient.post(
    `/courses/${courseId}/lessons/${lessonId}/comments`,
    { content }
  );
  return res.data;
};

// Xoá bình luận (cần token)
export const deleteLessonComment = async (
  courseId: string,
  lessonId: string,
  commentId: string,
  token?: string
) => {
  const res = await apiClient.delete(
    `/courses/${courseId}/lessons/${lessonId}/comments/${commentId}`
  );
  return res.data;
};

// Lấy tất cả feedback của khoá học
export const getCourseFeedbacks = async (courseId: string) => {
  const res = await apiClient.get(`/courses/${courseId}/feedback`);
  return res.data;
};

// Thêm feedback cho khoá học (cần token)
export const addCourseFeedback = async (
  courseId: string,
  content: string,
  rateStar: number,
  token?: string
) => {
  const res = await apiClient.post(`/courses/${courseId}/feedback`, {
    content,
    rateStar,
  });
  return res.data;
};

// Xoá feedback (cần token)
export const deleteCourseFeedback = async (
  courseId: string,
  feedbackId: string,
  token?: string
) => {
  const res = await apiClient.delete(
    `/courses/${courseId}/feedback/${feedbackId}`
  );
  return res.data;
};

// Cập nhật feedback (cần token)
export const updateCourseFeedback = async (
  courseId: string,
  feedbackId: string,
  content: string,
  rateStar: number,
  token?: string
) => {
  const res = await apiClient.put(
    `/courses/${courseId}/feedback/${feedbackId}`,
    {
      content,
      rateStar,
    }
  );
  return res.data;
};

//Enrolls a user in one or more courses.
export const enrollInCourses = async (userId: string, courseIds: string[]) => {
  if (!userId || !courseIds || courseIds.length === 0) {
    const errorMessage =
      "User ID and a list of course IDs are required for enrollment.";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const payload = { userId, courseIds };

  try {
    const response = await apiClient.post("/courses/enroll-course", payload);
    return response.data;
  } catch (error: unknown) {
    console.error("Error during course enrollment:", error);
    let message = "Failed to enroll user in courses";
    if (typeof error === "object" && error !== null) {
      if ("response" in error && typeof (error as any).response?.data?.message === "string") {
        message = (error as any).response.data.message;
      } else if ("message" in error && typeof (error as any).message === "string") {
        message = (error as any).message;
      }
    }
    throw new Error(message);
  }
};
