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
    loginStart: (state) => {
      state.loading = true;
      state.errorr = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.errorr = null;
    },
    loginFailed: (state, action) => {
      state.errorr = action.payload;
      state.loading = false;
    },
    clearError:(state)=>{
      state.loading=false,
      state.errorr=null
    },
    setToken:(state,action)=>{
      state.token=action.payload
    },
    logOutSuccess:(state)=>{
      state.user=null
      state.errorr=null
      state.loading=false

    },
    updateSucceFully: (state, action) => {
      const { firstName, lastName, email, profileImage, phoneNumber } = action.payload;
      state.user = {
        ...state.user,
        firstName,
        lastName,
        email,
        profileImage,
        phoneNumber
      };
      state.loading = false;
      state.errorr = null;
    },
    emailVeriFicationStart:(state)=>{

      state.loading=true
      state.errorr=null
    },

    emailVeriFicatioFailed:(state,action)=>{
      state.errorr=action.payload
      state.loading=false
    },

    emailVerificationSuccess:(state,action)=>{
      
      
      state.user.isEmailVerified=true
      state.loading=false
      state.errorr=null
      
    }
    
    
  },
});

export const {
  
  loginStart,
  loginFailed,
  loginSuccess,
  clearError,
  setToken,
  logOutSuccess,
  updateSucceFully,
  emailVeriFicatioFailed,
  emailVeriFicationStart,
  emailVerificationSuccess
  
} = userSlice.actions;

export default userSlice.reducer;
