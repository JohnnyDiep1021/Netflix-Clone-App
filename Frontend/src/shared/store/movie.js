import { createSlice } from "@reduxjs/toolkit";

const initialMovieState = {
  type: "",
  genre: "",
};

const movieSlice = createSlice({
  name: "movie",
  initialState: initialMovieState,
  reducers: {
    setType(state, action) {
      state.type = action.payload;
    },
    setGenre(state, action) {
      state.genre = action.payload;
    },
  },
});

export const movieAction = movieSlice.actions;
export default movieSlice.reducer;
