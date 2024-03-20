import {Box, Stack} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {HangUpButton, MicrophoneButton, ShareScreenButton, VideoButton} from "../../components/room";


const Video = () => {
    const theme = useTheme();

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
                    <MicrophoneButton/>
                    <VideoButton />
                    <ShareScreenButton />
                    <HangUpButton />
                </Stack>

            </Box>

        </Box>
    );
};

export default Video;
