import React from 'react';
import { Box, Stack,} from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";



const Conversion = () => {
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/*chat header*/}
      <Header />
      {/*messages*/}
      <Box width={"100%"} sx={{flexGrow: 1, height: "100%", overflowY: "scroll"}}>
        <Message showMessageOptions={true} />
      </Box>
      {/*chat footer*/}
      <Footer />
    </Stack>
  );
};

export default Conversion;
