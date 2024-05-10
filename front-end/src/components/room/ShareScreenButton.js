import ButtonContainer from "./ButtonContainer";
import {Monitor, StopCircle} from "phosphor-react";
import {IconButton} from "@mui/material";
import * as webRTCHandler from "../../utils/webRTCHandler"


const constraints = {
    audio: false,
    video: true,
}
const ShareScreenButton = ({shareScreenEnabled, setShareScreenEnabled, screenSharingStream, setScreenSharingStream}) => {
    // const [shareScreenEnabled, setShareScreenEnabled] = useState(false);
    // const [screenSharingStream, setScreenSharingStream] = useState(null);
    const handleToggleShareScreen = async () => {
        // setShareScreen(prev => !prev);
        if (!shareScreenEnabled){
            let stream = null;
            try {
                stream = await navigator.mediaDevices.getDisplayMedia(constraints)
            }catch (err){
                console.log("Sharing screen stream error",err);
            }

            if (stream){
                setScreenSharingStream(stream);
                webRTCHandler.toggleScreenShare(shareScreenEnabled, stream);
                setShareScreenEnabled(true);

            }
        }
        else{
            // execute function to switch the video tracks
            // switch the video track from camera
            webRTCHandler.toggleScreenShare(shareScreenEnabled);
            setShareScreenEnabled(false)

            // stop screenSharingStream
            screenSharingStream.getTracks().forEach(track => {
                track.stop();
            })
            setScreenSharingStream(null);
        }
    }

    return (
        <ButtonContainer>
            <IconButton onClick={handleToggleShareScreen} sx={{color: "black"}}>
                {!shareScreenEnabled ? <Monitor /> : <StopCircle />}
            </IconButton>
        </ButtonContainer>
    );
};

export default ShareScreenButton;
