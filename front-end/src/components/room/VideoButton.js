import ButtonContainer from "./ButtonContainer";
import {VideoCamera, VideoCameraSlash} from "phosphor-react";
import {IconButton} from "@mui/material";
import {useState} from "react";
import {toggleVideo} from "../../utils/webRTCHandler";

const VideoButton = () => {
    const [videoEnabled, setVideoEnabled] = useState(true);
    const handleToggleVideo = () => {
        toggleVideo(videoEnabled);
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
