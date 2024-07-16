import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
    }
  }
});

// Correctly export the reducer as default
export const { signInStart, signInFailure, signInSuccess } = userSlice.actions;
export default userSlice.reducer;



