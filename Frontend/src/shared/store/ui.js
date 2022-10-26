import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  profileImg: "",
  profileImgRef: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  // functions as reducers must be pure (standard function)
  reducers: {
    setProfileImg(state, action) {
      state.profileImg = action.payload;
    },
    setProfileImgRef(state, action) {
      state.profileImgRef = action.payload;
    },
  },
});

export const uiAction = uiSlice.actions;
export default uiSlice.reducer;
