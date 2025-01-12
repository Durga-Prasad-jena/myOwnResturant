import { configureStore } from "@reduxjs/toolkit";
import { resturantApi } from "../slices/resturantSlice";
export const store = configureStore({
  reducer: {
    [resturantApi.reducerPath]: resturantApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(resturantApi.middleware),
});
