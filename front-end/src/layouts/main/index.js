import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {Container} from "@mui/material";

const isAuthenticated = true;

const MainLayout = () => {

  if (isAuthenticated){
    return <Navigate to={"/app"}/>
  }
  return (
    <Container sx={{mt:5}}>
      <Outlet />
    </Container>
  );
};

export default MainLayout;
