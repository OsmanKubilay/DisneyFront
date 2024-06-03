// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const bekleyenIslemlerSlice = createSlice({
  name: "bekleyenIslemler",
  initialState: {
    bekleyenIslemlerList: [],
    bekleyenIslemlerListSuccess: true,
  },
  reducers: {
    handleBekleyenIslemlerList: (state, action) => {
      if (action.payload.success === true) {
        state.bekleyenIslemlerList = action.payload.data;
      }
      state.bekleyenIslemlerListSuccess = action.payload.success;
    },
    handleClearBekleyenIslemlerList: (state) => {
      state.bekleyenIslemlerList = [];
      state.bekleyenIslemlerListSuccess = true;
    },
  },
});

export const { handleBekleyenIslemlerList, handleClearBekleyenIslemlerList } =
  bekleyenIslemlerSlice.actions;

export default bekleyenIslemlerSlice.reducer;
