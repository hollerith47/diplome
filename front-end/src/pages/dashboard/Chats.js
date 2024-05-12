import React, {useEffect, useState} from 'react';
import {Box, Button, Divider, IconButton, Stack, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {ArchiveBox, CircleDashed, MagnifyingGlass, Users} from "phosphor-react";
import {Search, SearchIconWrapper, StyledInputBase} from "../../components/Search";
import {ChatList} from "../../_data";
import {SimpleBarStyle} from "../../components/Scrollbar";
import useResponsive from "../../hooks/useResponsive";
// import {ChatElement} from "../../components/ChatElements";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../redux/slices/authSlice";
import ListUsersDialog from "../../sections/main/ListUsersDialog";
import {socket} from "../../socket";
import {FetchDirectConversations} from "../../redux/slices/conversationSlice";
import BottomNav from "../../layouts/dashboard/BottonNav";
import ChatElement from "../../components/ChatElement";



const Chats = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const isDesktop = useResponsive("up", "md");
    const user_id = useSelector(store => store.auth.user._id);

    const {conversations} = useSelector(store => store.conversation.direct_chat);

    console.log("conversations",conversations)

    const {allUsers} = useSelector(store => store.auth);
    const usersArray = allUsers;

    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    useEffect(() => {
        socket.emit('get_direct_conversation', {user_id}, (data) => {
            console.log(data);
            dispatch(FetchDirectConversations({conversations: data}));
        });
    }, [])


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
                {!isDesktop && (
                    <BottomNav />
                )}

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
                            <IconButton onClick={() => {
                                if (!allUsers) {
                                    dispatch(getUsers());
                                }

                                setOpenDialog(true);
                            }}>
                                <Users/>
                            </IconButton>
                            <IconButton>
                                <CircleDashed/>
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Stack sx={{width: "100%"}}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color="#709CE6"/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Поиск…"
                                inputProps={{"aria-label": "search"}}
                            />
                        </Search>
                    </Stack>
                    <Stack spacing={1}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1.5}
                        >
                            <ArchiveBox size={24}/>
                            <Button>Archive</Button>
                        </Stack>
                        <Divider/>
                    </Stack>
                    <Stack
                        direction="column"
                        sx={{flexGrow: 1, overflowX: "hidden", overflowY: "scroll", height: "100%"}}>
                        <SimpleBarStyle timeout={500} clickOnTrack={false}>
                            <Stack spacing={2.4}>
                                {/*<Typography variant="subtitle2" sx={{color: "#676767"}}>*/}
                                {/*    Pinned*/}
                                {/*</Typography>*/}
                                {/*{ChatList.filter((item) => item.pinned).map((item) => {*/}
                                {/*    return <ChatElement {...item}/>*/}
                                {/*})}*/}
                            </Stack>
                            <Stack spacing={2.4}>
                                <Typography variant="subtitle2" sx={{color: "#676767"}}>
                                    Все чаты
                                </Typography>
                                {conversations.map((item, idx) => {
                                    // conversations.filter((item) => item.pinned).map((item, idx)
                                    // console.log(conversations)
                                    // return <ChatElement {...item} />
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
