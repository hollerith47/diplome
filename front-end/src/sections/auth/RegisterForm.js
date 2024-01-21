import React, {useState} from 'react';
import * as Yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import FormProvider, {RHFTextField} from "../../components/hook-form";
import {Alert, Button, IconButton, InputAdornment, Stack} from "@mui/material";
import {Eye, EyeSlash} from "phosphor-react";
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {confirmEmail, loginUser, registerUser} from "../../redux/slices/authSlice";
import SubmittingLoader from "../../components/SubmittingLoader";

const LoginForm = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { isLoading } = useSelector(store => store.auth);
    const [isSucceed, setIsSucceed] = useState(false);
    const [isOtpSucceed, setOtpIsSucceed] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const RegisterSchema = Yup.object().shape({
        first_name: Yup.string().required("First Name is required"),
        last_name: Yup.string().required("Last Name is required"),
        email: Yup.string()
            .required("Email is required")
            .email("Email must be a valid email address"),
        password: Yup.string().required("Password is required"),
        password_confirmation: Yup.string().required("Password is required"),
        otp: isSucceed ? Yup.string().required("Otp is required check your email") : Yup.string(),
    });

    const defaultValues = {
        first_name: "",
        last_name: "",
        email: "demo@htech-cloud.com",
        password: "demo1234",
        password_confirmation: "demo1234",
        otp: "",
    }
    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: {errors, isSubmitting, isSubmitSuccessful}
    } = methods;

    const onSubmit = async (data) => {
        try {
            // submit data to server api
            if (data.otp === "") {
                const response = await dispatch(registerUser(data));
                // console.log("registration form submitted", data);
                if (response.type === "user/register/fulfilled") {
                    setIsSucceed(true);
                }
            }
            //TODO:  if registration success set isSucceed to true then submit the otp with email
            if (data.otp !== "") {
                const {email, otp} = data;
                const confirmationData = {
                    email,
                    otp
                }
                console.log({email, otp});
                setOtpIsSucceed(true)
                const confirmResponse = await dispatch(confirmEmail(confirmationData))
                if (confirmResponse.type === "user/confirm-email/fulfilled") {
                    setTimeout(() => {
                        navigate("/auth/login");
                        reset();
                    }, 2000);
                }
            }
        } catch (error) {
            console.log(error);
            reset();
            setError("afterSubmit", {
                ...error,
                message: error.message,
            })
        }
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!!errors.afterSubmit && <Alert security="error">{errors.afterSubmit.message}</Alert>}
                {isSubmitting && <SubmittingLoader />}
                {!isOtpSucceed &&
                    isSubmitSuccessful &&
                    <Alert security="success">
                        {isSucceed ? "check your email and provide the otp code" : "form submitted successfully"}
                    </Alert>
                }

                {!isSucceed &&
                    <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
                        <RHFTextField name={"first_name"} label={"First Name"}/>
                        <RHFTextField name={"last_name"} label={"Last Name"}/>
                    </Stack>
                }

                <RHFTextField name={"email"} label="Email address"/>
                {!isSucceed ?
                    <>
                        <RHFTextField
                            name={"password"}
                            label="Password"
                            type={showPassword ? 'text' : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position={"end"}>
                                        <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                                            {showPassword ? <Eye/> : <EyeSlash/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <RHFTextField
                            name={"password_confirmation"}
                            label="Confirm Password"
                            type={showPassword ? 'text' : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position={"end"}>
                                        <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                                            {showPassword ? <Eye/> : <EyeSlash/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </> :
                    <RHFTextField name={"otp"} label="Provide the email code confirmation"/>
                }

            </Stack>
            <Button
                fullWidth
                color="inherit"
                size={"large"}
                type={"submit"}
                variant={"contained"}
                sx={{
                    mt: 5,
                    backgroundColor: theme.palette.primary.main,
                    color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
                    '&:hover': {
                        backgroundColor: "text.primary",
                        color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800"
                    }
                }}
            >
                {isSucceed ? "Confirm Email" : "Create Account" }
            < /Button>
        </FormProvider>
    );
};

export default LoginForm;
