import React from 'react';
import { Box, Stack,} from "@mui/material";
import Header from "../Chat/Header";
import Footer from "../Chat/Footer";
import Message from "./Message";



const ConversionComponent = () => {
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/*chat header*/}
      <Header />
      {/*messages*/}
      <Box width={"100%"} sx={{flexGrow: 1, height: "100%", overflowY: "scroll"}}>
        <Message showMessageOptions />
      </Box>
      {/*chat footer*/}
      <Footer />
    </Stack>
  );
};

export default ConversionComponent;
