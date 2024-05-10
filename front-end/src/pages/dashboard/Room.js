import {Stack} from "@mui/material";
import Label from "../../sections/room/Label";
import Participants from "../../sections/room/Participants";
import GroupChat from "../../sections/room/GroupChat";
import Video from "../../sections/room/Video";
import {useEffect} from "react";
import * as webRTCHandler from "../../utils/webRTCHandler";
import {useSelector} from "react-redux";
import Overlay from "../../sections/room/Overlay";
import {useNavigate} from "react-router-dom";

const Room = () => {
    const {identity, isRoomHost, roomId, showOverlay, connectionOnlyWithAudio} = useSelector(store=>store.app);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isRoomHost && !roomId){
            navigate("/intro");
        }else{
            webRTCHandler.getLocalPreviewAndInitRoomConnection(isRoomHost,identity, roomId, connectionOnlyWithAudio)
        }
    }, [connectionOnlyWithAudio]);


    return (
        <>
            <Stack
                direction="row"
                align="center"
                sx={{position: "relative", width: "92vw", height: "100vh"}}
            >
                {/*    Participants*/}
                <Participants/>
                {/*    video section*/}
                <Video/>
                {/*    Group chat section*/}
                <GroupChat/>
                {/*    Label*/}
                <Label/>
                {showOverlay && <Overlay />}
            </Stack>
        </>
    );
};

export default Room;
