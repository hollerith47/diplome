import React, {useState} from 'react';
import {useTheme} from "@mui/material/styles";
// import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormProvider, {RHFTextField} from "../../components/hook-form";
import {Alert, Button, IconButton, InputAdornment, Stack} from "@mui/material";
import {Eye, EyeSlash} from "phosphor-react";

const NewPasswordForm = () => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const NewPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("New password is required"),
    otp: Yup.string().required("OTP is required"),
    password_confirmation: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("newPassword"), null], "Confirm Password not match with password"),
  });

  const defaultValues = {
    email: "",
    password: "",
    password_confirmation: "",
    otp: "",
  }
  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
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
      console.log("form submitted", data);
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
        {isSubmitSuccessful && <Alert security="success">{"form submitted successfully"}</Alert>}
        <RHFTextField name={"email"} label="Email address"/>
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
          name={"confirmPassword"}
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
          Submit
        < /Button>
      </Stack>
    </FormProvider>
  );
};

export default NewPasswordForm;
