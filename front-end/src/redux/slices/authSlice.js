import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {confirmEmailThunk, logInThunk, logOutThunk, signUpThunk} from "../thunks/authThunks";
import {toast} from "react-toastify";

const initialState = {
    isLoggedIn: false,
    token: "",
    isLoading: false,
    user: null,
    loginToast: null,
    logoutToast: null,
    registerToast: null,
}

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

export const confirmEmail = createAsyncThunk(
    "user/confirm-email",
    async (data, thunkAPI) => {
        return confirmEmailThunk(data, thunkAPI);
    }
)


const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, state => {
                state.isLoading = true;
                state.isLoggedIn = false;
                state.loginToast = toast.loading("Logging in...");
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.token = payload.token;
                state.user = payload.user;
                toast.update(state.loginToast, { render: "Login successful", isLoading: false, type: "success" });
                setTimeout(()=> { toast.dismiss()},2000);
            })
            .addCase(loginUser.rejected, state => {
                state.isLoading = false;
                state.isLoggedIn = false;
                toast.update(state.loginToast, { render: "Login failed", isLoading: false, type: "error" });
                setTimeout(()=> { toast.dismiss()},3000);
            })
            .addCase(logoutUser.pending, state => {
                state.isLoading = true;
                state.isLoggedIn = true;
                state.logoutToast = toast.loading("Logging in...");
            })
            .addCase(logoutUser.fulfilled, state => {
                state.isLoading = false;
                state.isLoggedIn = false;
                state.token = "";
                state.user = null;
                toast.update(state.logoutToast, {render: "Logout successful", isLoading: false, type: "success"});
                setTimeout(()=> { toast.dismiss()},2000);
            })
            .addCase(logoutUser.rejected, state => {
                state.isLoading = true;
                state.isLoggedIn = true;
                toast.update(state.logoutToast, {render: "Logout failed", isLoading: false, type: "error"});
                setTimeout(()=> { toast.dismiss()},2000);
            })
            .addCase(registerUser.pending, state => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, {payload} )=> {
                state.isLoading = false;
                state.token = payload.token;

                console.log(payload)
            })
            .addCase(registerUser.rejected, (state, {payload} )=> {
                state.isLoading = false;
                state.token = "";
                console.log(payload)
            })
            .addCase(confirmEmail.pending, state => {
                state.isLoading = true;
            })
            .addCase(confirmEmail.fulfilled, (state, {payload} )=> {
                state.isLoading = false;
                state.token = "";
                console.log(payload)
            })
            .addCase(confirmEmail.rejected, (state, {payload} )=> {
                state.isLoading = false;
                state.token = "";
                console.log(payload)
            })
    }
})

export default slice.reducer;
