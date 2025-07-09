import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getCompletedCourses,
  getIncompleteCourses,
  CourseProgress,
  ProgressApiResponse,
} from "../services/progressService";

// State interface
interface ProgressState {
  completedCourses: CourseProgress[];
  incompleteCourses: CourseProgress[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProgressState = {
  completedCourses: [],
  incompleteCourses: [],
  loading: false,
  error: null,
};

// Error type for better typing
interface ErrorPayload {
  message: string;
  status?: number;
  errorCode?: string;
}

// Async thunks
export const fetchCompletedCourses = createAsyncThunk<
  CourseProgress[],
  void,
  { rejectValue: ErrorPayload }
>("progress/fetchCompletedCourses", async (_, { rejectWithValue }) => {
  try {
    const response = await getCompletedCourses();
    return response.data.data;
  } catch (error: any) {
    const errorPayload: ErrorPayload = {
      message:
        error.response?.data?.message || "Failed to fetch completed courses",
      status: error.response?.status,
      errorCode: error.response?.data?.errorCode,
    };
    return rejectWithValue(errorPayload);
  }
});

export const fetchIncompleteCourses = createAsyncThunk<
  CourseProgress[],
  void,
  { rejectValue: ErrorPayload }
>("progress/fetchIncompleteCourses", async (_, { rejectWithValue }) => {
  try {
    const response = await getIncompleteCourses();
    return response.data.data;
  } catch (error: any) {
    const errorPayload: ErrorPayload = {
      message:
        error.response?.data?.message || "Failed to fetch incomplete courses",
      status: error.response?.status,
      errorCode: error.response?.data?.errorCode,
    };
    return rejectWithValue(errorPayload);
  }
});

// Progress slice
const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetProgress: (state) => {
      state.completedCourses = [];
      state.incompleteCourses = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch completed courses
      .addCase(fetchCompletedCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCompletedCourses.fulfilled,
        (state, action: PayloadAction<CourseProgress[]>) => {
          state.loading = false;
          state.completedCourses = action.payload;
        }
      )
      .addCase(fetchCompletedCourses.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch completed courses";
      })

      // Fetch incomplete courses
      .addCase(fetchIncompleteCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIncompleteCourses.fulfilled,
        (state, action: PayloadAction<CourseProgress[]>) => {
          state.loading = false;
          state.incompleteCourses = action.payload;
        }
      )
      .addCase(fetchIncompleteCourses.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch incomplete courses";
      });
  },
});

export const { clearError, resetProgress } = progressSlice.actions;
export default progressSlice.reducer;
