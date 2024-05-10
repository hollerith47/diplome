import React, {useState} from "react";
import { useTheme } from "@mui/material/styles";
import {Box, Button, IconButton, Stack, Typography} from "@mui/material";

import { Link, useSearchParams } from "react-router-dom";
import ChatComponent from "./Conversation";
import Chats from "./Chats";
import Contact from "../../sections/dashboard/Contact";
import NoChat from "../../assets/Illustration/NoChat";
import { useSelector } from "react-redux";
import StarredMessages from "../../sections/dashboard/StarredMessages";
import Media from "../../sections/dashboard/SharedMessages";
import ListUsersDialog from "../../sections/main/ListUsersDialog";

const GeneralApp = () => {
    const [searchParams] = useSearchParams();

    const theme = useTheme();
    const {allUsers} = useSelector(store => store.auth);
    const usersArray = allUsers;
    console.log({usersArray})

    const [openDialog, setOpenDialog] = useState(false);
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const { sideBar, room_id, chat_type } = useSelector((state) => state.app);

    return (
        <>
            <Stack direction="row" sx={{ width: "100%" }}>
                <Chats />
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
                        borderBottom:
                            searchParams.get("type") === "individual-chat" &&
                            searchParams.get("id")
                                ? "0px"
                                : "6px solid #0162C4",
                    }}
                >
                    {chat_type === "individual" &&
                    room_id !== null ? (
                        <ChatComponent />
                    ) : (
                        <Stack
                            spacing={2}
                            sx={{ height: "100vh", width: "100%" }}
                            alignItems="center"
                            justifyContent={"center"}
                        >
                            <NoChat />
                            <Typography variant="subtitle2">
                                Select a conversation or start a{" "}
                                <Button
                                    style={{
                                        color: theme.palette.primary.main,
                                        textDecoration: "none",
                                    }}
                                    onClick={() => setOpenDialog(true)}
                                >
                                    new one
                                </Button>
                            </Typography>
                        </Stack>
                    )}
                </Box>
                {sideBar?.open &&
                    (() => {
                        switch (sideBar.type) {
                            case "CONTACT":
                                return <Contact />;

                            case "STARRED":
                                return <StarredMessages />;

                            case "SHARED":
                                return <Media />;

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
