import React, {useEffect} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {Box, Stack} from "@mui/material";
import SideBar from "./SideBar";
import {useDispatch, useSelector} from "react-redux";
import {connectSocket, socket} from "../../socket";
import {AddDirectConversation, UpdateDirectConversation} from "../../redux/slices/conversationSlice";
import {SelectConversation} from "../../redux/slices/appSlice";

const DashboardLayout = () => {
    const {isLoggedIn, token} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const { conversations, current_conversation } = useSelector(
        (state) => state.conversation.direct_chat
    );

    // const {id} = useSelector(store => store.auth.user);

    useEffect(() => {
        window.onload = function () {
            if (!window.location.hash) {
                window.location = window.location + '#loaded';
                window.location.reload();
            }
        }

        if (!socket){
            connectSocket(token);
        }

        socket.on("start_chat", (data) => {
            console.log(data);
            // add / update to conversation list
            const existing_conversation = conversations.find(
                (el) => el?.id === data._id
            );
            if (existing_conversation) {
                // update direct conversation
                dispatch(UpdateDirectConversation({ conversation: data }));
            } else {
                // add direct conversation
                dispatch(AddDirectConversation({ conversation: data }));
            }
            dispatch(SelectConversation({ room_id: data._id }));
        });

        return () =>{
            socket?.off("start_chat")
        }

    }, [isLoggedIn]);

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
