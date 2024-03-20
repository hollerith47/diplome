import {toast} from "react-toastify";
import {forgotPassword} from "../slices/authSlice";

const ForgotPasswordBuilder = (builder) => {
    return (
        builder
            .addCase(forgotPassword.pending, (state, {payload}) => {
                state.isLoading = true;
                state.forgotPasswordToast = toast.loading("Sending the reset code...");
            })
            .addCase(forgotPassword.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                toast.update(state.forgotPasswordToast, {
                    render: "Reset code sent check your email",
                    isLoading: false,
                    type: "success"
                });
                setTimeout(() => {
                    toast.dismiss()
                }, 2000);
            })
            .addCase(forgotPassword.rejected, (state, {payload}) => {
                state.isLoading = false;
                toast.update(state.forgotPasswordToast, {
                    render: "User email not registered yet",
                    isLoading: false,
                    type: "error"
                });
                setTimeout(() => {
                    toast.dismiss()
                }, 2000);
            })
    );
};

export default ForgotPasswordBuilder;
