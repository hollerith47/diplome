import React from 'react';
import * as Yup from 'yup';

import DialogContainer from "../../components/dialog/DialogContainer";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormProvider, {RHFTextField} from "../../components/hook-form";
import {Button, Stack} from "@mui/material";
import RHFAutocomplete from "../../components/hook-form/RHFAutocomplete";
import {useSelector} from "react-redux";


const CreateGroupForm = ({handleClose}) => {
    const NewGroupSchema = Yup.object().shape({
        title: Yup.string().required("Название обязательно"),
        members: Yup.array().min(2, "Должно быть минимум 2 участника"),
    })


    const {allUsers} = useSelector(store => store.auth);
    const members = allUsers.map((user) => `${user.first_name} ${user.last_name}`);
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
    const onSubmit = async (data) => {
        try {
            // send to backend
            console.log("DATA", data)

        } catch (error) {
            console.log("error", error);
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
                <RHFTextField name="title" label={"Название группы"}/>
                <RHFAutocomplete
                    name={"members"}
                    label={"Участники"}
                    multiple
                    freeSolo
                    options={members.map((option) => option)}
                    ChipProps={{size: "medium"}}
                />
                <Stack spacing={2} direction="row" alignItems={"center"} justifyContent="end">
                    <Button onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button type={"submit"} variant={"contained"}>
                        Создать
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    )
}
const CreateGroupDialog = ({open, handleClose}) => {
    return (
        <>
            <DialogContainer
                openDialog={open}
                maxWidth={"xs"}
                handleCloseDialog={handleClose}
                title={"Создать новую группу"}
            >
                {/*  form */}
                <CreateGroupForm handleClose={handleClose}/>
            </DialogContainer>
        </>

    );
};

export default CreateGroupDialog;
