import {toast} from "react-toastify";
import {loginUser} from "../slices/authSlice";

const loginBuilder = (builder) =>{
    return (
        builder
            .addCase(loginUser.pending, state => {
                state.isLoading = true;
                state.isLoggedIn = false;
                state.loginToast = toast.loading("Logging in...");
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.token = payload.token;
                state.user = payload.user;
                toast.update(state.loginToast, { render: "Login successful", isLoading: false, type: "success" });
                setTimeout(()=> { toast.dismiss()},2000);
            })
            .addCase(loginUser.rejected, state => {
                state.isLoading = false;
                state.isLoggedIn = false;
                toast.update(state.loginToast, { render: "Login failed", isLoading: false, type: "error" });
                setTimeout(()=> { toast.dismiss()},3000);
            })
    )
}

export default loginBuilder;
