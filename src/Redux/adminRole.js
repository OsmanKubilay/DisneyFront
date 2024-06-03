// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const adminRoleSlice = createSlice({
  name: "adminRole",
  initialState: {
    adminRoleList: [],
    adminRoleListSuccess: true,
  },
  reducers: {
    handleAdminRoleList: (state, action) => {
      console.log(action);
      if (action.payload.success === true) {
        console.log(action);
        state.adminRoleList = action.payload.data;
      }
      state.adminRoleListSuccess = action.payload.success;
    },
    handleClearAdminRoleList: (state) => {
      state.adminRoleList = [];
      state.adminRoleListSuccess = true;
    },
  },
});

export const { handleAdminRoleList, handleClearAdminRoleList } =
  adminRoleSlice.actions;

export default adminRoleSlice.reducer;
