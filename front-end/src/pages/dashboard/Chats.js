import React from 'react';
import {  Box, Button, Divider, IconButton, Stack, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {ArchiveBox, CircleDashed, MagnifyingGlass} from "phosphor-react";
import {Search, SearchIconWrapper, StyledInputBase} from "../../components/Search";
import {ChatList} from "../../data";
import {SimpleBarStyle} from "../../components/Scrollbar";
import useResponsive from "../../hooks/useResponsive";
import { ChatElement } from "../../components/ChatElements";


const Chats = () => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");


  return (
    <Box
      sx={{
        position: "relative",
        width: isDesktop ? 320 : "100vw",
        backgroundColor: theme.palette.mode === 'light'
        ? '#f8faff'
        : theme.palette.background,
        boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
      }}>
      {!isDesktop && (
        <h1>Desktop</h1>
      )
      }

      <Stack p={3} spacing={2} sx={{height: "100vh"}}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">
            Chats
          </Typography>
          <IconButton>
            <CircleDashed/>
          </IconButton>
        </Stack>
        <Stack sx={{width: "100%"}}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6"/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{"aria-label": "search"}}
            />
          </Search>
        </Stack>
        <Stack spacing={1}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
          >
            <ArchiveBox size={24}/>
            <Button>Archive</Button>
          </Stack>
          <Divider/>
        </Stack>
        <Stack
          direction="column"
          sx={{flexGrow: 1, overflowX: "hidden",overflowY:"scroll", height: "100%"}}>
          <SimpleBarStyle timeout={500} clickOnTrack={false}>
            <Stack spacing={2.4}>
              <Typography variant="subtitle2" sx={{color: "#676767"}}>
                Pinned
              </Typography>
              {ChatList.filter((item) => item.pinned).map((item) => {
                return <ChatElement {...item}/>
              })}
            </Stack>
            <Stack spacing={2.4}>
              <Typography variant="subtitle2" sx={{color: "#676767"}}>
                All Chats
              </Typography>
              {ChatList.filter((item) => !item.pinned).map((item) => {
                return <ChatElement {...item}/>
              })}
            </Stack>
          </SimpleBarStyle>
        </Stack>
      </Stack>

    </Box>
  );
};

export default Chats;
