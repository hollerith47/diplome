import React, {useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {Box, Button,  Stack, Typography} from "@mui/material";
import ChatComponent from "./Conversation";
import Chats from "./Chats";
import Contact from "../../sections/dashboard/Contact";
import NoChat from "../../assets/Illustration/NoChat";
import {useDispatch, useSelector} from "react-redux";
import StarredMessages from "../../sections/dashboard/StarredMessages";
import Media from "../../sections/dashboard/SharedMessages";
import ListUsersDialog from "../../sections/main/ListUsersDialog";
import {getSocket} from "../../socket";
import {showSnackBar} from "../../redux/slices/appSlice";
import {fetchUserConversations, setCurrentMessages } from "../../redux/slices/messagesSlice";

const GeneralApp = () => {
    const {user} = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const socket = getSocket();

    const theme = useTheme();
    const {allUsers} = useSelector(store => store.auth);
    const { isChatActive } = useSelector(store => store.messages);
    const {current_conversation} = useSelector(store => store.messages.chat);
    const usersArray = allUsers;

    const [openDialog, setOpenDialog] = useState(false);
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const { sideBar } = useSelector(store => store.app);

    const updateStates = (data) => {
        dispatch(fetchUserConversations(data));
        dispatch(setCurrentMessages(data));
    }

    useEffect(() => {
        socket.on("message_received", (data) => {
            dispatch(showSnackBar(
                {
                    open: true,
                    message: "Получено новое сообщение",
                    severity: "success",
                }
            ));
            updateStates(data);
        })

        socket.on("message_sent", (data) => {
            updateStates(data);
        })

        socket.on("start_chat", (data) => {
            updateStates(data);
        });

        socket.on("get_user_conversations", (data) => {
            dispatch(fetchUserConversations(data));
        })

        // Remove event
        return () => {
            socket?.off("start_chat");
            socket?.off("new_message");
            socket?.off("message_sent");
            socket?.off("message_received");
            socket?.off('get_user_conversations');
        }
    }, [openDialog, dispatch, socket]);


    useEffect(() => {
        socket.emit('get_direct_conversation', {user_id: user._id});

        socket.on("get_user_conversations", (data) => {
            dispatch(fetchUserConversations(data));
        })
        return () => {
            socket?.off('get_direct_conversation');
            socket?.off('get_user_conversations');
        };
    }, [ dispatch]);

    return (
        <>
            <Stack direction="row" sx={{width: "100%"}}>
                <Chats/>
                <Box
                    sx={{
                        height: "100%",
                        width: sideBar?.open
                            ? `calc(100vw - 740px )`
                            : "calc(100vw - 420px )",
                        backgroundColor:
                            theme.palette.mode === "light"
                                ? "#FFF"
                                : theme.palette.background.paper,
                    }}
                >
                    {isChatActive && current_conversation !== null ? (
                        <ChatComponent/>
                    ) : (
                        <Stack
                            spacing={2}
                            sx={{height: "100vh", width: "100%"}}
                            alignItems="center"
                            justifyContent={"center"}
                        >
                            <NoChat/>
                            <Typography variant="subtitle2">
                                Выберите беседу или начните {" "}
                                <Button
                                    style={{
                                        color: theme.palette.primary.main,
                                        textDecoration: "none",
                                    }}
                                    onClick={() => setOpenDialog(true)}
                                >
                                    новую
                                </Button>
                            </Typography>
                        </Stack>
                    )}
                </Box>
                {sideBar?.open &&
                    (() => {
                        switch (sideBar.type) {
                            case "CONTACT":
                                return <Contact/>;

                            case "STARRED":
                                return <StarredMessages/>;

                            case "SHARED":
                                return <Media/>;

                            default:
                                break;
                        }
                    })()}
            </Stack>
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

export default GeneralApp;
