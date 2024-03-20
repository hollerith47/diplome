import {toast} from "react-toastify";
import {registerUser} from "../slices/authSlice";

const registerBuilder = (builder) => {
    return (
        builder
            .addCase(registerUser.pending, state => {
                state.isLoading = true;
                state.registerToast = toast.loading("Registration...");
            })
            .addCase(registerUser.fulfilled, (state, {payload} )=> {
                state.isLoading = false;
                state.token = payload.token;
                toast.update(state.logoutToast, {render: "Registration successful confirm your email", isLoading: false, type: "success"});
                setTimeout(()=> { toast.dismiss()},2000);
                // console.log(payload)
            })
            .addCase(registerUser.rejected, (state, {payload} )=> {
                state.isLoading = false;
                state.token = "";
                toast.update(state.logoutToast, {render: "Registration failed", isLoading: false, type: "error"});
                setTimeout(()=> { toast.dismiss()},2000);
                console.log(payload)
            })
    )
}

export default registerBuilder;
