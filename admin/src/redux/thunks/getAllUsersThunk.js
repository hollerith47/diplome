import createAxiosInstance from '../../utils/axios';

const GetAllUsersThunk = async (_, thunkAPI) => {
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

export default GetAllUsersThunk;