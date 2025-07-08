import apiClient from "./authService";

export interface User {
  id: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: any;
}

export interface UserProfileUpdate {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  [key: string]: any;
}

// Get all users (for search functionality)
export const getAllUsers = (page: number = 1, limit: number = 20) =>
  apiClient.get<User[]>(`/users?page=${page}&limit=${limit}`);

// Search users by name or username
export const searchUsers = (query: string, page: number = 1, limit: number = 20) =>
  apiClient.get<User[]>(
    `/user/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
  );

// Get user by ID
export const getUserById = (userId: string) => apiClient.get<User>(`/users/${userId}`);

// Get current user profile
export const getCurrentUserProfile = () => apiClient.get<User>("/user/profile");

// Update user profile
export const updateUserProfile = (profileData: UserProfileUpdate) =>
  apiClient.put<User>("/user/profile", profileData);

// Get user statistics
export const getUserStats = () => apiClient.get("/user/stats");