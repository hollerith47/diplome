import React from 'react';
import DialogContainer from "../../components/DialogContainer";
import {Stack} from "@mui/material";
import {Search, SearchIconWrapper, StyledInputBase} from "../../components/Search";
import {MagnifyingGlass} from "phosphor-react";
import CLoseDialogIcon from "../../components/CLoseDialogIcon";
import CallLogElement from "../../components/CallLogElement";
import {SimpleBarStyle} from "../../components/Scrollbar";
import {CALL_LOG} from "../../data";

const CreateCallDialog = ({open, handleClose}) => {
  return (
    <>
      <DialogContainer
        openDialog={open}
        maxWidth={"xs"}
        handleCloseDialog={handleClose}
      >
        <Stack>
          <Stack direction={"row"} sx={{width: "100%"}}>
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
            <CLoseDialogIcon handleCloseDialog={handleClose}/>
          </Stack>
          <Stack
            mt={5}
            direction="column"
            sx={{flexGrow: 1, height: "100%", overflowX: "hidden", overflowY: "scroll",}}
          >
            <SimpleBarStyle timeout={500} clickOnTrack={false}>
              {CALL_LOG.map((item)=>(
                <CallLogElement isBordered={true} {...item} isDialogLog={true}/>
              ))}
            </SimpleBarStyle>
          </Stack>
        </Stack>
      </DialogContainer>

    </>
  );
};

export default CreateCallDialog;
