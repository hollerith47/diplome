import React from 'react';
import AvatarWithOnline from "./ChatElements/AvatarWithOnline";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import {ArrowUpRight, Phone, VideoCamera} from "phosphor-react";
import {useTheme} from "@mui/material/styles";

const CallLogElement = ({ logInfo,isBordered, isDialogLog, userData}) => {
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
            <AvatarWithOnline image={userData?.image} online={userData?.online === true}/>
            <Stack alignItems={""}>
              <Typography variant="subtitle2">
                  {`${userData?.first_name} ${userData?.last_name}`}
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
                {logInfo?.videoCall ? <VideoCamera color={"green"} /> : <Phone color={"green"}/> }
              </IconButton>
          }

        </Stack>
    </Box>
  );
};

export default CallLogElement;
