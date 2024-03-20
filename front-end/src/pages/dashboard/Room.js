import {Stack} from "@mui/material";
import MeetingContainer from "../../sections/meeting/MeetingContainer";
import Label from "../../sections/room/Label";
import Participants from "../../sections/room/Participants";
import GroupChat from "../../sections/room/GroupChat";
import Video from "../../sections/room/Video";

const Room = () => {

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
            </Stack>
        </>
    );
};

export default Room;
