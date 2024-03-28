import React from 'react';
import {Stack} from "@mui/material";
import {Search, SearchIconWrapper, StyledInputBase} from "../../components/Search";
import {MagnifyingGlass} from "phosphor-react";
import CallLogElement from "../../components/CallLogElement";
import {SimpleBarStyle} from "../../components/Scrollbar";
import {CALL_LOG} from "../../_data";
import ShowDialog from "../../components/dialog/ShowDialog";

const CreateCallDialogHeader = () =>(
    <Stack sx={{flexGrow: 1}}>
        <Search bgColor={"#EAF2FE"}>
            <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6"/>
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{"aria-label": "search"}}
            />
        </Search>
    </Stack>
)

const CreateCallDialogBody = () => {
    const appId = 510839379;
    const server = "wss://webliveroom510839379-api.coolzcloud.com/ws";
    return (
        <SimpleBarStyle timeout={500} clickOnTrack={false}>
            {CALL_LOG.map((item)=>(
                <CallLogElement isBordered={true} {...item} isDialogLog={true}/>
            ))}
        </SimpleBarStyle>
    )
}

const CreateCallDialog = ({open, handleClose}) => {
  return (
    <>
        <ShowDialog
            handleClose={handleClose}
            header={<CreateCallDialogHeader />}
            content={<CreateCallDialogBody />}
            open={open}
        />
    </>
  );
};

export default CreateCallDialog;
