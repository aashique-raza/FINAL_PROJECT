import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCompleted: false,
};

export const activeSlice = createSlice({
  name: "activeProperty",
  initialState,
  reducers: {
    propertyActivated: (state, action) => {
      state.activeCompleted = !state.activeCompleted;
    }
  }
});

// Export the actions
export const { propertyActivated } = activeSlice.actions;

// Export the reducer
export default activeSlice.reducer;

