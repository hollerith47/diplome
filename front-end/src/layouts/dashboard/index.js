import React, {useEffect} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {Box, Stack} from "@mui/material";
import SideBar from "./SideBar";
import {useDispatch, useSelector} from "react-redux";
import {connectSocket, socket} from "../../socket";
import {AddDirectConversation, AddDirectMessage, UpdateDirectConversation} from "../../redux/slices/conversationSlice";
import {SelectConversation, showSnackBar} from "../../redux/slices/appSlice";

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

            socket.on("new_message", (data) => {
                const message = data.message;
                console.log(current_conversation, data);
                // check if msg we got is from currently selected conversation
                if (current_conversation?.id === data.conversation_id) {
                    dispatch(
                        AddDirectMessage({
                            id: message._id,
                            type: "msg",
                            subtype: message.type,
                            message: message.text,
                            incoming: message.to === user._id,
                            outgoing: message.from === user._id,
                        })
                    )
                }
            });

            socket.on("unauthorized", (data) => {
                dispatch(showSnackBar({
                    open: true,
                    message: "You are not allowed",
                    severity: "error",
                }))
            });

            socket.on("new_message", (data) => {
                dispatch(showSnackBar(
                    {
                        open: true,
                        message: "New message",
                        severity: "success",
                    }
                ))
            })

            socket.on("start_chat", (data) => {
                console.log(data);
                // add / update to conversation list
                const existing_conversation = conversations.find((el) => el?.id === data._id);
                if (existing_conversation){
                    dispatch(UpdateDirectConversation({conversation : data}));
                }else{
                    dispatch(AddDirectConversation({conversation: data }))
                }

                dispatch(SelectConversation({room_id: data._id}))
            });

            // Remove event
            return () =>{
                socket?.off("start_chat");
                socket?.off("new_message");
                socket?.off("unauthorized");
            }

        }else{
            return <Navigate to={"/landing"}/>
        }

    }, [isLoggedIn, socket, dispatch, conversations, current_conversation]);

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
