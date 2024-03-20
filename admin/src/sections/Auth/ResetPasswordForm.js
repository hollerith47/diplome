import { FormProvider, RHFTextField, RHFOtpCodes } from '../../components/hook-form';
import { Stack, useTheme, Alert, Button, InputAdornment, IconButton } from '@mui/material';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Eye, EyeSlash } from 'phosphor-react';

const ResetPasswordForm = () => {
    const theme = useTheme();
    const { isLoading } = useSelector(store => store.auth);
    const inputs = ['code1', 'code2', 'code3', 'code4', 'code5', 'code6'];
    const [isSucceed, setIsSucceed] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const ResetSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email(
          'Email must be a valid email address')
    });

    const ResetSchema_with_password = Yup.object().shape({
        email: Yup.string().required('Email is required').email(
          'Email must be a valid email address'),
        password: Yup.string().required('New password is required'),
        code1: Yup.string().required('OTP is required'),
        code2: Yup.string().required('OTP is required'),
        code3: Yup.string().required('OTP is required'),
        code4: Yup.string().required('OTP is required'),
        code5: Yup.string().required('OTP is required'),
        code6: Yup.string().required('OTP is required'),
        password_confirmation: Yup.string().required('Confirm Password is required').oneOf([
            Yup.ref('password'), null
        ], 'Confirm Password not match with password')
    });

    const defaultValues = {
        email: 'demo@htech.com'
    };

    const methods = useForm({
        resolver: yupResolver(isSucceed ? ResetSchema_with_password : ResetSchema),
        defaultValues
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful }
    } = methods;

    const onSubmit = async (data) => {
        try {
            if (isSucceed) {
                const codeOtp = data.code1
                  + ''
                  + data.code2
                  + ''
                  + data.code3
                  + ''
                  + data.code4
                  + ''
                  + data.code5
                  + ''
                  + data.code6;
                const dataToSend = {
                    email: data.email,
                    password: data.password,
                    password_confirmation: data.password_confirmation,
                    otp: codeOtp
                };
                console.log({ dataToSend });
            }else{
                console.log("form submitted with email only", data);
            }
        } catch (error) {
            console.log(error);
            reset();
            setError("afterSubmit", {
                ...error,
                message: error.message,
            })
        }
    };

    return (
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
              {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
              {isSubmitting && <Alert severity="info"> is submitting ...</Alert>}
              {isSubmitSuccessful &&
                <Alert security="success">
                    {isSucceed ? "check your email and provide the otp code" : "form submitted successfully"}
                </Alert>
              }
              <RHFTextField name={"email"} label="Email address"/>
              {isSucceed &&
                <>
                    {/*  TODO: remplace this Otp by 6 digits like RHFCodes */}
                    {/*<RHFTextField name={"otp"} label="Provide the email code confirmation"/>*/}
                    <RHFOtpCodes keyName={"code"} inputs={inputs} />
                    <RHFTextField
                      name={"password"}
                      label="New Password"
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
                      label="Confirm Password"
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
                  {!isSucceed ? "Send Request" : "Reset Password"}
              < /Button>
          </Stack>
      </FormProvider>
    );
};

export default ResetPasswordForm;