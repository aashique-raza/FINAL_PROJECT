import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorr: null,
  loading: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.loading = true;
      state.errorr = null;
    },
    signupSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.errorr = null;
    },
    signupFailed: (state, action) => {
      state.errorr = action.payload;
      state.loading = false;
    },
    
    
  },
});

export const {
  
  signupFailed,
  signupStart,
  signupSuccess,
  
} = userSlice.actions;

export default userSlice.reducer;
