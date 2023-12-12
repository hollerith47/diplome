import React from 'react';
import {Badge, Typography} from "@mui/material";

const TimeAndUnread = ({time, unread}) => {
  return (
    <>
      <Typography sx={{fontWeight: 600}} variant="caption">
        {time}
      </Typography>
      <Badge color="primary" badgeContent={unread}/>
    </>
  );
};

export default TimeAndUnread;
