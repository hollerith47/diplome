import ButtonContainer from "./ButtonContainer";
import {VideoCamera, VideoCameraSlash} from "phosphor-react";
import {IconButton} from "@mui/material";
import {useState} from "react";

const VideoButton = () => {
    const [videoEnabled, setVideoEnabled] = useState(false);
    const handleToggleVideo = () => {
        setVideoEnabled(prev => !prev);
    }
    return (
        <ButtonContainer>
            <IconButton onClick={handleToggleVideo} sx={{color: "black"}}>
                {videoEnabled ? <VideoCamera /> : <VideoCameraSlash />}
            </IconButton>
        </ButtonContainer>
    );
};

export default VideoButton;
