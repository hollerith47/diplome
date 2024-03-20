import React from 'react';
import {Stack, Typography} from "@mui/material";
import {Search, SearchIconWrapper, StyledInputBase} from "../../components/Search";
import {ArrowUpRight, MagnifyingGlass} from "phosphor-react";
import {SimpleBarStyle} from "../../components/Scrollbar";
import AvatarWithOnline from "../../components/ChatElements/AvatarWithOnline";
import ShowDialog from "../../components/dialog/ShowDialog";

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
            <Stack direction={"row"} alignItems={"center"} spacing={2} mt={2}>
                <AvatarWithOnline online={false}/>
                <Typography variant="subtitle2">
                    {item.first_name}{" "}{item.last_name}
                </Typography>
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
