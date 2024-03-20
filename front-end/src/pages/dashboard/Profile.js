import React from 'react';
import {Avatar, Box, IconButton, Stack, Typography} from "@mui/material";
import {CaretLeft} from "phosphor-react";
import {faker} from "@faker-js/faker";
import {useTheme} from "@mui/material/styles";
import ProfileForm from "../../sections/settings/ProfileForm";
import {useNavigate} from "react-router-dom";

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <Stack direction="row" sx={{width: "100%", height: "100%"}}>
        <Box
          sx={{
            position: "relative",
            width: 320,
            backgroundColor: theme.palette.mode === 'light'
              ? '#f8faff'
              : theme.palette.background,
            boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
            overflowY: "scroll",
            height: "100vh",
          }}>
          <Stack p={3} spacing={4}>
            {/*Header */}
            <Stack direction={"row"} spacing={3} alignItems={"center"}>
              <IconButton onClick={() => navigate("/app")}>
                <CaretLeft size={24} color={"#4b4b4b"}/>
              </IconButton>
              <Typography variant={"h5"}>Profile</Typography>
            </Stack>
            {/*profile*/}
            <Stack direction={"row"} spacing={3} alignItems={"center"} justifyContent={"center"}>
              <Avatar sx={{width: "7.5rem", height: "7.5rem"}} src={faker.image.avatar()}
                      alt={faker.person.fullName()}/>
            </Stack>
            {/* profile Info */}
            <Stack>
              <ProfileForm />
            </Stack>
          </Stack>
        </Box>
      </Stack>

    </>
  );
};

export default Profile;
