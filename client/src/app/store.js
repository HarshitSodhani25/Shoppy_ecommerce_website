import { configureStore } from '@reduxjs/toolkit';
import productReducer from "../features/Product-list/productlistSlice";
import orderReducer from "../features/order/orderSlice"
import authReducer from "../features/Auth/authSlice";
import cartReducer from "../features/Cart/cartSlice"
import userReducer from "../features/User/userSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    order: orderReducer,
    auth: authReducer,
    cart: cartReducer,
    user: userReducer,
  },
});
