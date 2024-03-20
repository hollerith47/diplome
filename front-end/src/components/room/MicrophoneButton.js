import ButtonContainer from "./ButtonContainer";
import {Microphone, MicrophoneSlash} from "phosphor-react";
import {IconButton} from "@mui/material";
import {useState} from "react";

const MicrophoneButton = () => {
    const [microphoneEnabled, setMicrophoneEnabled] = useState(false);
    const handleToggleMicrophone = () => {
        setMicrophoneEnabled(prev => !prev);
    }
    return (
        <ButtonContainer>
            <IconButton onClick={handleToggleMicrophone} sx={{color: "black"}}>
                {microphoneEnabled ? <Microphone/> : <MicrophoneSlash/>}
            </IconButton>
        </ButtonContainer>
    );
};

export default MicrophoneButton;
