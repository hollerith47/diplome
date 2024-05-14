import React, {useState} from 'react';
import {Link, Stack, Typography} from "@mui/material";
import {useNavigate, Link as RouterLink} from "react-router-dom";

import DialogContainer from "../../components/dialog/DialogContainer";
import {CaretLeft } from "phosphor-react";
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
                        Забыли пароль?
                    </Typography>
                    <Stack>
                        <CLoseDialogIcon handleCloseDialog={handleCloseResetPasswordDialog}/>
                    </Stack>
                </Stack>
                <Typography sx={{color: "text.secondary", mb: 5}}>
                    Пожалуйста, введите адрес электронной почты, связанный с вашей учетной записью, и мы отправим вам
                    одноразовый пароль для сброса пароля.
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
                        Вернуться к входу
                    </Stack>
                </Link>
            </Stack>
        </DialogContainer>
    );
};

export default ResetPassword;
