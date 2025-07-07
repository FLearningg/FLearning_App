import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../store/authSlice';
import type { InternalAxiosRequestConfig } from 'axios';
// Định nghĩa kiểu cho user và các tham số API (có thể mở rộng tuỳ ý)
export interface RegisterUserData {
    email: string;
    password: string;
    [key: string]: any;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface PasswordData {
    oldPassword?: string;
    newPassword: string;
    [key: string]: any;
}

// Tạo một instance của axios với cấu hình chung
const apiClient = axios.create({
    baseURL: 'https://flearning-api-a5h6hbcphdcbhndv.southeastasia-01.azurewebsites.net/api',
    // baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});

// Interceptor 1: Can thiệp vào TRƯỚC KHI request được gửi đi
apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = await AsyncStorage.getItem('accessToken');
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor 2: Can thiệp vào SAU KHI nhận được response
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            console.log("Access Token hết hạn, đang thử làm mới...");

            try {
                const { data } = await apiClient.post('/auth/refresh-token');
                const { accessToken } = data;

                console.log("Làm mới Access Token thành công!");

                await AsyncStorage.setItem('accessToken', accessToken);

                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return apiClient(originalRequest);

            } catch (_error) {
                console.log("Refresh Token không hợp lệ. Đang đăng xuất người dùng...");

                store.dispatch(logout());
                // Nếu là React Native, bạn có thể dùng navigation để chuyển trang
                // hoặc Linking.openURL('your-login-screen-url');
                // window.location.href có thể không hoạt động trên mobile
                return Promise.reject(_error);
            }
        }

        return Promise.reject(error);
    }
);

// --- Export các hàm gọi API ---

// Auth Routes
export const registerUser = (userData: RegisterUserData) => apiClient.post('/auth/register', userData);
export const loginUser = (credentials: LoginCredentials) => apiClient.post('/auth/login', credentials);
export const verifyEmail = (token: string) => apiClient.get(`/auth/verify-email/${token}`);
export const logoutUser = () => apiClient.post('/auth/logout');
export const resendVerificationLink = (email: string) => apiClient.post('/auth/resend-verification', { email });
export const forgotPassword = (email: string) => apiClient.post('/auth/forgot-password', { email });
export const resetPassword = (token: string, newPassword: string) => apiClient.post(`/auth/reset-password/${token}`, { newPassword });

// User Routes
export const getUserProfile = () => apiClient.get('/user/profile');
export const setPassword = (passwordData: PasswordData) => apiClient.post('/user/set-password', passwordData);
export const changePassword = (passwordData: PasswordData) => apiClient.put('/user/change-password', passwordData);

export default apiClient;