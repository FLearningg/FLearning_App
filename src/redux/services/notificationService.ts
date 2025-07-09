import {
  getNotificationFailure,
  getNotificationStart,
  getNotificationSuccess,
  updateNotificationFailure,
  updateNotificationStart,
  updateNotificationSuccess,
} from "../store/notificationSlice";
import apiClient from "./authService";
import { Dispatch } from "@reduxjs/toolkit";

export const getNotifications = async (
  dispatch: Dispatch,
  userId: string,
  page: number,
  limit: number = 10
): Promise<void> => {
  dispatch(getNotificationStart());
  try {
    const response = await apiClient.get(`/notifications/${userId}?page=${page}&limit=${limit}`);
    dispatch(getNotificationSuccess(response.data.notifications));
  } catch (error: any) {
    console.error("Error fetching notifications:", error);
    dispatch(getNotificationFailure(error.message || "Unknown error"));
  }
};

export const markNotificationAsRead = async (
  userId: string,
  dispatch: Dispatch
): Promise<void> => {
  dispatch(updateNotificationStart());
  try {
    await apiClient.put(`/notifications/${userId}`);
    dispatch(updateNotificationSuccess());
  } catch (error: any) {
    console.error("Error marking notification as read:", error);
    dispatch(updateNotificationFailure(error.message || "Unknown error"));
  }
};