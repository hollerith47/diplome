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
import {useSelector} from "react-redux";
import {SimpleBarStyle} from "../../components/Scrollbar";
import {ChatFooter, ChatHeader} from "../../components/Chat";

const Conversation = ({isMobile, menu}) => {
    const { current_messages } = useSelector(store => store.messages.chat);

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
    const { current_messages, current_conversation } = useSelector(store => store.messages.chat);

    useEffect(() => {
        // Scroll to the bottom of the message list when new messages are added
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [current_messages, current_conversation]);

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
