import { createSlice } from "@reduxjs/toolkit";

const initialMovieState = {
  type: "",
  genre: "",
  showDetail: false,
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
    showDetailHandler(state) {
      state.showDetail = true;
    },
    hideDetailHandler(state) {
      state.showDetail = false;
    },
  },
});

export const movieAction = movieSlice.actions;
export default movieSlice.reducer;
