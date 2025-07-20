import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import progressReducer from "./progressSlice";
import notificationReducer from "./notificationSlice";
import categoryReducer from "./categorySlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationReducer,
    progress: progressReducer,
    categories: categoryReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;