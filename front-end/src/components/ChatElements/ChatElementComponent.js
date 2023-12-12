import {useTheme} from "@mui/material/styles";
import {Box, Stack} from "@mui/material";
import React from "react";
import NameAndMessage from "./NameAndMessage";
import AvatarWithOnline from "./AvatarWithOnline";
import TimeAndUnread from "./TimeAndUnread";

const ChatElementComponent = ({id, name, img, msg, time, unread, online}) => {
    const theme = useTheme();

    return (
        <Box
            p={2}
            sx={{
                position: "relative",
                height: '100%',
                width: '100%',
                borderRadius: 1,
                backgroundColor: theme.palette.mode === 'light'
                    ? '#fff'
                    : theme.palette.background.paper,
            }}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <AvatarWithOnline online={online} />
                    <Stack spacing={0.3}>
                        {/*  name and message*/}
                        <NameAndMessage name={name} message={msg} />
                    </Stack>
                </Stack>
                <Stack spacing={2} alignItems={"center"}>
                    <TimeAndUnread time={time} unread={unread} />
                </Stack>

            </Stack>
        </Box>
    )
};


export default ChatElementComponent;
