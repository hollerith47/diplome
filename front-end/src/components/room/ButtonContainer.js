import {Box} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const ButtonContainer = ({children, bgColor}) => {
    const theme = useTheme();
    return (
        <>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                p: 0.5,
                borderRadius: 4,
                backgroundColor: bgColor ? bgColor : theme.palette.grey[100]
            }}>
                {children}

            </Box>
        </>
    );
};

export default ButtonContainer;
