import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem(
        "userData",
        JSON.stringify({
          token: action.payload.token,
        })
      );
      console.log(`Logging in successfully!`);
    },
    logout(state) {},
    setAuthToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
