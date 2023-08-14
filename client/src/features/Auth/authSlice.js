import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createCredential, validateCredential, signOut, checkAuth, resetPasswordRequest, resetPassword} from './authAPI';
import { updateUser } from '../User/userAPI';

const initialState = {
  loggedInUserToken: null,
  status: 'idle',
  signUpError: null,
  signInError: null,
  addresses: [],
  userChecked: false,
  mailSent: false,
  passwordReset: false,
};

export const createCredentialAsync = createAsyncThunk(
  'auth/createCredential',
  async (userData) => {
    const response = await createCredential(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const validateCredentialAsync = createAsyncThunk(
  'auth/validateCredential',
  async (userData) => {
    const response = await validateCredential(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const signOutAsync = createAsyncThunk(
  'auth/signOut',
  async () => {
    const response = await signOut();
    return response.data
  }
)

export const resetPasswordRequestAsync = createAsyncThunk(
  'auth/resetPasswordRequest', 
  async (email, {rejectWithValue}) =>{
    try {
      const response = await resetPasswordRequest(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const resetPasswordAsync = createAsyncThunk(
  'auth/resetPassword',
  async (data, {rejectWithValue})=>{
    try {
      const response = await resetPassword(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const checkAuthAsync = createAsyncThunk(
  'auht/checkAuth',
  async () => {
    try {
      const response = await checkAuth();
      return response.data;
    } catch (error) {
    }
  }
)


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createCredentialAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCredentialAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(createCredentialAsync.rejected, (state, action)=>{
        state.status = "idle";
        state.signUpError = action.error;
      })
      .addCase(validateCredentialAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(validateCredentialAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(validateCredentialAsync.rejected, (state, action)=>{
        state.status= "idle";
        state.signInError = action.error
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action)=>{
        state.status= "idle";
        state.userChecked = true;
        state.signInError = action.error;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.mailSent = true;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.passwordReset = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload
      });
  },
});

// export const { increment} = authSlice.actions;
export const selectLoginCredential = (state) => state.auth.loggedInUserToken
export const selectSignUpError = (state) => state.auth.signUpError;
export const selectSignInError = (state) => state.auth.signInError;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.passwordReset;
export default authSlice.reducer;
