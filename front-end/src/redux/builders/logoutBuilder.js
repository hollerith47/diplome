import {toast} from "react-toastify";
import {logoutUser} from "../slices/authSlice";

const logoutBuilder = (builder) => {
    return (
        builder
            .addCase(logoutUser.pending, state => {
                state.isLoading = true;
                state.isLoggedIn = true;
                state.logoutToast = toast.loading("Logging out...");
            })
            .addCase(logoutUser.fulfilled, state => {
                state.isLoading = false;
                state.isLoggedIn = false;
                state.token = "";
                state.user = null;
                state.allUsers = null;
                toast.update(state.logoutToast, {render: "Logout successful", isLoading: false, type: "success"});
                setTimeout(()=> { toast.dismiss()},2000);
            })
            .addCase(logoutUser.rejected, state => {
                state.isLoggedIn = false;
                state.isLoading = false;
                state.token = "";
                state.user = null;
                state.allUsers = null;
                toast.update(state.logoutToast, {render: "Logout failed", isLoading: false, type: "error"});
                setTimeout(()=> { toast.dismiss()},2000);
            })
    )
}

export default logoutBuilder;
