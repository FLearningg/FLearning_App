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
