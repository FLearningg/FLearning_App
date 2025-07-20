import { Dispatch } from "@reduxjs/toolkit";
import apiClient from "./authService";
import {
  getCategoriesFailure,
  getCategoriesStart,
  getCategoriesSuccess,
} from "../store/categorySlice";

export const getCategories = async (dispatch: Dispatch) => {
  dispatch(getCategoriesStart());
  try {
    const response = await apiClient.get("/categories/top");
    dispatch(getCategoriesSuccess(response.data));
  } catch (error: any) {
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Error fetching categories";
    dispatch(getCategoriesFailure(message));
  }
};
