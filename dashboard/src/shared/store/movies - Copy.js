import { createSlice } from "@reduxjs/toolkit";

const initialMoviesState = {
  movies: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: initialMoviesState,
  reducers: {
    getMovies(state, action) {
      // console.log(action.payload);
      state.movies = action.payload;
    },
    deleteMovieById(state, action) {
      state.movies = state.movies.filter(
        (movies) => movies._id !== action.payload
      );
    },
  },
});

export const moviesAction = moviesSlice.actions;
export default moviesSlice.reducer;
