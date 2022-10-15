import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: null,
  tokenExpDate: null,
  isLoggedIn: false,
  watchlist: [],
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    setWatchList(state, action) {
      state.watchlist = action.payload;
    },
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = !!action.payload.token;

      // console.log(typeof action.payload.expTime, action.payload.expTime);
      const tokenExpDate = action.payload.expTime
        ? new Date(action.payload.expTime)
        : // : new Date(new Date().getTime() + 1000 * 60 * (60 * 48));
          new Date(new Date().getTime() + 1000 * 55);
      state.tokenExpDate = tokenExpDate.getTime();
      localStorage.setItem(
        "userData",
        JSON.stringify({
          token: action.payload.token,
          // expTime: tokenExpDate,
          expTime: tokenExpDate.toISOString(),
        })
      );
      console.log(tokenExpDate);
      console.log(`Logged in!`);
    },

    logout(state) {
      state.token = null;
      state.tokenExpDate = null;
      state.isLoggedIn = false;
      state.watchlist = [];
      localStorage.removeItem("userData");
      console.log("Logged out!");
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
