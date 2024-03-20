import React, {useCallback} from 'react';
import {useTheme} from "@mui/material/styles";
import * as Yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import FormProvider, {RHFTextField} from "../../components/hook-form";
import {Alert, Button, Stack} from "@mui/material";
import {useSelector} from "react-redux";

const ProfileForm = () => {
  const theme = useTheme();
  const { user } = useSelector(store => store.auth);
  const [isFile, setIsFile] = React.useState(false);

  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    avatarUrl: isFile ? Yup.string().required("Avatar is required").nullable() : Yup.string(),
  })

  const defaultValues = {
    name: user?.first_name + " " + user?.last_name,
    about: user?.about,
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
        setIsFile(true)
      setValue("avatarUrl", newFile, {shouldValidate: true})
    }

  }, [setValue])

  const onSubmit = async (data) => {
    try {
      // TODO : submit _data to backend server
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
        <RHFTextField multiline name={"about"} minRows={3} maxRows={5} label={"About"} />
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
