import {Box, CircularProgress} from "@mui/material";
import {alpha} from "@mui/material/styles";

const Overlay = () => {
    return (
        <Box sx={{
            position:"absolute",
            height: "100vh",
            width: "100vw",
            backgroundColor: (theme) => alpha(theme.palette.grey[700], 0.6),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
        }}>
            <CircularProgress />
        </Box>
    );
};

export default Overlay;
