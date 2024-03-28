import {Box, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";

const Label = () => {
    const theme = useTheme();
    const {roomId} = useSelector(store =>store.app);
    return (
        <Box sx={{
            position: "absolute",
            top:2,
            py: 2,
            px:4,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: theme.palette.primary.main,
            borderRadius: 20,
            color: theme.palette.primary.contrastText
        }}>
            <Typography variant="subtitle1">
                ID: {roomId}
            </Typography>
        </Box>
    );
};

export default Label;
