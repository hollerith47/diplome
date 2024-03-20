import {toast} from "react-toastify";
import {resetUserPassword} from "../slices/authSlice";

const ResetUserPasswordBuilder = (builder) => {
    return (
        builder
            .addCase(resetUserPassword.pending, state => {
                state.isLoading = true;
                state.resetPasswordToast = toast.loading("Sending the reset code email...");
            })
            .addCase(resetUserPassword.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                toast.update(state.resetPasswordToast, {
                    render: "Reset password successful login please",
                    isLoading: false,
                    type: "success"
                });
                setTimeout(() => {
                    toast.dismiss()
                }, 2000);
            })
            .addCase(resetUserPassword.rejected, (state, {payload}) => {
                state.isLoading = false;
                toast.update(state.resetPasswordToast, {
                    render: "Reset password failed",
                    isLoading: false,
                    type: "error"
                });
                setTimeout(() => {
                    toast.dismiss()
                }, 2000);
                console.log(payload)
            })
    );
};

export default ResetUserPasswordBuilder;
