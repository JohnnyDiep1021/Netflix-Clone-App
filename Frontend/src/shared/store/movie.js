import { createSlice } from "@reduxjs/toolkit";

const initialMovieState = {
  type: "movies",
  genre: "",
};

const movieSlice = createSlice({
  name: "movie",
  initialState: initialMovieState,
  reducers: {
    setType(state, action = { payload: "movies" }) {
      state.type = action.payload;
    },
    setGenre(state, action = { payload: "" }) {
      state.genre = action.payload;
    },
  },
});

export const movieAction = movieSlice.actions;
export default movieSlice.reducer;
