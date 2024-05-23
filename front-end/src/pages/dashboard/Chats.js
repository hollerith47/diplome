import React, {useState} from 'react';
import {Box, Button, Divider, IconButton, Stack, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {ArchiveBox, Users} from "phosphor-react";
import {SimpleBarStyle} from "../../components/Scrollbar";
import useResponsive from "../../hooks/useResponsive";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../redux/slices/authSlice";
import ListUsersDialog from "../../sections/main/ListUsersDialog";
import BottomNav from "../../layouts/dashboard/BottonNav";
import ChatElement from "../../components/ChatElement";
import SearchBar from "../../components/SearchBar";

const Chats = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const isDesktop = useResponsive("up", "md");
    const { user_conversations } = useSelector(store => store.messages.chat);
    const [searchTerm, setSearchTerm] = useState("");

    const userConversationFiltered = user_conversations?.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const {allUsers} = useSelector(store => store.auth);
    const usersArray = allUsers;

    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleUserButton = () => {
        if (!allUsers) {
            dispatch(getUsers());
        }
        setOpenDialog(true);
    }

    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    width: isDesktop ? 320 : "100vw",
                    backgroundColor: theme.palette.mode === 'light'
                        ? '#f8faff'
                        : theme.palette.background,
                    boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
                }}>
                {/*{!isDesktop && (*/}
                {/*    <BottomNav />*/}
                {/*)}*/}

                <Stack p={3} spacing={2} sx={{height: "100vh"}}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography variant="h5">
                            Чаты
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            {/* // TODO: put a conditional rendering */}
                            <IconButton onClick={handleUserButton}>
                                <Users/>
                            </IconButton>
                            {/*<IconButton>*/}
                            {/*    <CircleDashed/>*/}
                            {/*</IconButton>*/}
                        </Stack>
                    </Stack>
                    <Stack sx={{width: "100%"}}>
                        <SearchBar setSearchTerm={setSearchTerm} />
                    </Stack>
                    <Stack spacing={1}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1.5}
                        >
                            <ArchiveBox size={24}/>
                            <Button>Архив</Button>
                        </Stack>
                        <Divider/>
                    </Stack>
                    <Stack
                        direction="column"
                        sx={{flexGrow: 1, overflowX: "hidden", overflowY: "scroll", height: "100%"}}>
                        <SimpleBarStyle timeout={500} clickOnTrack={false}>
                            <Stack spacing={2.4}>
                            </Stack>
                            <Stack spacing={2.4}>
                                <Typography variant="subtitle2" sx={{color: "#676767"}}>
                                    Все чаты
                                </Typography>
                                {userConversationFiltered?.map((item, idx) => {
                                    return <ChatElement {...item}  key={idx}/>
                                })}
                            </Stack>
                        </SimpleBarStyle>
                    </Stack>
                </Stack>
            </Box>
            {openDialog && allUsers &&
                <ListUsersDialog
                    open={openDialog}
                    handleClose={handleCloseDialog}
                    usersList={usersArray}
                />
            }
        </>
    );
};

export default Chats;
