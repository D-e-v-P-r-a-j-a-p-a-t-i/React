import { createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'), // Retrieve the token from local storage if available
    isAuthenticated: !!localStorage.getItem('token'),
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload); // Save token to local storage
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token'); // Remove token from local storage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
