import React, {useState} from 'react';
import {Link as RouterLink, useNavigate} from "react-router-dom";
// import useResponsive from "../../hooks/useResponsive";
import DialogContainer from "../../components/DialogContainer";
import {IconButton, Link, Stack, Typography} from "@mui/material";
import {CaretLeft, X} from "phosphor-react";
import NewPasswordForm from "../../sections/auth/NewPasswordForm";

const NewPassword = () => {
  const [openNewPasswordDialog, setOpenNewPasswordDialog] = useState(true);
  const navigate = useNavigate();
  // const isDesktop = useResponsive("up", "md");

  const handleCloseNewPasswordDialog = () => {
    setOpenNewPasswordDialog(false);
    navigate("/auth/login");
  }
  return (
    <DialogContainer
      openDialog={openNewPasswordDialog}
      handleCloseDialog={handleCloseNewPasswordDialog}
      maxWidth={"sm"}
    >
      <Stack spacing={2} sx={{mb: 5, position: "relative"}}>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant={"h3"} paragraph>
            Reset Password?
          </Typography>
          <Stack>
            <IconButton onClick={handleCloseNewPasswordDialog}>
              <Stack alignItems={"center"} justifyContent={"center"} sx={{borderRadius: "50%", border: "1px solid"}}>
                <X/>
              </Stack>
            </IconButton>
          </Stack>
        </Stack>
        <Typography sx={{color: "text.secondary", mb: 5}}>
          Please set your new password
        </Typography>
        {/*  new password form*/}
        <NewPasswordForm />

        {/*  link to login page */}
        <Link
          component={RouterLink}
          to="/auth/login"
          color="inherit"
          variant="subtitle2"
          sx={{mt: 3, mx: "auto"}}
        >
          <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
            <CaretLeft size={18}/>
            Return to login
          </Stack>
        </Link>
      </Stack>
    </DialogContainer>
  );
};

export default NewPassword;
