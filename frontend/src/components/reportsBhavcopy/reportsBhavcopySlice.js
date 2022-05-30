import { createSlice } from "@reduxjs/toolkit";

export const reportsBhavcopySlice = createSlice({
  name: "reportsBhavcopy",
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = reportsBhavcopySlice.actions;

export default reportsBhavcopySlice.reducer;
