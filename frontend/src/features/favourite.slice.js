import { createSlice } from "@reduxjs/toolkit";
// import { act } from "react";

const initialState = {
  error: null,
  loading: false,
  favouriteProperty:null
};

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    getFavouriteProperties:(state,action)=>{
        state.favouriteProperty=action.payload
        state.loading=false
        state.error=null
    },
    clearState:(state)=>{
        state.favouriteProperty=null
        state.error=null,
        state.loading=false
    },
    startGettingFavourite:(state,action)=>{
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
  getFavouriteProperties,
  clearState,
  startGettingFavourite,
  fetchingFailedFavouriteProperty
 
} = favouriteSlice.actions;

export default favouriteSlice.reducer;
