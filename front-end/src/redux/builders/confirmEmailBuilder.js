import {toast} from "react-toastify";
import {confirmEmail} from "../slices/authSlice";

const confirmEmailBuilder = (builder) => {
    return (
        builder
            .addCase(confirmEmail.pending, state => {
                state.isLoading = true;
                state.confirmEmailToast = toast.loading("Confirming email...");
            })
            .addCase(confirmEmail.fulfilled, (state, {payload} )=> {
                state.isLoading = false;
                toast.update(state.confirmEmailToast, {render: "Email confirmed", isLoading: false, type: "success"});
                setTimeout(()=> { toast.dismiss()},2000);
            })
            .addCase(confirmEmail.rejected, (state, {payload} )=> {
                state.isLoading = false;
                toast.update(state.confirmEmailToast, {render: "Email confirmation failed", isLoading: false, type: "error"});
                setTimeout(()=> { toast.dismiss()},2000);
                console.log(payload)
            })
    )
}

export default confirmEmailBuilder;
