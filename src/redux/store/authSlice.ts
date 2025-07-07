import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  registerUser as registerApi,
  loginUser as loginApi,
  logoutUser as logoutApi,
} from "../services/authService";
// import {
//   updateUserProfile as updateProfileApi,
//   getCurrentUserProfile as getUserProfile
// } from "../services/userService";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  [key: string]: any;
}

export interface AuthState {
  currentUser: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: any;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface ErrorPayload {
  message: string;
  status?: number;
  errorCode?: string;
}

// Khởi tạo state ban đầu (không lấy từ AsyncStorage vì bất đồng bộ)
const initialState: AuthState = {
  currentUser: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async Thunk cho việc đăng ký
export const registerUser = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorPayload }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await registerApi(userData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

// Async Thunk cho việc đăng nhập
export const loginUser = createAsyncThunk<
  LoginResponse,
  any,
  { rejectValue: ErrorPayload }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginApi(credentials);
    // Lưu vào AsyncStorage
    // Chỉ lưu vào AsyncStorage nếu remember là true
    if (credentials.remember) {
      await AsyncStorage.setItem("currentUser", JSON.stringify(response.data.user));
      await AsyncStorage.setItem("accessToken", response.data.accessToken);
    } else {
      await AsyncStorage.removeItem("currentUser");
      await AsyncStorage.removeItem("accessToken");
    }
    return response.data;
  } catch (error: any) {
    const errorPayload: ErrorPayload = {
      message: error.response?.data?.message || "Lỗi không xác định",
      status: error.response?.status,
      errorCode: error.response?.data?.errorCode,
    };
    return rejectWithValue(errorPayload);
  }
});

// export const updateUserProfile = createAsyncThunk<
//   User,
//   any,
//   { rejectValue: ErrorPayload }
// >("auth/updateProfile", async (profileData, { rejectWithValue }) => {
//   try {
//     const response = await updateProfileApi(profileData);
//     await AsyncStorage.setItem("currentUser", JSON.stringify(response.data));
//     return response.data;
//   } catch (error: any) {
//     const errorPayload: ErrorPayload = {
//       message: error.response?.data?.message || "Cập nhật thất bại",
//       status: error.response?.status,
//     };
//     return rejectWithValue(errorPayload);
//   }
// });

// export const fetchCurrentUser = createAsyncThunk<
//   User,
//   void,
//   { rejectValue: ErrorPayload }
// >("auth/fetchCurrentUser", async (_, { rejectWithValue }) => {
//   try {
//     const response = await getUserProfile();
//     await AsyncStorage.setItem("currentUser", JSON.stringify(response.data));
//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data);
//   }
// });

// Thunk để khởi tạo state từ AsyncStorage khi app khởi động
export const loadAuthFromStorage = createAsyncThunk<
  { user: User | null; token: string | null },
  void
>("auth/loadAuthFromStorage", async () => {
  const userStr = await AsyncStorage.getItem("currentUser");
  const token = await AsyncStorage.getItem("accessToken");
  return {
    user: userStr ? (JSON.parse(userStr) as User) : null,
    token: token || null,
  };
});

// Tạo Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      AsyncStorage.removeItem("currentUser");
      AsyncStorage.removeItem("accessToken");
      state.currentUser = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      logoutApi().catch((err: any) => console.error("API logout failed", err));
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state: AuthState) => {
      state.isLoading = true;
      state.error = null;
    };
    const handleFulfilled = (
      state: AuthState,
      action: PayloadAction<LoginResponse>
    ) => {
      state.isLoading = false;
      state.currentUser = action.payload.user;
      state.token = action.payload.accessToken;
      state.isAuthenticated = true;
    };
    const handleRejected = (
      state: AuthState,
      action: { payload: ErrorPayload | undefined }
    ) => {
      state.isLoading = false;
      state.error = action.payload ?? { message: "Unknown error" };
    };

    builder
      // Xử lý Login
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleFulfilled)
      .addCase(loginUser.rejected, handleRejected)
      // Xử lý Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //   .addCase(updateUserProfile.pending, (state) => {
      //     state.isLoading = true;
      //   })
      //   .addCase(updateUserProfile.fulfilled, (state, action) => {
      //     state.isLoading = false;
      //     state.currentUser = action.payload;
      //   })
      //   .addCase(updateUserProfile.rejected, (state, action) => {
      //     state.isLoading = false;
      //     state.error = action.payload;
      //   })
      //   .addCase(fetchCurrentUser.fulfilled, (state, action) => {
      //     state.currentUser = action.payload;
      //   })
      //   .addCase(fetchCurrentUser.rejected, (state, action) => {
      //     console.error("Failed to fetch current user:", action.payload);
      //   })
      // Load từ AsyncStorage khi app khởi động
      .addCase(loadAuthFromStorage.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = !!action.payload.token;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
