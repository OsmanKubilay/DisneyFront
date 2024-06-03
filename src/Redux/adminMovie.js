// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const adminMovieSlice = createSlice({
  name: "adminMovie",
  initialState: {
    adminMovieList: [],
    adminMovieListSuccess: true,
  },
  reducers: {
    handleAdminMovieList: (state, action) => {
      console.log(action);
      if (action.payload.success === true) {
        console.log(action);
        state.adminMovieList = action.payload.data;
      }
      state.adminMovieListSuccess = action.payload.success;
    },
    handleClearAdminMovieList: (state) => {
      state.adminMovieList = [];
      state.adminMovieListSuccess = true;
    },
  },
});

export const { handleAdminMovieList, handleClearAdminMovieList } =
  adminMovieSlice.actions;

export default adminMovieSlice.reducer;
