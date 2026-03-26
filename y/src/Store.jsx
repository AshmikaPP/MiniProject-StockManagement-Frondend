import { configureStore } from "@reduxjs/toolkit";
import { UserApislice } from "./api/Userapi.jsx";

export const store = configureStore({
  reducer: {
    [UserApislice.reducerPath]: UserApislice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserApislice.middleware),
});