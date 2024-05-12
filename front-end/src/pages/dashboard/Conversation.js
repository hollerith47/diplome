import {Stack, Box } from "@mui/material";
import React, {useEffect, useRef} from "react";
import {useTheme} from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import {
    DocMsg,
    LinkMsg,
    MediaMsg,
    ReplyMsg,
    TextMsg,
    Timeline,
} from "../../sections/dashboard/Conversation";
import {useDispatch, useSelector} from "react-redux";
import {
    FetchCurrentMessages,
    SetCurrentConversation,
} from "../../redux/slices/conversationSlice";
import {socket} from "../../socket";
import {useLocation} from "react-router-dom";
import {SimpleBarStyle} from "../../components/Scrollbar";
import {ChatFooter, ChatHeader} from "../../components/Chat";
import useUserParam from "../../hooks/useUserParam";
import {dispatch} from "../../redux/store";
import {getUsers} from "../../redux/slices/authSlice";

const Conversation = ({isMobile, menu}) => {
    const dispatch = useDispatch();

    const {conversations, current_messages} = useSelector(
        (state) => state.conversation.direct_chat
    );
    const {room_id} = useSelector((state) => state.app);

    useEffect(() => {
        const current = conversations.find((el) => el?.id === room_id);

        socket.emit("get_messages", {conversation_id: current?.id}, (data) => {
            // data => list of messages
            console.log(data, "List of messages");
            dispatch(FetchCurrentMessages({messages: data}));
        });

        dispatch(SetCurrentConversation(current));
    }, []);
    return (
        <Box p={isMobile ? 1 : 3} sx={{ minHeight: "100vh"}}>
            <Stack spacing={3}>
                {current_messages.map((el, idx) => {
                    // console.log(el.type)
                    switch (el.type) {
                        case "divider":
                            return (
                                // Timeline
                                <Timeline el={el}/>
                            );

                        case "msg":
                            switch (el.subtype) {
                                case "img":
                                    return (
                                        // Media Message
                                        <MediaMsg el={el} menu={menu} key={idx}/>
                                    );

                                case "doc":
                                    return (
                                        // Doc Message
                                        <DocMsg el={el} menu={menu} key={idx}/>
                                    );
                                case "Link":
                                    return (
                                        //  Link Message
                                        <LinkMsg el={el} menu={menu} key={idx}/>
                                    );

                                case "reply":
                                    return (
                                        //  ReplyMessage
                                        <ReplyMsg el={el} menu={menu} key={idx}/>
                                    );

                                default:
                                    return (
                                        // Text Message
                                        <TextMsg el={el} menu={menu} key={idx}/>
                                    );
                            }

                        default:
                            return <></>;
                    }
                })}
            </Stack>
        </Box>
    );
};

const ChatComponent = () => {
    const isMobile = useResponsive("between", "md", "xs", "sm");
    const theme = useTheme();
    const messageListRef = useRef(null);
    const { current_messages} = useSelector((state) => state.conversation.direct_chat);

    useEffect(() => {
        // Scroll to the bottom of the message list when new messages are added
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [current_messages]);

    // just for me
    // const {sidebar} = useSelector((store) => store.app);
    // const {allUsers} = useSelector((store) => store.auth);
    // const userId = useUserParam();

    // get user id from search query
    // const userData = allUsers.find(user => user._id === userId);

    const location = useLocation();
    const isApp = location.pathname === "/app"

    // useEffect(() => {
    //     return () => {
    //         dispatch(getUsers())
    //     };
    // }, []);

    // till here

    return (
        <Stack
            height={"100%"}
            maxHeight={"100vh"}
            width={isMobile ? "100vw" : "auto"}
        >
            {/*  */}
            <ChatHeader />
            <Box
                ref={messageListRef}
                width={"100%"}
                sx={{
                    position: "relative",
                    flexGrow: 1,
                    overflow: "scroll",

                    backgroundColor:
                        theme.palette.mode === "light"
                            ? "#F0F4FA"
                            : theme.palette.background,

                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                }}
            >
                <SimpleBarStyle timeout={500} clickOnTrack={false}>
                    <Conversation menu={true} isMobile={isMobile} />
                </SimpleBarStyle>
            </Box>

            {/*  */}
            <ChatFooter />
        </Stack>
    );
};

export default ChatComponent;

export {Conversation};
