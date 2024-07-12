import { createSlice } from "@reduxjs/toolkit";
// import { act } from "react";

const initialState = {
  error: null,
  loading: false,
  favouriteProperty:[]
};

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    getFavouriteProperty:(state,action)=>{
        state.favouriteProperty=action.payload
        state.loading=false
        state.error=null
    },
    clearState:(state)=>{
        state.favouriteProperty=[]
        state.error=null,
        state.loading=false
    },
    startGettingFavourite:(action)=>{
        state.loading=true;
        state.error=null
    },
    fetchingFailedFavouriteProperty:(state,action)=>{
        state.loading=false,
        state.error=action.payload
    }
    
  },
});

export const {
  getFavouriteProperty,
  clearState,
  startGettingFavourite,
  fetchingFailedFavouriteProperty
 
} = favouriteSlice.actions;

export default favouriteSlice.reducer;
