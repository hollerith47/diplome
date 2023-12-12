import React from "react";
import {Outlet} from "react-router-dom";
import {Box, Stack} from "@mui/material";
import SideBar from "./SideBar";

const DashboardLayout = () => {
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
