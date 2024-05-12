import React, {useState} from 'react';
import {Button, IconButton, Stack, Typography} from "@mui/material";
import {Search, SearchIconWrapper, StyledInputBase} from "../../components/Search";
import {Chat, MagnifyingGlass} from "phosphor-react";
import {SimpleBarStyle} from "../../components/Scrollbar";
import AvatarWithOnline from "../../components/ChatElements/AvatarWithOnline";
import ShowDialog from "../../components/dialog/ShowDialog";
import {socket} from "../../socket";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SetCurrentConversation} from "../../redux/slices/conversationSlice";

const ListUsersDialogHeader = ({setSearchTerm}) => (
    <Stack sx={{flexGrow: 1}}>
        <Search bgColor={"#EAF2FE"}>
            <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6"/>
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Поиск…"
                inputProps={{"aria-label": "search"}}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </Search>
    </Stack>
)

const CreateCallDialogBody = ({usersList, searchTerm, handleClose}) => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const user_id = user._id;
    const dispatch = useDispatch();
    const filteredUsers = usersList.filter(user =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const handleBeginConversation = (to, from, item) => {
        socket.emit('start_conversation', {to: to, from: from});
        // navigate(`/chats`);
        // navigate(`/conversation`);
        navigate(`/app`);
        dispatch(SetCurrentConversation({
            id : to,
            user_id: item._id,
            name: `${item.first_name} ${item.last_name}`,
            online: item.status
        }))
        handleClose();
    }

    return (
        <SimpleBarStyle timeout={500} clickOnTrack={false}>
            {filteredUsers.map((item) => (
                <Stack sx={{border: '1px solid primary.main'}} direction="row" justifyContent="space-between"
                       alignItems="center"
                >
                    <Button
                        sx={{width: "100%", display: "flex", justifyContent: "flex-start", padding: 1}}
                        onClick={()=> handleBeginConversation(item._id, user_id, item)}
                    >
                        <Stack direction="row" alignItems={"center"} spacing={2} mt={0}>
                            <AvatarWithOnline image={item.image} online={false}/>
                            <Typography variant="subtitle2">
                                {item.first_name}{" "}{item.last_name}
                            </Typography>
                        </Stack>
                    </Button>
                    <Stack>
                        <IconButton
                            onClick={()=> handleBeginConversation(item._id, user_id, item)}
                        >
                            <Chat/>
                        </IconButton>
                    </Stack>
                </Stack>
            ))}
        </SimpleBarStyle>
    )
}
const ListUsersDialog = ({usersList, open, handleClose}) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
            <ShowDialog
                handleClose={handleClose}
                header={<ListUsersDialogHeader setSearchTerm={setSearchTerm} />}
                content={<CreateCallDialogBody usersList={usersList} searchTerm={searchTerm} handleClose={handleClose}/>}
                open={open}
            />
        </>
    );
};

export default ListUsersDialog;
