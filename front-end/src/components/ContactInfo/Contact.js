import React from 'react';
import {Avatar, Box, Divider, IconButton, Button, Stack, Typography, Grid} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, X} from "phosphor-react";
import {useDispatch} from "react-redux";
import {ToggleSidebar, UpdateSidebarType} from "../../redux/slices/appSlice";
import {faker} from "@faker-js/faker";
import AntSwitch from "../AntSwitch";
import {BlockDialog, DeleteDialog} from "./Dialogs";

const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [openBlockDialog, setOpenBlockDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleCloseBlockDialog = ()=> {
    setOpenBlockDialog(false)
  }

  const handleCloseDeleteDialog = ()=> {
    setOpenDeleteDialog(false)
  }
  return (
    <Box sx={{width: 320, height: "100vh"}}>
      <Stack sx={{height: "100%"}}>
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
            direction={"row"} alignItems={"center"} justifyContent={"space-between"}
            spacing={3}
          >
            <Typography variant={"subtitle2"}>Contact Info</Typography>
            <Stack>
              <IconButton onClick={() => dispatch(ToggleSidebar())}>
                <Stack alignItems={"center"} justifyContent={"center"} sx={{borderRadius: "50%", border: "1px solid"}}
                       p={0.05}>
                  <X/>
                </Stack>
              </IconButton>
            </Stack>

          </Stack>
        </Box>
        {/*  contact Info Body */}
        <Stack
          p={3}
          spacing={3}
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
            backgroundColor: ""
          }}>
          <Stack
            alignItems={"center"}
            direction={"row"}
            spacing={2}
          >
            <Avatar src={faker.image.avatar()} alt={faker.person.firstName()} sx={{height: 64, width: 64}}/>
            <Stack spacing={0.5}>
              <Typography variant={"article"} fontWeight={600}>{faker.person.fullName()}</Typography>
              <Typography variant={"caption"} fontWeight={500}>{faker.phone.number()}</Typography>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Stack spacing={1} alignItems={"center"}>
              <IconButton>
                <VideoCamera/>
              </IconButton>
              <Typography variant={"overline"} fontWeight={600}>video</Typography>
            </Stack>
            <Stack spacing={1} alignItems={"center"}>
              <IconButton>
                <Phone/>
              </IconButton>
              <Typography variant={"overline"} fontWeight={600}>Call</Typography>
            </Stack>
          </Stack>
          <Divider/>
          <Stack spacing={0.5}>
            <Typography variant={"article"}>About</Typography>
            <Typography variant={"body2"}>{faker.lorem.words(5, 10)}</Typography>
          </Stack>
          <Divider/>
          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Typography onClick={() => dispatch(UpdateSidebarType({type: "SHARED"}))} variant={"subtitle2"}>Media, Links & Docs</Typography>
            <Button
              onClick={() => dispatch(UpdateSidebarType({type: "SHARED"}))}
              endIcon={<CaretRight/>}
            >
              401
            </Button>
          </Stack>
          <Grid container spacing={1.5}>
            {[1, 2, 3, 4, 5].slice(0, 3).map((item) => (
              <Grid item xs={4}>
                <img src={faker.image.urlLoremFlickr({category: 'cats'})} alt={faker.person.firstName()}/>
              </Grid>
            ))
            }
          </Grid>
          <Divider/>
          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Stack
              onClick={() => dispatch(UpdateSidebarType({type: "STARRED"}))}
              direction={"row"} alignItems={"center"} spacing={2}>
              <Star size={21}/>
              <Typography variant={"subtitle2"}>Starred Messages</Typography>
            </Stack>
            <IconButton onClick={() => dispatch(UpdateSidebarType({type: "STARRED"}))}>
              <CaretRight/>
            </IconButton>
          </Stack>
          <Divider/>
          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Bell size={21}/>
              <Typography variant={"subtitle2"}>Mute Notifications</Typography>
            </Stack>
            <AntSwitch/>
          </Stack>
          <Divider/>
          <Typography>1 group in common</Typography>
          <Stack
            alignItems={"center"}
            direction={"row"}
            spacing={2}>
            <Avatar src={faker.image.avatar()} alt={faker.person.fullName()}/>
            <Stack spacing={0.5}>
              <Typography variant={"subtitle2"}>Hmak</Typography>
              <Typography variant={"caption"}>{`${faker.company.name()}, You`}</Typography>
            </Stack>
          </Stack>
          <Stack
            alignItems={"center"}
            direction={"row"}
            spacing={2}
            justifyContent={"space-between"}
          >
            <Button
              fullWidth variant={"outlined"}
              startIcon={<Prohibit/>}
              onClick={() => setOpenBlockDialog(true)}
            >
              Block
            </Button>
            <Button
              fullWidth variant={"outlined"}
              startIcon={<Trash/>}
              onClick={() => setOpenDeleteDialog(true)}

            >
              Delette
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {openBlockDialog && <BlockDialog open={openBlockDialog} handleClose={handleCloseBlockDialog} />}
      {openDeleteDialog && <DeleteDialog open={openDeleteDialog} handleClose={handleCloseDeleteDialog} />}
    </Box>
  );
};

export default Contact;
