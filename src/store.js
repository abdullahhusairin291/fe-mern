import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    cartState: cartReducer,
  },
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});
