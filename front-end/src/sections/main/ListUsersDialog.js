import React, {useState} from 'react';
import {Button, IconButton, Stack, Typography} from "@mui/material";
import {Search, SearchIconWrapper, StyledInputBase} from "../../components/Search";
import {Chat, MagnifyingGlass} from "phosphor-react";
import {SimpleBarStyle} from "../../components/Scrollbar";
import AvatarWithOnline from "../../components/ChatElements/AvatarWithOnline";
import ShowDialog from "../../components/dialog/ShowDialog";
import {getSocket} from "../../socket";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentConversation} from "../../redux/slices/messagesSlice";

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
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const user_id = user._id;
    const filteredUsers = usersList?.filter(user =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const socket = getSocket();


    const handleBeginConversation = (to, from) => {
        socket.emit('start_conversation', {to: to, from: from});
        const current_user_info = usersList?.find(user => user._id === to);
        console.log("current_user_info", current_user_info)
        const current_conversation_user_info = {
            _id: current_user_info._id,
            name: `${current_user_info.first_name} ${current_user_info.last_name}`,
            img: current_user_info.image,
            online: current_user_info.online
        }
        navigate(`/app`);
        handleClose();

        dispatch(setCurrentConversation(current_conversation_user_info));
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
