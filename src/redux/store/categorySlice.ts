import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  _id: string;
  name: string;
  icon: string;
}
interface GetCategoriesState {
  categories: Category[];
  isLoading: boolean;
  error: boolean;
  errorMsg: string;
}
interface CategorySliceState {
  getCategories: GetCategoriesState;
}
const initialState: CategorySliceState = {
  getCategories: {
    categories: [],
    isLoading: false,
    error: false,
    errorMsg: "",
  },
};
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getCategoriesStart: (state) => {
      state.getCategories.isLoading = true;
    },
    getCategoriesSuccess: (state, action: PayloadAction<Category[]>) => {
      state.getCategories.isLoading = false;
      state.getCategories.categories = action.payload;
      state.getCategories.error = false;
    },
    getCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.getCategories.isLoading = false;
      state.getCategories.error = true;
      state.getCategories.errorMsg = action.payload;
    },
  },
});
export const {
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesFailure,
} = categorySlice.actions;
export default categorySlice.reducer;