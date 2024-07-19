import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: false,
  favouriteProperty: [],
};

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    startfetchingUserFavouriteProperties: (state) => {
      state.error = null;
      state.loading = true;
    },

    fetchingFailedUserProperties: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchedSuccessfullyUserProperties: (state, action) => {
      state.loading = false;
      state.error = null;
      state.favouriteProperty = action.payload;
    },
    
    clearStateUserFavouriteProperty: (state) => {
      state.loading = false;
      state.error = null;
      state.favouriteProperty = []; // Use empty array instead of null
    },

    addPropertyToFavourite: (state, action) => {
      const property = action.payload;
      console.log("in slice", property);
      state.favouriteProperty = [...state.favouriteProperty, property]; // Use spread operator
    },

    removePropertyFromFavourite: (state, action) => {
      const id = action.payload;
      state.favouriteProperty = state.favouriteProperty.filter(
        (fav) => fav._id !== id
      );
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
