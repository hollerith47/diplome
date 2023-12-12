import React from 'react';
import AvatarWithOnline from "./ChatElements/AvatarWithOnline";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import NameAndMessage from "./ChatElements/NameAndMessage";
import {faker} from "@faker-js/faker";
import {ArrowUpRight, Phone, VideoCamera} from "phosphor-react";
import {useTheme} from "@mui/material/styles";

const CallLogElement = ({ incoming, videoCall, time, isBordered, isDialogLog}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        height: '100%',
        width: '100%',
        borderRadius: 1,
        backgroundColor: theme.palette.mode === 'light'
          ? '#fff'
          : theme.palette.background.paper,
      }}

    >
        <Stack
          p={1}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ mb: 2, border: isBordered ? "1px solid rgba(0, 0, 0, 0.05)" : "", borderRadius: 1,}}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <AvatarWithOnline online={false}/>
            <Stack alignItems={""}>
              <Typography variant="subtitle2">
                {faker.person.fullName()}
              </Typography>
              <Typography variant="caption" sx={{display: "inline-block"}}>
                {incoming ? <ArrowUpRight color={"green"}/> : <ArrowUpRight color={"red"}/>}{"   "}
                Yesterday, {time}
              </Typography>
            </Stack>
          </Stack>
          {
            isDialogLog ?
              <Stack direction={"row"} spacing={1.25}>
                <IconButton>
                  <Phone color={"green"}/>
                </IconButton>
                <IconButton>
                  <VideoCamera color={"green"} />
                </IconButton>
              </Stack>
              :
              <IconButton>
                {videoCall ? <VideoCamera color={"green"} /> : <Phone color={"green"}/> }
              </IconButton>
          }

        </Stack>
    </Box>
  );
};

export default CallLogElement;
