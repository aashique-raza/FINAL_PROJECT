import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../features/user.slice";
import pgReducer from "../features/pg.slice";

const userPersistConfig = {
  key: "user",
  storage,
};
const pgLIstingPersistConfig = {
  key: "pgListing",
  storage,
};


const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedPgListingReducer = persistReducer(pgLIstingPersistConfig, pgReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    pgLIsting:persistedPgListingReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
}); // Root reducer se store banayein
export const persistor = persistStore(store);
export default store;
