import { createSlice } from "@reduxjs/toolkit";

// Initial state, get the token and isAdmin status from local storage
const initialState = {
  token: localStorage.getItem("token") || null,
  isAdmin: localStorage.getItem("isAdmin") === 'true' || false,
};

// Define the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Define a reducer for setting the token and isAdmin status
    setToken(state, action) {
      const { token, isAdmin } = action.payload;
      state.token = token;
      state.isAdmin = isAdmin;
      // Also update the local storage
      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", isAdmin);
    },
  },
});

// Export actions
export const { setToken } = authSlice.actions;

// Export reducer
export default authSlice.reducer;