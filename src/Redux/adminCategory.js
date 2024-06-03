// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const adminCategorySlice = createSlice({
  name: "adminCategory",
  initialState: {
    adminCategoryList: [],
    adminCategoryListSuccess: true,
  },
  reducers: {
    handleAdminCategoryList: (state, action) => {
      console.log(action);
      if (action.payload.success === true) {
        console.log(action);
        state.adminCategoryList = action.payload.data;
      }
      state.adminCategoryListSuccess = action.payload.success;
    },
    handleClearAdminCategoryList: (state) => {
      state.adminCategoryList = [];
      state.adminCategoryListSuccess = true;
    },
  },
});

export const { handleAdminCategoryList, handleClearAdminCategoryList } =
  adminCategorySlice.actions;

export default adminCategorySlice.reducer;
