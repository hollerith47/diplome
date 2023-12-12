import React, {useState} from 'react';
import {Avatar, Box, Divider, IconButton, Stack, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import {faker} from "@faker-js/faker";
import {Bell, CaretLeft, ClipboardText, Image, Info, Key, Keyboard, Lock, MarkerCircle} from "phosphor-react";
import Shortcuts from "../../sections/settings/Shortcuts";

const Settings = () => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  const [openShortcuts, setOpenShortcuts] = useState(false);

  const handleOpenShortcuts = () => {
    setOpenShortcuts(true);
    console.log("clicked")
  }

  const handleCloseShortcuts = () => {
    setOpenShortcuts(false)
  }

  const Settings_Menu = [
    {
      key: 1,
      icon: <Bell size={20}/>,
      text: "Notifications",
      onclick: () => {
      }
    },
    {
      key: 2,
      icon: <Lock size={20}/>,
      text: "Privacy",
      onclick: () => {
      }
    },
    {
      key: 3,
      icon: <Key size={20}/>,
      text: "Security",
      onclick: () => {
      }
    },
    {
      key: 4,
      icon: <MarkerCircle size={20}/>,
      text: "Theme",
      onclick: () => {
      }
    },
    {
      key: 5,
      icon: <Image size={20}/>,
      text: "Chat Wallpaper",
      onclick: () => {
      }

    },
    {
      key: 6,
      icon: <ClipboardText size={20}/>,
      text: "Request Account Info",
      onclick: () => {
      }
    },
    {
      key: 7,
      icon: <Keyboard size={20}/>,
      text: "Keyboard shortcuts",
      onclick: handleOpenShortcuts,
    },
    {
      key: 8,
      icon: <Info size={20}/>,
      text: "Help",
      onclick: () => {
      }
    },
  ]



  return (
    <>
      <Stack direction="row" sx={{width: "100%", height: "100%"}}>
        {/*  Profile */}
        <Box
          sx={{
            position: "relative",
            width: isDesktop ? 320 : "100vw",
            backgroundColor: theme.palette.mode === 'light'
              ? '#f8faff'
              : theme.palette.background,
            boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
            overflowY: "scroll",
            height: "100vh",
          }}>
          <Stack p={3} spacing={5}>
            {/*Header */}
            <Stack direction={"row"} spacing={3} alignItems={"center"}>
              <IconButton>
                <CaretLeft/>
              </IconButton>
              <Typography variant={"h6"}>Settings</Typography>
            </Stack>
            {/*profile*/}
            <Stack direction={"row"} spacing={3} alignItems={"center"}>
              <Avatar sx={{width: 56, height: 56}} src={faker.image.avatar()} alt={faker.person.fullName()}/>
              <Stack spacing={0.5}>
                <Typography variant="article">{faker.person.fullName()}</Typography>
                <Typography variant={"body2"}>{faker.person.fullName()}</Typography>
              </Stack>
            </Stack>
            {/* settings section*/}
            <Stack spacing={2}>
              {Settings_Menu.map(({icon, text, key, onclick}) => (
                <>
                  <Stack sx={{cursor: 'pointer'}} direction={"row"} spacing={1} alignItems={"center"} onClick={onclick}>
                    {icon}
                    <Typography variant={"body2"}>{text}</Typography>
                  </Stack>
                  {key !== 8 && <Divider/>}
                </>
              ))}
            </Stack>
          </Stack>
        </Box>
        {/*  setting right side */}
      </Stack>
      {openShortcuts && <Shortcuts open={openShortcuts} handleClose={handleCloseShortcuts} />}
    </>)
};


export default Settings;
