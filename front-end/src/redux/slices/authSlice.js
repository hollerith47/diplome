import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    confirmEmailThunk,
    createEventThunk,
    forgotPasswordThunk,
    getAllUsersThunk,
    logInThunk,
    logOutThunk,
    resetPasswordThunk,
    signUpThunk
} from "../thunks/authThunks";
import {toast} from "react-toastify";
import {confirmEmailBuilder, forgotPasswordBuilder, loginBuilder, logoutBuilder, registerBuilder} from "../builders";
import resetUserPasswordBuilder from "../builders/resetUserPasswordBuilder";


const initialState = {
    isLoggedIn: false,
    token: "",
    isLoading: false,
    user: null,
    loginToast: null,
    logoutToast: null,
    registerToast: null,
    confirmEmailToast: null,
    forgotPasswordToast: null,
    resetPasswordToast: null,
    allUsers: null,
}

const user_id = window.localStorage.getItem("user_id");
export const loginUser = createAsyncThunk(
    "user/login",
    async (user, thunkAPI) => {
        return logInThunk(user, thunkAPI);
    }
)

export const logoutUser = createAsyncThunk(
    "user/logout",
    async (_, thunkAPI) => {
        return logOutThunk(_, thunkAPI);
    }
)

export const registerUser = createAsyncThunk(
    "user/register",
    async (user, thunkAPI) => {
        return signUpThunk(user, thunkAPI);
    }
)

export const forgotPassword = createAsyncThunk(
    "user/forgot-password",
    async (data, thunkAPI) => {
        return forgotPasswordThunk(data, thunkAPI);
    }
)

export const resetUserPassword = createAsyncThunk(
    "user/reset-password",
    async (data, thunkAPI) => {
        return resetPasswordThunk(data, thunkAPI);
    }
)

export const confirmEmail = createAsyncThunk(
    "user/confirm-email",
    async (data, thunkAPI) => {
        return confirmEmailThunk(data, thunkAPI);
    }
)

export const createEvent = createAsyncThunk(
    "event/create",
    async (_, thunkAPI) => {
        return createEventThunk(_, thunkAPI);
    }
)

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (_, thunkAPI) => {
        return getAllUsersThunk(_, thunkAPI);
    }
)

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: builder => {
        loginBuilder(builder);
        logoutBuilder(builder);
        registerBuilder(builder);
        confirmEmailBuilder(builder);
        forgotPasswordBuilder(builder);
        resetUserPasswordBuilder(builder);
        builder
            .addCase(createEvent.pending, state => {
                state.isLoading = true;
            })
            .addCase(createEvent.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                toast.success(payload.message);
                console.log({payload})
            })
            .addCase(createEvent.rejected, state => {
                state.isLoading = false;
                toast.error("Failed to create event");
                console.log("create Event rejected")
            });
        builder
            .addCase(getUsers.pending, state => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, {payload})=> {
                state.isLoading = false;
                state.allUsers = payload.filter(user => user._id !== user_id);
            })
            .addCase(getUsers.rejected, state =>{
                state.isLoading = false;
                state.allUsers = null;
                console.log("get all users rejected")
            })

    }
})

export default slice.reducer;
