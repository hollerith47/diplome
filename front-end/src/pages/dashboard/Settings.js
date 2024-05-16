import React, {useState} from 'react';
import {Avatar, Box, Divider, IconButton, Stack, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import {CaretLeft } from "phosphor-react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UpdateSidebarLink} from "../../redux/slices/appSlice";
import {Settings_Menu} from "../../_data/_settings";
import RightEmpty from "../../components/RightEmpty";


const Settings = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const {user} = useSelector(store =>store.auth);
    const dispatch = useDispatch();
    const isDesktop = useResponsive("up", "md");
    const [openShortcuts, setOpenShortcuts] = useState(false);

    const handleOpenShortcuts = () => {
        setOpenShortcuts(true);
        // console.log("clicked")
    }

    const handleCloseShortcuts = () => {
        setOpenShortcuts(false)
    }

    const eventHandlers = {
        1: ()=>{},
        2: ()=>{},
        3: ()=>{},
        4: ()=>{},
        5: ()=>{},
        6: ()=>{},
        7: handleOpenShortcuts,
        8: ()=>{},
    }


    return (
        <>
            <Stack direction="row" sx={{width: "100%", height: "100%"}}>
                {/*  Profile */}
                <Box
                    sx={{
                        position: "relative",
                        width: isDesktop ? 320 : "100vw",
                        backgroundColor: theme.palette.mode === 'light'
                            ? '#f8faff'
                            : theme.palette.background,
                        boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
                        overflowY: "scroll",
                        height: "100vh",
                    }}>
                    <Stack p={3} spacing={5}>
                        {/*Header */}
                        <Stack direction={"row"} spacing={3} alignItems={"center"}>
                            <IconButton onClick={() => {
                                navigate("/app");
                                dispatch(UpdateSidebarLink({linkSelected: 0}))
                            }}>
                                <CaretLeft/>
                            </IconButton>
                            <Typography variant="h6">Настройки</Typography>
                        </Stack>
                        {/*profile*/}
                        <Stack direction="row" spacing={3} alignItems={"center"}>
                            <Avatar sx={{width: 56, height: 56}} src={user.image}
                                    alt={user.last_name}/>
                            <Stack spacing={0.5}>
                                <Typography variant="article">{user.first_name} {" "}{user.last_name}</Typography>
                                <Typography variant="body2">{user.about.substring(0,25)}...</Typography>
                            </Stack>
                        </Stack>
                        {/* settings section*/}
                        <Stack spacing={2}>
                            {Settings_Menu.map(({icon, text, key, onclick}) => (
                                <>
                                    <Stack
                                        sx={{cursor: 'pointer'}}
                                        direction="row"
                                        spacing={1}
                                        alignItems={"center"}
                                        onClick={eventHandlers[key]}
                                    >
                                        {icon}
                                        <Typography variant="body2">{text}</Typography>
                                    </Stack>
                                    {key !== 8 && <Divider/>}
                                </>
                            ))}
                        </Stack>
                    </Stack>
                </Box>
                {/*  setting right side */}
                <RightEmpty />
            </Stack>
            {/*{openShortcuts && <Shortcuts open={openShortcuts} handleClose={handleCloseShortcuts}/>}*/}
        </>)
};


export default Settings;
