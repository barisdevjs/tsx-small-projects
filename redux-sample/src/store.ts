import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import productsReducer from "./slices/eCommerceSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    productsReducer: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
