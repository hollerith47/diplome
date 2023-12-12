import React from 'react';
import * as Yup from 'yup';

import DialogContainer from "../../components/DialogContainer";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormProvider, {RHFTextField} from "../../components/hook-form";
import {Button, Stack} from "@mui/material";
import RHFAutocomplete from "../../components/hook-form/RHFAutocomplete";

const MEMBERS = ["Member 1" , "Member 2" , "Member 3" , "Member 4"];

const CreateGroupForm = ({handleClose}) => {
  const NewGroupSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    members: Yup.array().min(2, "Must have at least 2 members"),
  })

  const defaultValues = {
    title: "",
    members: [],
  }

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting, isSubmitSuccessful, isValid}
  } = methods;
  const onSubmit = async (data) =>{
    try {
      // send to backend
      console.log("DATA", data)

    }catch (error){
      console.log("error",error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      })
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} mt={3}>
        <RHFTextField name="title" label={"Group Name"} />
        <RHFAutocomplete
          name={"members"}
          label={"Members"}
          multiple
          freeSolo
          options={MEMBERS.map((option)=> option)}
          ChipProps={{size: "medium"}}
        />
        <Stack spacing={2} direction={"row"} alignItems={"center"} justifyContent={"end"}>
          <Button onClick={handleClose} >
            Cancel
          </Button>
          <Button type={"submit"} variant={"contained"}>
            Create
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  )
}
const CreateGroup = ({open, handleClose}) => {
  return (
    <>
      <DialogContainer
        openDialog={true}
        maxWidth={"xs"}
        handleCloseDialog={handleClose}
        title={"Create New Group"}
      >
      {/*  form */}
        <CreateGroupForm handleClose={handleClose}/>


      </DialogContainer>
    </>

  );
};

export default CreateGroup;
