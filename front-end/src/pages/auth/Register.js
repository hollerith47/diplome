import React, {useState} from 'react';
import {Link, Stack, Typography} from "@mui/material";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import img_right from "../../assets/Images/register_img.png";
import RegisterForm from "../../sections/auth/RegisterForm";
import DialogContainer from "../../components/dialog/DialogContainer";
import CLoseDialogIcon from "../../components/CLoseDialogIcon";


const Register = () => {
    const [openRegisterDialog, setOpenRegisterDialog] = useState(true);
    const navigate = useNavigate();
    const isDesktop = useResponsive("up", "md");

    const handleCloseRegisterDialog = () => {
        setOpenRegisterDialog(false);
        navigate("/landing");
    }

    return (
        <DialogContainer
            openDialog={openRegisterDialog}
            handleCloseDialog={handleCloseRegisterDialog}
        >
            <Stack sx={{mt: 0}} spacing={5} direction={isDesktop ? "row" : "column"}>
                {/*right side*/}
                <Stack sx={{width: "50%"}}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Typography variant={"h4"}>Register</Typography>
                        {!isDesktop &&
                            <Stack sx={{alignSelf: 'flex-end'}}>
                                <CLoseDialogIcon handleCloseDialog={handleCloseRegisterDialog}/>
                            </Stack>
                        }
                    </Stack>
                    {/*  Login form */}
                    <Stack pt={5} spacing={5}>
                        <RegisterForm/>
                    </Stack>
                    <Typography
                        component={"div"}
                        sx={{
                            color: "text.secondary",
                            mt: 3,
                            typography: "caption",
                            textAlign: "center"
                        }}
                    >
                        {"Регистрируясь, я соглашаюсь с "}
                        <Link underline={"always"} color={"text.primary"}>
                            условиями обслуживания
                        </Link>
                        {" и "}
                        <Link underline={"always"} color={"text.primary"}>
                            политикой конфиденциальности
                        </Link>
                    </Typography>
                </Stack>
                {/*left side*/}
                {isDesktop &&
                    <Stack pl={4} sx={{width: "50%", borderLeft: "1px solid rgba(0, 0, 0, 0.25)"}} spacing={2}>
                        <Stack direction={"row"} justifyContent={"space-between"}>
                            <Typography variant={"h4"}>Добро пожаловать!</Typography>
                            <Stack sx={{alignSelf: 'flex-end'}}>
                                <CLoseDialogIcon handleCloseDialog={handleCloseRegisterDialog}/>
                            </Stack>
                        </Stack>
                        <Stack pt={5}>
                            <img style={{height: "270px", width: "360px"}} src={img_right} alt=""/>
                        </Stack>
                        <Stack pt={3} direction={"row"} spacing={0.5} alignItems={"center"} justifyContent={"center"}>
                            <Typography variant={"body2"}>У вас уже есть аккаунт?</Typography>
                            <Link to={"/auth/login"} component={RouterLink}>
                                Войти сейчас
                            </Link>
                        </Stack>
                    </Stack>
                }
                {!isDesktop &&
                    <Stack direction={"row"} spacing={0.5} alignItems={"center"} justifyContent={"center"}>
                        <Typography variant={"body2"}>У вас уже есть аккаунт?</Typography>
                        <Link to={"/auth/login"}  component={RouterLink}>
                            Войти сейчас
                        </Link>
                    </Stack>
                }
            </Stack>
        </DialogContainer>
    );
};

export default Register;
