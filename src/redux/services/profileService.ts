// FLearning-App/src/services/profileService.ts
import apiClient from "./authService"; // import instance đã cấu hình sẵn

export const getProfile = async () => {
  const res = await apiClient.get("/profile");
  return res.data;
};

export const updateProfile = async (data: any) => {
  let headers: any = {};
  if (data instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  }
  const res = await apiClient.put("/profile", data, { headers });
  return res.data;
};

export const getEnrolledCourses = async () => {
  const res = await apiClient.get("/profile/enrolled-courses");
  return res.data;
};

export const getPurchaseHistory = async (page = 1, limit = 10) => {
  const res = await apiClient.get(
    `/profile/purchase-history?page=${page}&limit=${limit}`
  );
  return res.data;
};

// Kiểm tra xem user đã enroll course cụ thể hay chưa
export const checkCourseEnrolled = async (courseId: string) => {
  try {
    const enrolledCourses = await getEnrolledCourses();
    const isEnrolled = enrolledCourses.some(
      (course: any) => course._id === courseId || course.courseId === courseId
    );
    return { isEnrolled };
  } catch (error) {
    return { isEnrolled: false };
  }
};

export interface PurchaseHistoryItem {
  paymentId: string;
  amount: number;
  currency: string;
  status: string;
  type: string;
  description: string;
  gatewayTransactionId: string;
  createdAt: string;
  updatedAt: string;
  paymentMethod: string | null;
  paymentDate: string;
  course: {
    id: string;
    title: string;
    subTitle: string;
    thumbnail: string;
    price: number;
    rating: number;
    level: string;
    duration: string;
    language: string;
    category: string;
    createdAt: string;
  } | null;
  transaction: {
    gatewayTransactionId: string;
    status: string;
    type: string;
  };
}

export interface PurchaseHistoryResponse {
  success: boolean;
  message: string;
  data: PurchaseHistoryItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalTransactions: number;
    hasNext: boolean;
    hasPrev: boolean;
    totalPayments: number;
  };
}
