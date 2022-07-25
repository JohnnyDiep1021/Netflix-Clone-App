import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import moviesReducer from "./movies";
import listsReducer from "./lists";

const store = configureStore({
  reducer: { auth: authReducer, movies: moviesReducer, lists: listsReducer },
});

export default store;
