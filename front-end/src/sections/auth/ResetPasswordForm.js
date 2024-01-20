import React, {useState} from 'react';
import * as Yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import FormProvider, {RHFTextField} from "../../components/hook-form";
import {Alert, Button, IconButton, InputAdornment, Stack} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Eye, EyeSlash} from "phosphor-react";
// import {useNavigate} from "react-router-dom";

const ResetPasswordForm = () => {
  const theme = useTheme();
  const [isSucceed, setIsSucceed] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const navigate = useNavigate();
  const ResetSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email must be a valid email address"),
  });

  const ResetSchema_with_password = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email must be a valid email address"),
    password: Yup.string().required("New password is required"),
    otp: Yup.string().required("OTP is required"),
    password_confirmation: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("password"), null], "Confirm Password not match with password"),
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
      // submit data to server api
      if (isSucceed) {
        console.log("form submitted", data);
      } else {
        console.log("form submitted", data);
        setIsSucceed(true);
      }


      // navigate("/app");
      reset();

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
        {isSubmitting && <Alert security="info">{"form is submitting ..."}</Alert>}
        {isSubmitSuccessful &&
          <Alert security="success">
            {isSucceed ?  "check your email and provide the otp code" : "form submitted successfully" }
          </Alert>}

        <RHFTextField name={"email"} label="Email address"/>
        {isSucceed &&
          <>
            <RHFTextField name={"otp"} label="Provide the email code confirmation"/>
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
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
            '&:hover': {
              backgroundColor: "text.primary",
              color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800"
            }
          }}
        >
          Send Request
        < /Button>
      </Stack>
    </FormProvider>
  );
};

export default ResetPasswordForm;
