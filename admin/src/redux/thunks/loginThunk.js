import createAxiosInstance from '../../utils/axios';

const LoginThunk = async (data, thunkAPI) => {
    const axiosInstance = createAxiosInstance();
    const { email, password } = data;

    try {
        const response = await axiosInstance
          .post("/admin/login", {email, password});
        console.log(response.data.data);
        return response.data.data;

    } catch (error) {
        console.error('Login error', error);
        return thunkAPI.rejectWithValue(error.message);
    }
};

export default LoginThunk;