import React from 'react';
import {Box, Divider, Stack, Typography, Link, IconButton, MenuItem, Menu} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {DotsThreeVertical, DownloadSimple, Image} from "phosphor-react";
import {Message_options} from "../../_data";



const DocMsg = ({content, showMessageOptions}) => {
  const theme = useTheme();
  return (
    <Stack width={"100%"} direction={"row"} justifyContent={content.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: content.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content"
        }}>
        <Stack spacing={2}>
          <Stack
            direction={"row"}
            p={2}
            spacing={3} alignItems={"center"}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Image size={32}/>
            <Typography variant={"caption"}>filename.png</Typography>
            <IconButton><DownloadSimple/></IconButton>
          </Stack>
          <Typography
            variant={"body2"} sx={{color: content.incoming ? theme.palette.text : "#fff"}}
          >
            {content.message}
          </Typography>
        </Stack>
      </Box>
      {/*message options*/}
      {showMessageOptions && <MessageOptions />}

    </Stack>
  );
};

const LinkMsg = ({content, showMessageOptions}) => {
  const theme = useTheme();
  return (
    <Stack width={"100%"} direction={"row"} justifyContent={content.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: content.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content"
        }}>
        <Stack spacing={2}>
          <Stack
            spacing={3}
            p={2} direction="column"
            alignItems={"start"}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <img
              src={content.preview} alt={content.message}
              style={{maxHeight: 210, borderRadius: "1px"}}
            />
            <Stack spacing={2}>
              <Typography variant={"subtitle2"}>Writing diploma</Typography>
              <Typography
                variant={"subtitle2"} sx={{color: theme.palette.primary.main}}
                component={Link}
                to={"//https://www.youtube.com"}
              >
                www.youtube.com
              </Typography>
            </Stack>
            <Typography variant={"body2"} color={content.incoming}>
              {content.message}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      {/*message options*/}
      {showMessageOptions && <MessageOptions />}
    </Stack>
  )
}

const ReplyMsg = ({content, showMessageOptions}) => {
  const theme = useTheme()
  return (
    <Stack direction={"row"} justifyContent={content.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: content.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content"
        }}>
        <Stack spacing={2}>
          <Stack
            p={2} direction="column"
            spacing={3} alignItems={"center"}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Typography variant={"body2"} color={theme.palette.text}>
              {content.message}
            </Typography>
          </Stack>
          <Typography variant={"body2"} color={content.incoming ? theme.palette.text : "#fff"}>
            {content.reply}
          </Typography>
        </Stack>
      </Box>
      {/*message options*/}
      {showMessageOptions && <MessageOptions />}
    </Stack>
  );
};

const ImgMsg = ({content, showMessageOptions}) => {
  const theme = useTheme()
  return (
    <Stack direction={"row"} justifyContent={content.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: content.incoming
            ? theme.palette.background.paper
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content"
        }}>
        <Stack spacing={1}>
          <img
            src={content.img}
            alt={content.message}
            style={{maxHeight: 210, borderRadius: "10px"}}
          />
          <Typography variant={"body2"} color={content.incoming ? theme.palette.text : "#fff"}>
            {content.message}
          </Typography>
        </Stack>
      </Box>
      {/*message options*/}
      {showMessageOptions && <MessageOptions />}
    </Stack>
  )
}
const TextMsg = ({content, showMessageOptions}) => {
  const theme = useTheme()
  return (
    <Stack direction={"row"} justifyContent={content.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: content.incoming
            ? theme.palette.background.paper
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content"
        }}>
        <Typography variant={"body2"} color={content.incoming ? theme.palette.text : "#fff"}>
          {content.message}
        </Typography>
      </Box>
      {/*message options*/}
      {showMessageOptions && <MessageOptions />}
    </Stack>
  );
};

const Timeline = ({content}) => {
  const theme = useTheme();

  return (
    <Stack direction={'row'} alignItems={"center"} justifyContent={"space-between"}>
      <Divider width={"46%"}/>
      <Typography variant={"caption"} sx={{color: theme.palette.text}}>{content.text}</Typography>
      <Divider width={"46%"}/>

    </Stack>
  );
};

const MessageOptions = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <DotsThreeVertical
        id="message-options"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size={20}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'message-options',
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((item)=>(
            <MenuItem onClick={handleClick}>
              {item.title}
            </MenuItem>
          ))}

        </Stack>
      </Menu>

    </>
  )
}

export {Timeline, TextMsg, ImgMsg, ReplyMsg, LinkMsg,  DocMsg};
