import React from 'react';
import {Box, IconButton, Stack, Typography} from "@mui/material";
import { UpdateSidebarType} from "../../redux/slices/appSlice";
import {ArrowLeft} from "phosphor-react";
import {useTheme} from "@mui/material/styles";
import {useDispatch} from "react-redux";
import Message from "../Conversion/Message";

const StarredMessages = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Box sx={{width: 320, height: "100vh"}}>
      <Stack sx={{height: "100%", backgroundColor: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper}}>
        {/*Header */}
        <Box
          sx={{
            boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
            width: "100%",
            backgroundColor: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper
          }}
        >
          <Stack
            sx={{height: "100%", p: 2}}
            direction={"row"} alignItems={"center"}
            spacing={3}
          >
            <IconButton onClick={() => dispatch(UpdateSidebarType({type: "CONTACT"}))}>
              <ArrowLeft/>
            </IconButton>
            <Typography variant={"body2"}>Starred Messages</Typography>
          </Stack>
        </Box>
        {/*  end header */}
        {/*  body */}
        <Stack
          p={3}
          spacing={3}
          alignItems={"center"}
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}>
          <Stack width={320}>
            <Message showMessageOptions={false} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default StarredMessages;
