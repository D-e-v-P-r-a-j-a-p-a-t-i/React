import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/CartSlice';
import productReducer from './slices/ProductSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    auth: authReducer,
  },
});
