import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import movieReducer from "./movie";

const store = configureStore({
  reducer: { auth: authReducer, movie: movieReducer },
});

export default store;
