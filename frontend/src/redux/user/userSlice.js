// src/user/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
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
    },
    deleteSuccess: (state) => {
      state.error = null;
    },
    deleteSuccess: (state, action) => {
      state.currentUser = null;
      state.error = null;
    },
    deleteFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export actions
export const { signInStart, signInSuccess, signInFailure,deleteFailure,deleteStart,deleteSuccess } = userSlice.actions;

// Export reducer as default
export default userSlice.reducer;
