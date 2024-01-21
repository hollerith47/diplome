import {BASE_URL} from "../../config";
import createAxiosInstance from "../../utils/axios";

export const logInThunk = async (data, thunkAPI) => {
    const axiosInstance = createAxiosInstance();
    const {email, password} = data;
    try {
        const response = await axiosInstance.post("/login", {email, password});
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
        // console.log(response.data.data);
        return response.data.data;
    }catch (error) {
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
    }catch (error) {
        console.error("Signup error", error);
        return thunkAPI.rejectWithValue(error.message);
    }
}
export const logOutThunk = async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const token = state.auth.token;
        const axiosInstance = createAxiosInstance(token);
        await axiosInstance.get(`${BASE_URL}/logout`);
        return true
    } catch (error) {
        console.error("Logout error", error);
        return thunkAPI.rejectWithValue(error.message);
    }
}


