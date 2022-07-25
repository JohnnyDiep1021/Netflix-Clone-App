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
      // console.log(action.payload);
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem(
        "userData",
        JSON.stringify({
          token: action.payload.token,
          isAdmin: action.payload.user.isAdmin,
        })
      );
      console.log(`Logging in successfully!`);
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
