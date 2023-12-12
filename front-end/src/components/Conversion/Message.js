import React from 'react';
import {Box, Stack} from "@mui/material";
import {Chat_History} from "../../data";
import {DocMsg, ImgMsg, LinkMsg, ReplyMsg, TextMsg, Timeline} from "./MsgTypes";

const Message = ({showMessageOptions}) => {
  return (
    <Box p={3} sx={{height: "100%"}}>
      <Stack spacing={3}>
        {Chat_History.map((item) => {
          // console.log(item)
          switch (item.type) {
            case "divider":
              // TimeLine
              return <Timeline content={item} />;
            case "msg":
              switch (item.subtype) {
                case "img":
                  // Image msg
                  return <ImgMsg content={item} showMessageOptions={showMessageOptions}/>
                case "doc":
                  // Doc msg
                  return <DocMsg content={item} showMessageOptions={showMessageOptions}/>;
                case "link":
                  // Link msg
                  return <LinkMsg content={item} showMessageOptions={showMessageOptions}/>
                case "reply":
                  // reply msg
                  return <ReplyMsg content={item} showMessageOptions={showMessageOptions}/>

                default:
                  return <TextMsg content={item} showMessageOptions={showMessageOptions}/>
              }
            default:
              return <></>
          }
        })}
      </Stack>

    </Box>
  );
};

export default Message;
