import { createSlice } from "@reduxjs/toolkit";

const initialListsState = {
  lists: [],
};

const listsSlice = createSlice({
  name: "lists",
  initialState: initialListsState,
  reducers: {
    setLists(state, action) {
      // console.log(action.payload);
      state.lists = action.payload;
    },
    deleteListById(state, action) {
      state.lists = state.lists.filter((list) => list._id !== action.payload);
    },
  },
});

export const listsAction = listsSlice.actions;
export default listsSlice.reducer;
