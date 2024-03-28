import React from 'react';
import {IconButton, Stack, Typography} from "@mui/material";
import {Search, SearchIconWrapper, StyledInputBase} from "../../components/Search";
import { Chat, MagnifyingGlass} from "phosphor-react";
import {SimpleBarStyle} from "../../components/Scrollbar";
import AvatarWithOnline from "../../components/ChatElements/AvatarWithOnline";
import ShowDialog from "../../components/dialog/ShowDialog";
import {socket} from "../../socket";

const user_id = window.localStorage.getItem("user_id");
const ListUsersDialogHeader = () => (
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

const CreateCallDialogBody = ({usersList}) => (
    <SimpleBarStyle timeout={500} clickOnTrack={false}>
        {usersList.map((item) => (
            <Stack sx={{ border: '1px solid primary.main'}} direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction={"row"} alignItems={"center"} spacing={2} mt={2}>
                    <AvatarWithOnline online={false}/>
                    <Typography variant="subtitle2">
                        {item.first_name}{" "}{item.last_name}
                    </Typography>
                </Stack>
                <Stack>
                    <IconButton
                        onClick={() => {
                            socket.emit('start_conversation', {to: item.email, from: user_id});
                            console.log("start_conversation", {to: item.email, from: user_id})
                        }}
                    >
                        <Chat />
                    </IconButton>
                </Stack>
            </Stack>
        ))}
    </SimpleBarStyle>
)
const ListUsersDialog = ({usersList, open, handleClose}) => {

    return (
        <>
            <ShowDialog
                handleClose={handleClose}
                header={<ListUsersDialogHeader/>}
                content={<CreateCallDialogBody usersList={usersList}/>}
                open={open}
            />
        </>
    );
};

export default ListUsersDialog;
