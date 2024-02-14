import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/eCommerceSlice";

export const store = configureStore({
  reducer: {
    productsReducer: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
