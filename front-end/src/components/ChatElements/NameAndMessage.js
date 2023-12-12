import React from 'react';
import {Typography} from "@mui/material";

const NameAndMessage = ({name, message}) => {
  return (
    <>
      <Typography variant="subtitle2">
        {name}
      </Typography>
      <Typography variant="caption">
        {message}
      </Typography>
    </>
  );
};

export default NameAndMessage;
