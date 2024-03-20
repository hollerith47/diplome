import { logOut } from '../slices/authSlice';

const Logout = (builder) => {
    return (
      builder
        .addCase(logOut.pending, state => {
            state.isLoading = true;
            state.isLoggedIn = false;
        })
        .addCase(logOut.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.token = null;
            state.admin = null;
        })
        .addCase(logOut.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.isLoggedIn = false;
        })
    );
};

export default Logout;