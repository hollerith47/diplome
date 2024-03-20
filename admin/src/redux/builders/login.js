import { loginAdmin } from '../slices/authSlice';

const Login = (builder) => {
    return (
      builder
        .addCase(loginAdmin.pending, state => {
            state.isLoading = true;
            state.isLoggedIn = false;
        })
        .addCase(loginAdmin.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.token = payload.token;
            state.admin = payload.user;
        })
        .addCase(loginAdmin.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            console.log(payload);
        })
    );
};

export default Login;