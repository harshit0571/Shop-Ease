import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./favourites/favouritesSlice";
import cartReducer from "./cart/cartSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    cart: cartReducer,
  },
});
