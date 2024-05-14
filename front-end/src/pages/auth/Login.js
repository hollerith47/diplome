import React, {useState} from 'react';
import {Link, Stack, Typography} from "@mui/material";
import {Link as RouterLink, useNavigate} from 'react-router-dom';

import img_left from "../../assets/Images/login_left_img.png";
import LoginForm from "../../sections/auth/LoginForm";
import useResponsive from "../../hooks/useResponsive";
import DialogContainer from "../../components/dialog/DialogContainer";
import CLoseDialogIcon from "../../components/CLoseDialogIcon";

const Login = () => {
  const [openLoginDialog, setOpenLoginDialog] = useState(true);
  const navigate = useNavigate();
  const isDesktop = useResponsive("up", "md");

  const handleCloseLoginDialog = () =>{
    setOpenLoginDialog(false);
    navigate("/landing");
  }

  return (
    <DialogContainer
      openDialog={openLoginDialog}
      handleCloseDialog={handleCloseLoginDialog}
    >
        <Stack sx={{mt:0}} spacing={5} direction={isDesktop ? "row" : "column"} >
          {/*left side*/}
          {isDesktop &&
            <Stack sx={{width: "50%", borderRight: "1px solid rgba(0, 0, 0, 0.25)"}} spacing={2}>
              <Stack>
                <Typography variant={"h4"}>Добро пожаловать!</Typography>
              </Stack>
              <Stack>
                <img style={{height: "270px", width: "360px"}} src={img_left} alt=""/>
              </Stack>
              <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                <Typography variant={"body2"}>не зарегистрированы?</Typography>
                <Link to={"/auth/register"} component={RouterLink}>
                    Зарегистрируйтесь сейчас
                </Link>
              </Stack>
            </Stack>
          }

          {/*right side*/}
          <Stack sx={{flexGrow: 1}}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography variant={"h4"}>Авторизация</Typography>
              <Stack sx={{ alignSelf: 'flex-end' }}>
                <CLoseDialogIcon handleCloseDialog={handleCloseLoginDialog} />
              </Stack>
            </Stack>
          {/*  Login form */}
            <Stack pt={5} spacing={5}>
              <LoginForm />
            </Stack>
          </Stack>
          {!isDesktop &&
            <Stack direction={"row"} spacing={0.5} alignItems={"center"} justifyContent={"center"}>
              <Typography variant={"body2"}>не зарегистрированы?</Typography>
              <Link to={"/auth/register"} component={RouterLink}>
                  Зарегистрируйтесь сейчас
              </Link>
            </Stack>
          }
        </Stack>
    </DialogContainer>
  );
};

export default Login;
