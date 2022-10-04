import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastActive: "",
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.lastActive = action.payload;
    },
  },
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;
