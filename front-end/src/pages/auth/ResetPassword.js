import React, {useState} from 'react';
import {IconButton, Link, Stack, Typography} from "@mui/material";
import {useNavigate, Link as RouterLink} from "react-router-dom";

import DialogContainer from "../../components/dialog/DialogContainer";
// import useResponsive from "../../hooks/useResponsive";
import {CaretLeft, X} from "phosphor-react";
import ResetPasswordForm from "../../sections/auth/ResetPasswordForm";
import CLoseDialogIcon from "../../components/CLoseDialogIcon";

const ResetPassword = () => {
    const [openResetPasswordDialog, setOpenResetPasswordDialog] = useState(true);
    const navigate = useNavigate();
    // const isDesktop = useResponsive("up", "md");

    const handleCloseResetPasswordDialog = () => {
        setOpenResetPasswordDialog(false);
        navigate("/auth/login");
    }


    return (
        <DialogContainer
            openDialog={openResetPasswordDialog}
            handleCloseDialog={handleCloseResetPasswordDialog}
        >
            <Stack spacing={2} sx={{mb: 5, position: "relative"}}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant={"h3"} paragraph>
                        Forgot Password?
                    </Typography>
                    <Stack>
                        <CLoseDialogIcon handleCloseDialog={handleCloseResetPasswordDialog}/>
                    </Stack>
                </Stack>
                <Typography sx={{color: "text.secondary", mb: 5}}>
                    Please enter your email address associated with your account and we will email you a link to reset
                    your
                    password.
                </Typography>
                {/*  reset password form */}
                <ResetPasswordForm/>
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

export default ResetPassword;
