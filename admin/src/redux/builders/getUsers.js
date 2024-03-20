import { getUsers } from '../slices/authSlice';

const GetUsers = (builder) => {
    return (
      builder
        .addCase(getUsers.pending, state => {
            state.isLoading = true;
        })
        .addCase(getUsers.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.allUsers = payload;
        })
        .addCase(getUsers.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.allUsers = null;
        })
    );
};

export default GetUsers;