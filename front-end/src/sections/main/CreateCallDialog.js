import React, {useState} from 'react';
import CallLogElement from "../../components/CallLogElement";
import {SimpleBarStyle} from "../../components/Scrollbar";
import ShowDialog from "../../components/dialog/ShowDialog";
import {useSelector} from "react-redux";
import SearchBar from "../../components/SearchBar";

const CreateCallDialogBody = ({usersList, searchTerm}) => {
    const appId = 510839379;
    const server = "wss://webliveroom510839379-api.coolzcloud.com/ws";

    const filteredUsers = usersList?.filter(user =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // console.log("filteredUsers", filteredUsers);
    return (
        <SimpleBarStyle timeout={500} clickOnTrack={false}>
            {filteredUsers.map((item)=>(
                <CallLogElement isBordered={true} userData={item} logInfo={CallLogElement} isDialogLog={true}/>
            ))}
        </SimpleBarStyle>
    )
}

const CreateCallDialog = ({open, handleClose}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const {allUsers} = useSelector(store => store.auth);


  return (
    <>
        <ShowDialog
            handleClose={handleClose}
            header={<SearchBar isDialog={true} setSearchTerm={setSearchTerm} />}
            content={
            <CreateCallDialogBody
                searchTerm={searchTerm}
                usersList={allUsers}
            />}
            open={open}
        />
    </>
  );
};

export default CreateCallDialog;
