import React, {useState} from 'react';
import {Box, Divider, IconButton, Link, Stack, Typography} from "@mui/material";
import {Search, SearchIconWrapper, StyledInputBase} from "../../components/Search";
import {MagnifyingGlass, Phone, Plus} from "phosphor-react";
import {SimpleBarStyle} from "../../components/Scrollbar";
import {useTheme} from "@mui/material/styles";
import CreateCallDialog from "../../sections/main/CreateCallDialog";
import CallLogElement from "../../components/CallLogElement";
import {CALL_LOG} from "../../data";

const Call = () => {
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
              <Typography variant="h5">Call Log</Typography>
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
                    Start new conversation
                  </Typography>
                  <IconButton onClick={()=> setOpenDialog(true)}>
                    <Phone style={{color: theme.palette.primary.main}}/>
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
                {CALL_LOG.map((item)=>(
                  <CallLogElement {...item}/>
                ))}
              </SimpleBarStyle>
            </Stack>

          </Stack>
        </Box>

        {/*  right */}
        {/* // TODO => implement conversations component on the right side */}

      </Stack>
      {openDialog && <CreateCallDialog open={openDialog} handleClose={handleCloseDialog} />}
    </>
  );
};

export default Call;
