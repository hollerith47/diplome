import React, {useState} from 'react';
import {Box, Fab, IconButton, InputAdornment, Stack, TextField, Tooltip} from "@mui/material";
import {Camera, File, LinkSimple, PaperPlaneTilt, Smiley, Sticker, Image, User} from "phosphor-react";
import {styled, useTheme} from "@mui/material/styles";
import data from '@emoji-mart/data'
import Picker from "@emoji-mart/react";

const StyledInput = styled(TextField)(({theme}) => ({
  "& .MuiInputBase-input": {
    paddingTop: '12px',
    paddingBottom: '12px',
  }
}));

const Actions = [
  {
    color : "#4da5fe",
    icon: <Image size={24} />,
    y: 102,
    title: "Photo/Video",
  },
  {
    color : "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Stickers",
  },
  {
    color : "#0172e4",
    icon: <Camera size={24} />,
    y: 242,
    title: "Image",
  },
  {
    color : "#0159b2",
    icon: <File size={24} />,
    y: 312,
    title: "Files",
  },
  {
    color : "#0159b2",
    icon: <User size={24} />,
    y: 382,
    title: "Contact",
  }
]

const ChatInput = ({setOpenPicker}) => {
  const [openActions, setOpenActions] = useState(false)
  return (
    <StyledInput
      fullWidth
      placeholder="Write a message..."
      variant="filled"
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack sx={{width: "max-content"}}>
            <Stack sx={{position: "relative", display: openActions ? "inline-block" : "none"}}>
              {Actions.map((item)=>(
                <Tooltip  title={item.title} key={item.title} placement={"right"}>
                  <Fab sx={{position: "absolute", top: -item.y, backgroundColor: item.color}}>
                    {item.icon}
                  </Fab>
                </Tooltip>
              ))}
            </Stack>
            <InputAdornment position={" "}>
              <IconButton onClick={()=> setOpenActions((prev)=> !prev)}>
                <LinkSimple/>
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <InputAdornment position={"end"}>
            <IconButton onClick={()=>setOpenPicker((prev)=> !prev)}>
              <Smiley/>
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}
const Footer = () => {
  const theme = useTheme();
  const [openPicker, setOpenPicker] = useState(false)

  return (
    <Box p={2} sx={{
      height: 100,
      width: "100%",
      boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper
    }}>
      <Stack direction={"row"} alignItems={"center"} spacing={3}>
        {/*chat input*/}
        <Stack sx={{width: "100%"}}>
          <Box
            sx={{
              display: openPicker ? "inline" : "none",
              zIndex: 10, position: "fixed", bottom: 81, right: 100
            }}>
            <Picker data={data} theme={theme.palette.mode} onEmojiSelect={console.log}/>
          </Box>
          <ChatInput setOpenPicker={setOpenPicker}/>
        </Stack>
        <Box sx={{height: 48, width: 48, backgroundColor: theme.palette.primary.main, borderRadius: 1.5}}>
          <Stack height={"100%"} width={"100%"} justifyContent={"center"} alignItems={"center"}>
            <IconButton>
              <PaperPlaneTilt color="#fff"/>
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
