import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUser, fetchOrders, updateUser} from './userAPI';

const initialState = {
  userInfo: null,
  status: 'idle',
  orders: []
};

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchOrdersAsync = createAsyncThunk(
  'user/fetchOrders',
  async () => {
    const response = await fetchOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (userdata) => {
    const response = await updateUser(userdata);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
  },
});

export const selectUser = (state) => state.user.userInfo; 
export const selectOrders = (state) => state.user.orders;
export default userSlice.reducer;
