import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  _id: string;
  userId: string;
  message: string;
  readStatus: boolean;
  createdAt: string;
}

interface GetNotificationsState {
  notifications: Notification[];
  isLoading: boolean;
  error: boolean;
  errorMsg: string;
}

interface UpdateNotificationState {
  isLoading: boolean;
  error: boolean;
  errorMsg: string;
  success: boolean;
}

interface NotificationSliceState {
  getNotifications: GetNotificationsState;
  updateNotification: UpdateNotificationState;
}

const initialState: NotificationSliceState = {
  getNotifications: {
    notifications: [],
    isLoading: false,
    error: false,
    errorMsg: "",
  },
  updateNotification: {
    isLoading: false,
    error: false,
    errorMsg: "",
    success: false,
  },
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    getNotificationStart: (state) => {
      state.getNotifications.isLoading = true;
    },
    getNotificationSuccess: (state, action: PayloadAction<Notification[]>) => {
      state.getNotifications.isLoading = false;
      state.getNotifications.notifications = action.payload;
      state.getNotifications.error = false;
    },
    getNotificationFailure: (state, action: PayloadAction<string>) => {
      state.getNotifications.isLoading = false;
      state.getNotifications.error = true;
      state.getNotifications.errorMsg = action.payload;
    },
    updateNotificationStart: (state) => {
      state.updateNotification.isLoading = true;
    },
    updateNotificationSuccess: (state) => {
      state.updateNotification.isLoading = false;
      state.updateNotification.success = true;
      state.updateNotification.error = false;
    },
    updateNotificationFailure: (state, action: PayloadAction<string>) => {
      state.updateNotification.isLoading = false;
      state.updateNotification.error = true;
      state.updateNotification.errorMsg = action.payload;
    },
  },
});

export const {
  getNotificationStart,
  getNotificationSuccess,
  getNotificationFailure,
  updateNotificationStart,
  updateNotificationSuccess,
  updateNotificationFailure,
} = notificationSlice.actions;
export default notificationSlice.reducer;