import React  from 'react';
import * as Yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import FormProvider, {RHFTextField} from "../../components/hook-form";
import {Alert, Button, Stack} from "@mui/material";
import {useTheme} from "@mui/material/styles";
// import {useNavigate} from "react-router-dom";

const ResetPasswordForm = () => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const ResetSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email must be a valid email address"),
  });

  const defaultValues = {
    email: "demo@htech-cloud.com",
  }
  const methods = useForm({
    resolver: yupResolver(ResetSchema),
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
