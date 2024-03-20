import createAxiosInstance from '../../utils/axios';
export const UpdateProfileImageThunk = async(formData, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const token = state.auth.token;
        const axiosInstance = createAxiosInstance(token, true);
        const response = await axiosInstance.put(`/profile`, formData);
        return response.data.data.user;
    } catch (error) {
        console.error("get users", error);
        return thunkAPI.rejectWithValue(error.message);
    }
};
