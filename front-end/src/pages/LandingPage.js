import React from 'react';
import {Box, Button, Container, Link, Stack, Typography} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';


import Logo from '../assets/Images/logo512.png';
import bg from '../assets/Images/landingRight_bg.png';
import useResponsive from "../hooks/useResponsive";

const LandingPage = () => {
  const isDesktop = useResponsive("up", "md");
  // console.log(isDesktop)

  return (
    <Container sx={{mt:4, width: "100vw", maxHeight: "100vh", overflow: "hidden"}} >
      <Box>
        <Stack sx={{}} direction={"row"} alignItems={"center"} spacing={1}>
          <img src={Logo} style={{width: 50}} alt="Logo"/>
          <Typography variant={"h3"} color={"#3B34E0"}>Tech</Typography>
        </Stack>
        <Stack sx={{mt:4}} spacing={5} direction={isDesktop ? "row" : "column"} >
            {/*left side */}
            <Stack pt={16} sx={{width: isDesktop ? "40%" : "100%"}} spacing={2} alignItems={isDesktop ? "" : "center"}>
              <Typography variant={isDesktop ? "h2" : "h1"} color={"#407BFF"}>Instant Connect</Typography>
              <Typography variant={isDesktop ? "h4" : "h5"}>Seamless chat for teams on the go.</Typography>
              <Stack sx={{backgroundColor:"#407BFF",width: "max-content", borderRadius: 1}}>
                <Button size={"large"} variant={"contained"}>
                  <Link to={"/auth/login"} component={RouterLink} underline={"none"} color={"inherit"}>Login/Signup</Link>
                </Button>
              </Stack>
            </Stack>
            {/*right side*/}
          {isDesktop &&
            <Stack sx={{width: "60%"}}>
              <img src={bg} style={{objectFit: "fill"}} height={"75%"} alt="bg right"/>
            </Stack>
          }
        </Stack>
      </Box>
    </Container>
  );
};

export default LandingPage;
