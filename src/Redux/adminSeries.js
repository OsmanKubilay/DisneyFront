// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const adminSeriesSlice = createSlice({
  name: "adminSeries",
  initialState: {
    adminSeriesList: [],
    adminSeriesListSuccess: true,
  },
  reducers: {
    handleAdminSeriesList: (state, action) => {
      console.log(action);
      if (action.payload.success === true) {
        console.log(action);
        state.adminSeriesList = action.payload.data;
      }
      state.adminSeriesListSuccess = action.payload.success;
    },
    handleClearAdminSeriesList: (state) => {
      state.adminSeriesList = [];
      state.adminSeriesListSuccess = true;
    },
  },
});

export const { handleAdminSeriesList, handleClearAdminSeriesList } =
  adminSeriesSlice.actions;

export default adminSeriesSlice.reducer;
