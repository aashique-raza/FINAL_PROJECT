import { createSlice } from "@reduxjs/toolkit";
// import { act } from "react";

const initialState = {
  error: null,
  loading: false,
  favouriteProperty: null,
  
};

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {

    startfetchingUserFavouriteProperties:(state)=>{
      state.error=null;
      state.loading=true

    },

    fetchingFailedUserProperties:(state,action)=>{
      state.loading=false;
      state.error=action.payload
    },

    fetchedSuccessfullyUserProperties:(state,action)=>{
      state.loading=false;
      state.error=null;
      state.favouriteProperty=action.payload

    },
    clearStateUserFavouriteProperty:(state)=>{
      state.loading=false;
      state.error=null;
      state.favouriteProperty=null
    },
  
    addPropertyToFavourite: (state, action) => {
      const id = action.payload;
      console.log("in slice", id);
      state.favouriteProperty = state.favouriteProperty.map((fav) =>
        fav._id === id ? { ...fav, isPropertyFavorite: true } : fav
      );
      
    },

    removePropertyFromFavourite: (state, action) => {
      const id = action.payload;
      state.favouriteProperty = state.favouriteProperty
        .map((fav) =>
          fav._id === id ? { ...fav, isPropertyFavorite: false } : fav
        )
        .filter((fav) => fav.isPropertyFavorite !== false);

     
    },
  },
});

export const {
  startfetchingUserFavouriteProperties,
  fetchedSuccessfullyUserProperties,
  fetchingFailedUserProperties,
  clearStateUserFavouriteProperty,
  
  addPropertyToFavourite,
  removePropertyFromFavourite,
  
} = favouriteSlice.actions;

export default favouriteSlice.reducer;
