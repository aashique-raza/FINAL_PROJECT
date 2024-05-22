import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: false,
  pgListing: null,
  getAllProperty: null,
};

export const pgSlice = createSlice({
  name: "pg",
  initialState,
  reducers: {
    pgListingStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    pgListingFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    pgListingSuccess: (state, action) => {
      state.pgListing = action.payload;
      state.error = null;
      state.loading = false;
    },
    pgListingClearError: (state) => {
      state.error = null;
      state.loading = false;
    },
    
  },
});

export const {
  pgListingClearError,
  pgListingFailed,
  pgListingStart,
  pgListingSuccess,
 
} = pgSlice.actions;

export default pgSlice.reducer;
