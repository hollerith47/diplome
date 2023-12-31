import React, {useState} from 'react';
import * as Yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import FormProvider, {RHFTextField} from "../../components/hook-form";
import {Alert, Button, IconButton, InputAdornment, Stack} from "@mui/material";
import {Eye, EyeSlash} from "phosphor-react";
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "demo@htech-cloud.com",
    password: "demo1234"
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
      console.log("registration form submitted", data);
      setTimeout(() => {
        navigate("/auth/login");
      }, 3500);

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
        {isSubmitSuccessful && <Alert security="success">{"Registration successfully please log in now"}</Alert>}

        <Stack direction={{ xs: "column", sm: "row"}} spacing={2}>
          <RHFTextField name={"firstName"} label={"First Name"} />
          <RHFTextField name={"lastName"} label={"Last Name"} />
        </Stack>

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
      <Button
        fullWidth
        color={"inherit"}
        size={"large"}
        type={"submit"}
        variant={"contained"}
        sx={{
          mt:5,
          backgroundColor: theme.palette.primary.main,
          color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
          '&:hover': {
            backgroundColor: "text.primary",
            color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800"
          }
        }}
      >
        Create Account
      < /Button>
    </FormProvider>
  );
};

export default LoginForm;
