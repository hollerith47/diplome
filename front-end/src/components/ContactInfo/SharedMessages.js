import React from 'react';
import {Box, Grid, IconButton, Stack, Tab, Tabs} from "@mui/material";
import {UpdateSidebarType} from "../../redux/slices/appSlice";
import {ArrowLeft} from "phosphor-react";
import {useTheme} from "@mui/material/styles";
import {useDispatch} from "react-redux";
import {faker} from "@faker-js/faker";
import {SHARED_DOCS, SHARED_LINKS} from "../../_data";
import {DocMsg, LinkMsg} from "../Conversation/MsgTypes";

const SharedMessages = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{width: 320, height: "100vh"}}>
      <Stack sx={{height: "100%", backgroundColor: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper}}>
        {/*Header */}
        <Box
          sx={{
            boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
            width: "100%",
            backgroundColor: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper
          }}
        >
          <Stack
            sx={{height: "100%", p: 2}}
            direction={"row"} alignItems={"center"}
            spacing={3}
          >
            <IconButton onClick={() => dispatch(UpdateSidebarType({type: "CONTACT"}))}>
              <ArrowLeft/>
            </IconButton>
          </Stack>
        </Box>
        <Tabs sx={{px: 2, pt: 1}} value={value} onChange={handleChange} centered>
          <Tab label="Media"/>
          <Tab label="Link"/>
          <Tab label="Docs"/>
        </Tabs>
        {/*  end header */}
        {/*  body */}
        <Stack
          p={3}
          spacing={value === 1 ? 3 : 1}
          alignItems={"center"}
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}>
          {(() => {
            switch (value) {
              case 0:
                //render media
                return (
                  <Grid container spacing={2}>
                    {[0,1,2,3,4,5,6].map((item)=>(
                      <Grid item xs={4}>
                        <img src={faker.image.avatar()} alt=""/>
                      </Grid>
                    ))}
                  </Grid>
                )
              case 1:
                //render links
                return (
                  SHARED_LINKS.map((item)=>(
                    <LinkMsg content={item}/>
                  ))
                )
              case 2:
                //render Docs
                return SHARED_DOCS.map((item)=> <DocMsg content={item} />)
              default:
                break;
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
};

export default SharedMessages;
