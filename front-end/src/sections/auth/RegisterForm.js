import React, {useState} from 'react';
import * as Yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Alert, Button, IconButton, InputAdornment, Stack} from "@mui/material";
import {Eye, EyeSlash} from "phosphor-react";
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {confirmEmail, registerUser} from "../../redux/slices/authSlice";
import SubmittingLoader from "../../components/SubmittingLoader";
import FormProvider, {RHFTextField} from "../../components/hook-form";
import RHFOtpCodes from "../../components/hook-form/RHFOtpCodes";

const RegisterForm = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const {isLoading} = useSelector(store => store.auth);
    const [isSucceed, setIsSucceed] = useState(false);
    const inputs = ["code1", "code2", "code3", "code4", "code5", "code6"];
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
        password_confirmation: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    const registerSchema_with_otp = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email must be a valid email address"),
        code1: Yup.string().required("OTP is required"),
        code2: Yup.string().required("OTP is required"),
        code3: Yup.string().required("OTP is required"),
        code4: Yup.string().required("OTP is required"),
        code5: Yup.string().required("OTP is required"),
        code6: Yup.string().required("OTP is required"),
    });

    const defaultValues = {
        first_name: "",
        last_name: "",
        email: "demo@htech-cloud.com",
        password: "demo12345",
        password_confirmation: "demo12345"
    }
    const methods = useForm({
        resolver: yupResolver(isSucceed ? registerSchema_with_otp : RegisterSchema),
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
            // submit _data to server api
            console.log(data)
            if (isSucceed) {
                const codeOtp = data.code1 + "" + data.code2 + "" + data.code3 + "" + data.code4 + "" + data.code5 + "" + data.code6;
                const {email} = data;
                const confirmationData = {
                    email: email,
                    otp: codeOtp
                }
                setOtpIsSucceed(true)
                const confirmResponse = await dispatch(confirmEmail(confirmationData))
                if (confirmResponse.type === "user/confirm-email/fulfilled") {
                    setTimeout(() => {
                        navigate("/auth/login");
                        reset();
                    }, 2000);
                }
            } else {
                const response = await dispatch(registerUser(data));
                if (response.type === "user/register/fulfilled") {
                    setIsSucceed(true);
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
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
                {isSubmitting && <SubmittingLoader/>}
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
                    // <RHFTextField name={"otp"} label="Provide the email code confirmation"/>
                    <RHFOtpCodes keyName={"code"} inputs={inputs}/>
                }
            </Stack>
            <Button
                fullWidth
                color="inherit"
                size="large"
                type={"submit"}
                variant="contained"
                disabled={isLoading}
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
                {isSucceed ? "Confirm Email" : "Create Account"}
            < /Button>
        </FormProvider>
    );
};

export default RegisterForm;
