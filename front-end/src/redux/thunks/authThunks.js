import createAxiosInstance from "../../utils/axios";
import axios from "axios";
import {BASE_NODE_API_URL} from "../../config";



export const logInThunk = async (data, thunkAPI) => {
    const axiosInstance = createAxiosInstance();
    const {email, password} = data;
    try {
        const response = await axiosInstance
            .post("/login", {email, password});
        const getId = await axios.post(`${BASE_NODE_API_URL}/get-user-id`, {email})
        let data = response.data.data;
        if (data.user && typeof data.user === 'object') {
            data.user["_id"] = getId.data["_id"];
            data.user["socket_id"] = getId.data["socket_id"];
            window.localStorage.setItem("user_id", getId.data["_id"]);
        }
        return response.data.data;
    } catch (error) {
        console.error("Login error", error);
        return thunkAPI.rejectWithValue(error.message);
    }
}

export const signUpThunk = async (data, thunkAPI) => {
    const axiosInstance = createAxiosInstance();
    try {
        const response = await axiosInstance.post("/register", {...data});
        // console.log(response._data._data);
        return response.data.data;
    } catch (error) {
        console.error("Signup error", error);
        return thunkAPI.rejectWithValue(error.message);
    }
}

export const confirmEmailThunk = async (data, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const token = state.auth.token;
        const axiosInstance = createAxiosInstance(token);
        const response = await axiosInstance.post("/email-verification", {...data});
        // console.log(response);
        if (response.status === 200) {
            return true
        }
    } catch (error) {
        console.error("Signup error", error);
        return thunkAPI.rejectWithValue(error.message);
    }
}

export const forgotPasswordThunk = async (data, thunkAPI) => {
    const axiosInstance = createAxiosInstance();
    const {email} = data;
    try {
        const response = await axiosInstance.post("/forgot-password", {email});
        return response.data.data.success;
    } catch (error) {
        console.error("forgot password error", error);
        return thunkAPI.rejectWithValue("User email not registered yet");
    }
}

export const resetPasswordThunk = async (data, thunkAPI) => {
    const axiosInstance = createAxiosInstance();
    try {
        const response = await axiosInstance.post("/reset-password", {...data});
        return response.data.data.success;
    } catch (error) {
        console.error("Reset password error", error);
        return thunkAPI.rejectWithValue("Failed to reset password");
    }
}
export const logOutThunk = async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const token = state.auth.token;
        const axiosInstance = createAxiosInstance(token);
        await axiosInstance.get(`/logout`);
        window.localStorage.removeItem("user_id");
        return true
    } catch (error) {
        console.error("Logout error", error);
        return thunkAPI.rejectWithValue(error.message);
    }
}

export const createEventThunk = async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const token = state.auth.token;
        const axiosInstance = createAxiosInstance(token);
        const response = await axiosInstance.get(`/test`);
        console.log(response)
        return response
    } catch (error) {
        console.error("get event", error);
        return thunkAPI.rejectWithValue(error.message);
    }
}

export const getAllUsersThunk = async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const token = state.auth.token;
        const actualUserEmail = state.auth.user.email;
        const axiosInstance = createAxiosInstance(token);
        const response = await axiosInstance.get(`/users`);
        let users = response.data.data;
        // users.filter(user => user.email !== actualUserEmail )
        // console.log("actual user email", actualUserEmail);
        // console.log(users)
        for (let user of users) {
            const getUserData = await axios.post(`${BASE_NODE_API_URL}/get-user-id`, {email: user.email})
            user["_id"] = getUserData.data["_id"];
            user["online"] = getUserData.data["status"];
            user["socketId"] = getUserData.data["socket_id"];
        }
        return users.filter(user => user.email !== "appexpress@htech.com" && user.email !== actualUserEmail);
    } catch (error) {
        console.error("get users", error);
        return thunkAPI.rejectWithValue(error.message);
    }
}


