import {useTheme} from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import {Box,  Stack} from "@mui/material";

const MeetingContainer = ({children}) => {
    const theme = useTheme();
    const isDesktop = useResponsive("up", "md");
    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    width: isDesktop ? "100vw" :  320,
                    minHeight: "100vh",
                    backgroundColor: theme.palette.mode === 'light'
                        ? '#f8faff'
                        : theme.palette.background,
                    boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Stack
                    alignItems="center"
                    sx={{width: "100%", height: "100%"}}
                >
                    {children}
                </Stack>
            </Box>
        </>
    );
};

export default MeetingContainer;
