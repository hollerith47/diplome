import React from "react";
import Chats from "./Chats";
import {Box, Stack} from "@mui/material";
import Conversion from "../../components/Conversion";
import {useTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";
import {ContactInfo, StarredMessage} from "../../components/ContactInfo";
import SharedMessages from "../../components/ContactInfo/SharedMessages";

const GeneralApp = () => {
  const theme = useTheme();
  const {sidebar} = useSelector((store) => store.app);
  // console.log(sidebar)


  return (
    <Stack direction="row" sx={{width: "100%", height: "100%"}}>
      {/*chat compenent*/}
      <Chats/>
      {/*conversation component*/}
      <Box
        sx={{
          height: "100%",  // 100 sidebar + 320 chats + 320 contact info
          width: sidebar.open ? "calc(100vw - 420px - 320px)" : "calc(100vw - 420px)",
          backgroundColor: theme.palette.mode === "light"
            ? "#F0F4FA"
            : theme.palette.background
        }}
      >
        {/* conversations */}
        <Conversion/>
      </Box>
      {/*  contact Info*/}
      {sidebar.open && (() => {
        // console.log(sidebar)
        switch (sidebar.type) {
          case 'CONTACT':
            //render contact component
            return <ContactInfo />
          case 'STARRED':
            return <StarredMessage />
          case "SHARED":
            return <SharedMessages />;
          default:
            break;
        }
      })()

      }

    </Stack>
  );
};

export default GeneralApp;
