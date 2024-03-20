import ButtonContainer from "./ButtonContainer";
import {Monitor, StopCircle} from "phosphor-react";
import {IconButton} from "@mui/material";
import {useState} from "react";

const ShareScreenButton = () => {
    const [shareScreen, setShareScreen] = useState(false);
    const handleToggleShareScreen = () => {
        setShareScreen(prev => !prev);
    }
    return (
        <ButtonContainer>
            <IconButton onClick={handleToggleShareScreen} sx={{color: "black"}}>
                {!shareScreen ? <Monitor /> : <StopCircle />}
            </IconButton>
        </ButtonContainer>
    );
};

export default ShareScreenButton;
