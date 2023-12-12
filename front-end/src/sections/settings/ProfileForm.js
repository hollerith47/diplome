import React, {useCallback} from 'react';
import {useTheme} from "@mui/material/styles";
import * as Yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import FormProvider, {RHFTextField} from "../../components/hook-form";
import {Alert, Button, Stack} from "@mui/material";

const ProfileForm = () => {
  const theme = useTheme();

  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    avatarUrl: Yup.string().required("Avatar is required").nullable(true),
  })

  const defaultValues = {
    name: "",
    about: "",
  }

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  })

  const {
    reset,
    watch,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting, isSubmitSuccessful}
  } = methods;

  const values = watch();

  const handleDrop = useCallback((acceptedFiles)=>{
    const file = acceptedFiles[0];
    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file)
    })

    if (file){
      setValue("avatarUrl", newFile, {shouldValidate: true})
    }

  }, [setValue])

  const onSubmit = async (data) => {
    try {
      // TODO : submit data to backend server
      console.log("Profile Info", data)

    } catch (error) {
      console.log(error);
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
        <RHFTextField name={"name"} label={"Name"} helperText={"This name is visible to your contacts"}/>
        <RHFTextField multiline name={"about"} rows={3} maxRows={5} label={"About"} />
        <Stack spacing={2} direction={"row"} alignItems={"center"} justifyContent={"end"}>
          <Button color={"primary"} size={"large"} type={"submit"} variant={"outlined"}>
            Save
          </Button>
        </Stack>

      </Stack>

    </FormProvider>
  );
};

export default ProfileForm;
