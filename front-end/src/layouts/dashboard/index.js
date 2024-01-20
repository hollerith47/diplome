import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {Box, Stack} from "@mui/material";
import SideBar from "./SideBar";
import {useSelector} from "react-redux";

const DashboardLayout = () => {
  const {isLoggedIn} = useSelector(store => store.auth);
  if (!isLoggedIn){
    return <Navigate to={"/landing"}/>
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
