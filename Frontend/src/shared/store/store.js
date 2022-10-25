import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import movieReducer from "./movie";
import uiReducer from "./ui";
const store = configureStore({
  reducer: { auth: authReducer, movie: movieReducer, ui: uiReducer },
});

export default store;
