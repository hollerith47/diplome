import React, {useState} from 'react';
import { IconButton, Link, Stack, Typography} from "@mui/material";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import img_right from "../../assets/Images/register_img.png";
import {X} from "phosphor-react";
import RegisterForm from "../../sections/auth/RegisterForm";
import DialogContainer from "../../components/DialogContainer";


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
            <Stack sx={{flexGrow: 1}}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant={"h4"}>Register</Typography>
                {!isDesktop &&
                  <Stack sx={{alignSelf: 'flex-end'}}>
                    <IconButton onClick={handleCloseRegisterDialog}>
                      <Stack alignItems={"center"} justifyContent={"center"}
                             sx={{borderRadius: "50%", border: "1px solid"}}>
                        <X/>
                      </Stack>
                    </IconButton>
                  </Stack>
                }
              </Stack>
              {/*  Login form */}
              <Stack pt={5} spacing={5}>
                <RegisterForm />
              </Stack>
              <Typography
                component={"div"}
                sx={{
                  color: "text.secondary",
                  mt:3,
                  typography: "caption",
                  textAlign: "center"
                }}
              >
                {"By signing up, I agree to "}
                <Link underline={"always"} color={"text.primary"}>
                  Terms of Service
                </Link>
                {" and "}
                <Link underline={"always"} color={"text.primary"}>
                  the Privacy Policy
                </Link>
              </Typography>
            </Stack>
            {/*left side*/}
            {isDesktop &&
              <Stack pl={4} sx={{width: "50%", borderLeft: "1px solid rgba(0, 0, 0, 0.25)"}} spacing={2}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography variant={"h4"}>Welcome!</Typography>
                  <Stack sx={{alignSelf: 'flex-end'}}>
                    <IconButton onClick={handleCloseRegisterDialog}>
                      <Stack alignItems={"center"} justifyContent={"center"}
                             sx={{borderRadius: "50%", border: "1px solid"}}>
                        <X/>
                      </Stack>
                    </IconButton>
                  </Stack>
                </Stack>
                <Stack pt={5}>
                  <img style={{height: "270px", width: "360px"}} src={img_right} alt=""/>
                </Stack>
                <Stack pt={3} direction={"row"} spacing={0.5} alignItems={"center"} justifyContent={"center"}>
                  <Typography variant={"body2"}>Already have an account?</Typography>
                  <Link to={"/auth/login"} component={RouterLink}>
                    log in now
                  </Link>
                </Stack>
              </Stack>
            }
            {!isDesktop &&
              <Stack direction={"row"} spacing={0.5} alignItems={"center"} justifyContent={"center"}>
                <Typography variant={"body2"}>Already have an account?</Typography>
                <Link to={"/auth/login"} component={RouterLink}>
                  log in now
                </Link>
              </Stack>
            }
          </Stack>
    </DialogContainer>
  );
};

export default Register;
