import {Stack, Typography} from "@mui/material";
import JoinForm from "../../sections/meeting/JoinForm";
import MeetingContainer from "../../sections/meeting/MeetingContainer";
import CardContainer from "../../sections/meeting/CardContainer";
import {useSelector} from "react-redux";

const Join = () => {
    const {isRoomHost} = useSelector(store => store.app);
    const titleText = isRoomHost ? "Провести встречу" : "Присоединиться к встрече";

    return (
        <>
            <MeetingContainer>
                <CardContainer>
                    <Stack
                        spacing={3}
                        sx={{width: 1}}
                    >
                        <Typography
                            textAlign="center"
                            variant="h3"
                        >
                            {titleText}
                        </Typography>
                        <JoinForm/>
                    </Stack>
                </CardContainer>
            </MeetingContainer>
        </>
    );
};

export default Join;
