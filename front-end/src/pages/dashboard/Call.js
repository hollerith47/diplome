import React, {useEffect, useState} from 'react';
import {Box, Divider, IconButton, Link, Stack, Typography} from "@mui/material";
import { Phone} from "phosphor-react";
import {SimpleBarStyle} from "../../components/Scrollbar";
import {useTheme} from "@mui/material/styles";
import CreateCallDialog from "../../sections/main/CreateCallDialog";
import CallLogElement from "../../components/CallLogElement";
import {CALL_LOG} from "../../_data";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../redux/slices/authSlice";
import RightEmpty from "../../components/RightEmpty";
import SearchBar from "../../components/SearchBar";

const Call = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const {sideBar} = useSelector(store => store.app);

    const {allUsers} = useSelector(store => store.auth);

    const filteredUsers = allUsers?.filter(user =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    return (
        <>
            <Stack direction="row" sx={{width: "100%"}}>
                {/*  left */}
                <Box
                    sx={{
                        height: "100vh",
                        backgroundColor: (theme) => theme.palette.mode === "light" ? "#f8faff" : theme.palette.background,
                        width: 320,
                        boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)"
                    }}
                >
                    <Stack p={3} spacing={2} sx={{maxHeight: "100vh"}}>
                        {/*  title, search */}
                        <Stack>
                            <Typography variant="h5">Журнал звонков</Typography>
                        </Stack>
                        {/*  search */}
                        <Stack sx={{width: "100%"}} spacing={2}>
                            <SearchBar setSearchTerm={setSearchTerm} />
                            {/*group */}
                            <Stack spacing={1}>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1.5}
                                    justifyContent={"space-between"}
                                >
                                    <Typography
                                        variant={"subtitle2"}
                                        sx={{cursor: "pointer"}}
                                        component={Link}
                                        onClick={() => setOpenDialog(true)}
                                    >
                                        Начать новый разговор
                                    </Typography>
                                    <IconButton onClick={() => setOpenDialog(true)}>
                                        <Phone style={{color: theme.palette.primary.main}}/>
                                    </IconButton>
                                </Stack>
                                <Divider/>
                            </Stack>
                        </Stack>
                        <Stack
                            direction="column"
                            sx={{flexGrow: 1, height: "100%", overflowX: "hidden", overflowY: "scroll",}}
                        >
                            <SimpleBarStyle timeout={500} clickOnTrack={false}>
                                {filteredUsers?.map((item) => (
                                    <CallLogElement userData={item} logInfo={CALL_LOG}/>
                                ))}
                            </SimpleBarStyle>
                        </Stack>

                    </Stack>
                </Box>

                {/*  right */}
                {/* // TODO => implement conversations component on the right side */}
                <RightEmpty />
            </Stack>
            {openDialog && <CreateCallDialog open={openDialog} handleClose={handleCloseDialog}/>}
        </>
    );
};

export default Call;
