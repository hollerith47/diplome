import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginThunk, logOutThunk } from '../thunks/';
import getAllUsersThunk from '../thunks/getAllUsersThunk';
import { UpdateProfileImageThunk } from '../thunks/updateProfileThunk';
import { GetUsersBuilder, LoginBuilder, LogoutBuilder } from '../builders';
import UpdateUserByAdminThunk from '../thunks/updateUserByAdminThunk';

const initialState = {
    isLoggedIn: false,
    token: '',
    isLoading: false,
    admin: null,
    allUsers: null
};

const slice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        LoginBuilder(builder);
        LogoutBuilder(builder);
        GetUsersBuilder(builder);
        builder
          .addCase(updateImage.pending, state => {
              state.isLoading = true;
          })
          .addCase(updateImage.fulfilled, (state, {payload}) =>{
              state.isLoading = false;
              state.admin = payload;
          })
          .addCase(updateImage.rejected, (state, {payload}) =>{
              state.isLoading = false;
              console.log({payload});
              console.log("update image rejected")
          });
        builder
          .addCase(updateUserByAdmin.pending, state => {
              state.isLoading = true;
          })
          .addCase(updateUserByAdmin.fulfilled, (state, {payload}) =>{
              state.isLoading = false;
          })
          .addCase(updateUserByAdmin.rejected, (state, {payload}) =>{
              state.isLoading = false;
              console.log({payload});
              console.log("update user by admin rejected")
          });
    }
});

export const loginAdmin = createAsyncThunk(
  'admin/login',
  async (data, thunkAPI) => {
      return LoginThunk(data, thunkAPI);
  }
);

export const logOut = createAsyncThunk(
  'admin/logout',
  async (_, thunkAPI) => {
      return logOutThunk(_, thunkAPI);
  }
);

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, thunkAPI) => {
      return getAllUsersThunk(_, thunkAPI);
  }
);

export const updateImage = createAsyncThunk(
  'admin/updateImage',
  async (formData, thunkAPI) => {
      return UpdateProfileImageThunk(formData, thunkAPI);
  }
)

export const updateUserByAdmin = createAsyncThunk(
  'admin/updateUserByAdmin',
  async (formData, thunkAPI) => {
      return UpdateUserByAdminThunk(formData, thunkAPI);
  }
)

export default slice.reducer;