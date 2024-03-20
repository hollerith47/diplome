import React from 'react';
import {Stack} from "@mui/material";
import CLoseDialogIcon from "../CLoseDialogIcon";

const DialogBody = ({header, content, handleClose}) => {
    return (
        <>
            <Stack>
                <Stack direction={"row"} sx={{width: "100%"}}>
                    {/*  header */}
                    {header}
                    <CLoseDialogIcon handleCloseDialog={handleClose}/>
                </Stack>
                <Stack
                    mt={5}
                    direction="column"
                    sx={{flexGrow: 1, height: "100%", overflowX: "hidden", overflowY: "scroll",}}
                >
                    {/*  content */}
                    {content}
                </Stack>
            </Stack>

        </>
    );
};

export default DialogBody;
