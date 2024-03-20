import {Button, Stack} from "@mui/material";
import CardContainer from "../../sections/meeting/CardContainer";
import MeetingContainer from "../../sections/meeting/MeetingContainer";
import {useNavigate} from "react-router-dom";

const Intro = () => {
    const navigate = useNavigate();
    const pushToJoinRoomPageAsHost = () => {
        navigate("/join-room?host=true")
    }
    const pushToJoinRoomPage = () => {
        navigate("/join-room")
    }

    return (
        <MeetingContainer>
            <CardContainer>
                <Stack
                    spacing={2}
                    sx={{width: 1}}
                >
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={pushToJoinRoomPage}
                    >
                        Join Meeting
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={pushToJoinRoomPageAsHost}
                    >
                        Host Meeting
                    </Button>
                </Stack>
            </CardContainer>
        </MeetingContainer>
    );
};

export default Intro;
