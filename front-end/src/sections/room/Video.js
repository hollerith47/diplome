import {Box, Stack} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {HangUpButton, MicrophoneButton, ShareScreenButton, VideoButton} from "../../components/room";
import {useState} from "react";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";
import {useSelector} from "react-redux";



const Video = () => {
    const theme = useTheme();
    const [shareScreenEnabled, setShareScreenEnabled] = useState(false);
    const [screenSharingStream, setScreenSharingStream] = useState(null);
    const {connectionOnlyWithAudio} = useSelector(store => store.app)

    return (
        <Box sx={{
            flexGrow: 1,
            position: 'relative',
            height: 1,

        }}
        >
            {/* video elements   */}
            {/* video controls   */}

            <Box sx={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                backgroundColor: theme.palette.primary.light,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: 80,
                borderRadius: 20,
            }}
            >
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}
                       sx={{height: 1}}
                >
                    {shareScreenEnabled && <LocalScreenSharingPreview  stream={screenSharingStream} />}
                    <MicrophoneButton/>
                    {!connectionOnlyWithAudio && <VideoButton />}
                    <ShareScreenButton
                        shareScreenEnabled={shareScreenEnabled}
                        setShareScreenEnabled={setShareScreenEnabled}
                        screenSharingStream={screenSharingStream}
                        setScreenSharingStream={setScreenSharingStream}
                    />
                    <HangUpButton />
                </Stack>

            </Box>

        </Box>
    );
};

export default Video;
