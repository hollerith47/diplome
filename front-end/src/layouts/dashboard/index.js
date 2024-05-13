import React, {useEffect} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {Box, Stack} from "@mui/material";
import SideBar from "./SideBar";
import {useDispatch, useSelector} from "react-redux";
import {connectSocket, socket} from "../../socket";
import {AddDirectConversation, AddDirectMessage, UpdateDirectConversation} from "../../redux/slices/conversationSlice";
import {SelectConversation, showSnackBar} from "../../redux/slices/appSlice";
import {fetchUserConversations} from "../../redux/slices/messagesSlice";

const DashboardLayout = () => {
    const {isLoggedIn, token} = useSelector(store => store.auth);
    const {user} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const {conversations, current_conversation} = useSelector(
        (state) => state.conversation.direct_chat
    );

    useEffect(() => {
        if (isLoggedIn) {
            window.onload = function () {
                if (!window.location.hash) {
                    window.location = window.location + '#loaded';
                    window.location.reload();
                }
            };

            if (!socket) {
                connectSocket(token);
            }


            socket.on("unauthorized", (data) => {
                dispatch(showSnackBar({
                    open: true,
                    message: "Reconnectez-vous",
                    severity: "error",
                }))
            });
            // Remove event
            return () =>{
                // socket?.off("start_chat");
                // socket?.off("new_message");
                socket?.off("unauthorized");
                // socket?.off("message_sent");
                // socket?.off("message_received");
            }

        }else{
            return <Navigate to={"/landing"}/>
        }

    }, [isLoggedIn, socket ]);

    if (!isLoggedIn) {
        return <Navigate to={"/landing"}/>
    }
    return (
        <>
            <Stack
                direction="row"
            >
                {/*sidebar*/}
                <SideBar/>
                <Box>
                    <Outlet/>
                </Box>
            </Stack>
        </>
    );
};

export default DashboardLayout;
