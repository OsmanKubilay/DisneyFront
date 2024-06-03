// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const adminUserSlice = createSlice({
  name: "adminUser",
  initialState: {
    adminUserList: [],
    adminUserListSuccess: true,
  },
  reducers: {
    handleAdminUserList: (state, action) => {
      console.log("123", action);
      if (action.payload.success === true) {
        state.adminUserList = action.payload.data;
      }
      state.adminUserListSuccess = action.payload.success;
    },
    handleClearAdminUserList: (state) => {
      state.adminUserList = [];
      state.adminUserListSuccess = true;
    },
  },
});

export const { handleAdminUserList, handleClearAdminUserList } =
  adminUserSlice.actions;

export default adminUserSlice.reducer;
