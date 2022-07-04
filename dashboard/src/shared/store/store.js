import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import moviesReducer from "./movies";

const store = configureStore({
  reducer: { auth: authReducer, movies: moviesReducer },
});

export default store;
