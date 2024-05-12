import React, {useState} from 'react';
import * as Yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigate, Link as RouterLink} from "react-router-dom";
import {Alert, Button, IconButton, InputAdornment, Link, Stack} from "@mui/material";
import {Eye, EyeSlash} from "phosphor-react";
import {useTheme} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";

import FormProvider, {RHFTextField} from "../../components/hook-form";
import {loginUser} from "../../redux/slices/authSlice";
import SubmittingLoader from "../../components/SubmittingLoader";

const LoginForm = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const {isLoading} = useSelector(store => store.auth);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const LoginSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email must be a valid email address"),
        password: Yup.string().required("Password is required"),
    });

    const defaultValues = {
        email: "makiese@yandex.ru",
        password: "demo1234"
    }
    const methods = useForm({
        resolver: yupResolver(LoginSchema),
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
            const response = await dispatch(loginUser(data))
            console.log(response)
            if (response.type === "user/login/fulfilled"){
                setTimeout(() => {
                    navigate("/app");
                    reset();
                }, 1000);
            }else{
                setError("afterSubmit", {
                    message: response.payload,
                })
            }
        } catch (error) {
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
                {isSubmitting && <SubmittingLoader />}
                {isSubmitSuccessful && <Alert severity="success">{"form submitted successfully"}</Alert>}

                <RHFTextField name={"email"} label="Email address"/>
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
            </Stack>
            <Stack alignItems={"flex-end"} sx={{my: 2}}>
                <Link
                    to={"/auth/reset-password"}
                    component={RouterLink}
                    variant={"body2"}
                    color={"inherit"}
                    underline={"always"}
                >
                    Forgot Password?
                </Link>
            </Stack>
            <Button
                fullWidth
                color={"inherit"}
                size={"large"}
                type={"submit"}
                variant={"contained"}
                disabled={isLoading}
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
                    '&:hover': {
                        backgroundColor: "text.primary",
                        color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800"
                    }
                }}
            >
                Log in now
            < /Button>
        </FormProvider>
    );
};

export default LoginForm;
