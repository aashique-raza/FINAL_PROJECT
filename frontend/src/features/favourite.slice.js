import { createSlice } from "@reduxjs/toolkit";
// import { act } from "react";

const initialState = {
  error: null,
  loading: false,
  favouriteProperty: null,
  filteredProperty: null,
};

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    setFilteredProperties: (state, action) => {
      console.log("set filter", action);
      state.filteredProperty = action.payload;
    },
    getFavouriteProperties: (state, action) => {
      state.favouriteProperty = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearState: (state) => {
      state.favouriteProperty = null;
      (state.error = null), (state.loading = false);
    },
    startGettingFavourite: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchingFailedFavouriteProperty: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    addPropertyToFavourite: (state, action) => {
      const id = action.payload;
      console.log("in slice", id);
      state.favouriteProperty = state.favouriteProperty.map((fav) =>
        fav._id === id ? { ...fav, isPropertyFavorite: true } : fav
      );
      state.filteredProperty = state.filteredProperty.map((fav) =>
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

      state.filteredProperty = state.filteredProperty.map((fav) =>
        fav._id === id ? { ...fav, isPropertyFavorite: false } : fav
      );
    },
  },
});

export const {
  getFavouriteProperties,
  clearState,
  startGettingFavourite,
  fetchingFailedFavouriteProperty,
  addPropertyToFavourite,
  removePropertyFromFavourite,
  setFilteredProperties,
} = favouriteSlice.actions;

export default favouriteSlice.reducer;