import createAxiosInstance from '../../utils/axios';

const UpdateUserByAdminThunk = async(formData, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const token = state.auth.token;
        const axiosInstance = createAxiosInstance(token, true);
        const response = await axiosInstance.post(`/admin/update-user`, formData);
        console.log(response.data.data);
        return true;
    } catch (error) {
        console.error("get users", error);
        return thunkAPI.rejectWithValue(error.message);
    }
};

export default UpdateUserByAdminThunk;