import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/productSlice';
import authReducer from './features/authSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});
