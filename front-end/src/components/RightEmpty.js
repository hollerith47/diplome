import {Box, Stack} from "@mui/material";
import NoChat from "../assets/Illustration/NoChat";
import {useSelector} from "react-redux";
import {useTheme} from "@mui/material/styles";

const RightEmpty = () => {
    const {sideBar} = useSelector(store => store.app);
    const theme = useTheme();

    return (
        <Box
            sx={{
                height: "100%",
                width: sideBar?.open
                    ? `calc(100vw - 740px )`
                    : "calc(100vw - 420px )",
                backgroundColor:
                    theme.palette.mode === "light"
                        ? "#FFF"
                        : theme.palette.background.paper,
            }}
        >
            <Stack
                spacing={2}
                sx={{height: "100vh", width: "100%"}}
                alignItems="center"
                justifyContent={"center"}
            >
                <NoChat/>
            </Stack>
        </Box>
    );
};

export default RightEmpty;
