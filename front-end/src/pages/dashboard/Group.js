import React, {useState} from 'react';
import {Box, Divider, IconButton, Link, Stack, Typography} from "@mui/material";
import {Search, SearchIconWrapper, StyledInputBase} from "../../components/Search";
import {MagnifyingGlass, Plus} from "phosphor-react";
import {useTheme} from "@mui/material/styles";
import {ChatList} from "../../_data";
import {SimpleBarStyle} from "../../components/Scrollbar";
import {ChatElement} from "../../components/ChatElements";
import CreateGroupDialog from "../../sections/main/CreateGroupDialog";

const Group = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  return (
    <>
      <Stack direction={"row"} sx={{width: "100%"}}>
        {/*  left */}
        <Box
          sx={{
            height: "100vh",
            backgroundColor: (theme) => theme.palette.mode === "light" ? "#f8faff" : theme.palette.background,
            width: 320,
            boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)"
          }}
        >
          <Stack p={3} spacing={2} sx={{maxHeight: "100vh"}}>
            {/*  title, search */}
            <Stack>
              <Typography variant="h5">Groups</Typography>
            </Stack>
            {/*  search */}
            <Stack sx={{width: "100%"}} spacing={2}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6"/>
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{"aria-label": "search"}}
                />
              </Search>
              {/*group */}
              <Stack spacing={1}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  justifyContent={"space-between"}
                >
                  <Typography
                    variant={"subtitle2"}
                    component={Link}
                  >
                    Create New Group
                  </Typography>
                  <IconButton onClick={()=> setOpenDialog(true)}>
                    <Plus style={{color: theme.palette.primary.main}}/>
                  </IconButton>
                </Stack>
                <Divider/>
              </Stack>
            </Stack>
            <Stack
              direction="column"
              sx={{flexGrow: 1, height: "100%", overflowX: "hidden", overflowY: "scroll",}}
            >
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
                    All Groups
                  </Typography>
                  {ChatList.filter((item) => !item.pinned).map((item) => {
                    return <ChatElement {...item}/>
                  })}
                </Stack>
              </SimpleBarStyle>
            </Stack>

          </Stack>
        </Box>

        {/*  right */}
        {/* // TODO => implement conversations component on the right side */}

      </Stack>
      {openDialog && <CreateGroupDialog open={openDialog} handleClose={handleCloseDialog}/>}

    </>
  );
};

export default Group;
