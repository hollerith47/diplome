import createAxiosInstance from '../../utils/axios';

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