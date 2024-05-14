import React, {useState} from 'react';
import * as Yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import FormProvider, {RHFTextField} from "../../components/hook-form";
import {Alert, Button, IconButton, InputAdornment, Stack} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Eye, EyeSlash} from "phosphor-react";
import SubmittingLoader from "../../components/SubmittingLoader";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword, resetUserPassword} from "../../redux/slices/authSlice";
import {useNavigate} from "react-router-dom";
import RHFOtpCodes from "../../components/hook-form/RHFOtpCodes";

const ResetPasswordForm = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const {isLoading} = useSelector(store => store.auth);
    const navigate = useNavigate();
    const inputs = ["code1", "code2", "code3", "code4", "code5", "code6"];
    const [isSucceed, setIsSucceed] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // const navigate = useNavigate();
    const ResetSchema = Yup.object().shape({
        email: Yup.string().required("Требуется адрес электронной почты").email("Адрес электронной почты должен быть действительным"),
    });

    const ResetSchema_with_password = Yup.object().shape({
        email: Yup.string().required("Требуется адрес электронной почты").email("Адрес электронной почты должен быть действительным"),
        password: Yup.string().required("Новый пароль обязателен"),
        code1: Yup.string().required("OTP обязателен"),
        code2: Yup.string().required("OTP обязателен"),
        code3: Yup.string().required("OTP обязателен"),
        code4: Yup.string().required("OTP обязателен"),
        code5: Yup.string().required("OTP обязателен"),
        code6: Yup.string().required("OTP обязателен"),
        password_confirmation: Yup.string().required("Подтверждение пароля обязательно").oneOf([Yup.ref("password"), null], "Подтверждение пароля не совпадает с паролем"),
    });

    const defaultValues = {
        email: "demo@htech-cloud.com",
    }

    const methods = useForm({
        resolver: yupResolver(isSucceed ? ResetSchema_with_password : ResetSchema),
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
            if (isSucceed) {
                const codeOtp = data.code1+""+data.code2+""+data.code3+""+data.code4+""+data.code5+""+data.code6;
                const dataToSend = {
                    email: data.email,
                    password: data.password,
                    password_confirmation: data.password_confirmation,
                    otp: codeOtp
                }
                const response = await dispatch(resetUserPassword(dataToSend));
                if (response.type === "user/reset-password/rejected") {
                    setError("afterSubmit", {
                        message: response.payload ? response.payload : "Электронная почта еще не зарегистрирована",
                    })
                }
                if (response.type === "user/reset-password/fulfilled") {
                    setTimeout(() => {
                        navigate("/auth/login");
                        reset();
                    }, 1300);
                }

            } else {
                // console.log("form submitted second", _data);
                const response = await dispatch(forgotPassword(data));
                if (response.type === "user/forgot-password/rejected") {
                    setError("afterSubmit", {
                        message: response.payload,
                    })
                }
                if (response.type === "user/forgot-password/fulfilled") {
                    setIsSucceed(true);
                }
            }

            // navigate("/app");
            // reset();

        } catch (error) {
            // console.log(error);
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
                {isSubmitSuccessful &&
                    <Alert security="success">
                        {isSucceed ? "Проверьте свою электронную почту и введите полученный одноразовый пароль (OTP)" : "Форма успешно отправлена"}
                    </Alert>
                }

                <RHFTextField name={"email"} label="Адрес электронной почты"/>
                {isSucceed &&
                    <>
                        {/*<RHFTextField name={"otp"} label="Provide the email code confirmation"/>*/}
                        <RHFOtpCodes keyName={"code"} inputs={inputs} />
                        <RHFTextField
                            name={"password"}
                            label="Новый пароль"
                            type={showNewPassword ? 'text' : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position={"end"}>
                                        <IconButton onClick={() => setShowNewPassword((prev) => !prev)}>
                                            {showNewPassword ? <Eye/> : <EyeSlash/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <RHFTextField
                            name={"password_confirmation"}
                            label="Подтвердите пароль"
                            type={showConfirmPassword ? 'text' : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position={"end"}>
                                        <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                            {showConfirmPassword ? <Eye/> : <EyeSlash/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </>
                }

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
                    {!isSucceed ? "Отправить запрос" : "Сбросить пароль"}
                < /Button>
            </Stack>
        </FormProvider>
    );
};

export default ResetPasswordForm;
