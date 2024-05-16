import * as Yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormProvider, {RHFTextField} from "../../components/hook-form";
import {Alert, Button, Checkbox, Stack, Typography} from "@mui/material";
import SubmittingLoader from "../../components/SubmittingLoader";
import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SetConnectionOnlyWithAudio, SetIdentity, SetRoomId, UpdateIsRoomHost} from "../../redux/slices/appSlice";
import {getRoomExists} from "../../utils/api";
const JoinForm = () => {
    const search = useLocation().search;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isRoomHost, connectionOnlyWithAudio} = useSelector(store => store.app);
    const JoinSchema = Yup.object().shape({
        meeting_id: Yup.string().required("Требуется ID встречи"),
        user_name: Yup.string().required("Требуется имя пользователя"),
    });
    const createRoomSchema = Yup.object().shape({
        user_name: Yup.string().required("Требуется имя пользователя"),
    })
    const defaultValues = {
        meeting_id: "",
        user_name: ""
    }
    const methods = useForm({
        resolver: yupResolver(isRoomHost ? createRoomSchema : JoinSchema),
        defaultValues,
    });

    const handleCancel= () => {
        navigate("/intro")
    }

    const {
        reset,
        setError,
        handleSubmit,
        formState: {errors, isSubmitting, isSubmitSuccessful}
    } = methods;

    useEffect(() => {
        const isRoomHost = new URLSearchParams(search).get("host");
        // TODO: set to the store that user is host
        dispatch(UpdateIsRoomHost(isRoomHost))

    }, [search, dispatch]);
    const onSubmit = async (data) => {
        try {
            await handleRoom(data);
        } catch (error) {
            reset();
            setError("afterSubmit", {
                ...error,
                message: "Встреча не найдена. Проверьте ID встречи и попробуйте снова.",
            })
        }
    }

    const handleRoom = async (data) => {

        dispatch(SetIdentity(data.user_name))
        if (isRoomHost){
            createRoom();
        }else{
            await joinRoom(data.meeting_id);
        }
    }

    const createRoom = () => {
        navigate("/room");
    }

    const joinRoom = async (roomId) => {
        const response = await getRoomExists(roomId);
        // console.log("joinRoom ID: " + roomId)
        // console.log("Username: " + username)
        const {roomExists, full} = response;
        if (roomExists) {
            if (full) {
                // room full
                setError("afterSubmit", {
                    message: "Встреча заполнена. Пожалуйста, попробуйте позже.",
                })
            }else {
                // join room
                dispatch(SetRoomId(roomId))
                navigate("/room");
            }
        }else {
            // room doesn't exist
            setError("afterSubmit", {
                message: "Встреча не найдена. Проверьте ID встречи и попробуйте снова.",
            })
        }

    }


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
                {isSubmitting && <SubmittingLoader />}
                {isSubmitSuccessful && <Alert severity="success">{"Форма успешно отправлена"}</Alert>}

                {!isRoomHost &&
                    <RHFTextField name="meeting_id" label="ID встречи"/>
                }
                <RHFTextField name="user_name" label="Введите ваше имя"/>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Checkbox checked={connectionOnlyWithAudio} onChange={(e)=> {
                        dispatch(SetConnectionOnlyWithAudio(e.target.checked))
                    }}/>
                    <Typography variant="subtitle2">Только аудио</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Button fullWidth variant="contained" type="submit">
                        {isRoomHost ? "Начать" : "Присоединиться"}
                    </Button>
                    <Button fullWidth variant="outlined" color="error" onClick={handleCancel}>
                        Отменить
                    </Button>
                </Stack>
            </Stack>

        </FormProvider>
    );
};

export default JoinForm;
