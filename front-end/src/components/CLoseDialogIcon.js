import React from 'react';
import {IconButton, Stack} from "@mui/material";
import {X} from "phosphor-react";

const CLoseDialogIcon = ({handleCloseDialog}) => {
  return (
    <>
      <IconButton onClick={handleCloseDialog}>
        <Stack alignItems={"center"} justifyContent={"center"} sx={{borderRadius: "50%", border: "1px solid"}}>
          <X/>
        </Stack>
      </IconButton>

    </>
  );
};

export default CLoseDialogIcon;
