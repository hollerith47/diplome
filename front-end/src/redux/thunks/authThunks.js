import createAxiosInstance from "../../utils/axios";


export const logInThunk = async (data, thunkAPI) => {
    const axiosInstance = createAxiosInstance();
    const {email, password} = data;
    try {
        const response = await axiosInstance
            .post("/login", {email, password});
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
        const axiosInstance = createAxiosInstance(token);
        const response = await axiosInstance.get(`/users`);
        return response.data.data
    } catch (error) {
        console.error("get users", error);
        return thunkAPI.rejectWithValue(error.message);
    }
}


