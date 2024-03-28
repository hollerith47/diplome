import {Stack} from "@mui/material";
import Label from "../../sections/room/Label";
import Participants from "../../sections/room/Participants";
import GroupChat from "../../sections/room/GroupChat";
import Video from "../../sections/room/Video";
import {useEffect} from "react";
import * as webRTCHandler from "../../utils/webRTCHandler";
import {useSelector} from "react-redux";
import Overlay from "../../sections/room/Overlay";

const Room = () => {
    const {identity, isRoomHost, roomId, showOverlay} = useSelector(store=>store.app)

    useEffect(() => {
        webRTCHandler.getLocalPreviewAndInitRoomConnection(isRoomHost,identity, roomId)
    }, []);


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
