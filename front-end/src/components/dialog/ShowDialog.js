import React from 'react';
import DialogContainer from "./DialogContainer";
import {Stack} from "@mui/material";
import {Search, SearchIconWrapper, StyledInputBase} from "../Search";
import {MagnifyingGlass} from "phosphor-react";
import CLoseDialogIcon from "../CLoseDialogIcon";
import {SimpleBarStyle} from "../Scrollbar";
import {CALL_LOG} from "../../_data";
import CallLogElement from "../CallLogElement";
import DialogBody from "./DialogBody";


const ShowDialog = ({open, handleClose, header, content}) => {
    return (
        <>
            <DialogContainer
                openDialog={open}
                maxWidth={"xs"}
                handleCloseDialog={handleClose}
            >
                <DialogBody content={content} handleClose={handleClose} header={header} />
            </DialogContainer>

        </>
    );
};

export default ShowDialog;
