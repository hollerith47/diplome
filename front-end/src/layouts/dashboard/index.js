import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {Box, Stack} from "@mui/material";
import SideBar from "./SideBar";

const isAuthenticated = true;

const DashboardLayout = () => {
  if (!isAuthenticated){
    return <Navigate to={"/auth/login"}/>
  }
  return (
    <>
      <Stack
        direction="row"
      >
        {/*sidebar*/}
        <SideBar />
        <Box>
          <Outlet/>
        </Box>
      </Stack>
    </>
  );
};

export default DashboardLayout;
