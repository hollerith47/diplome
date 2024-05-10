import ButtonContainer from "./ButtonContainer";
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {PhoneDisconnect} from "phosphor-react";
import {IconButton} from "@mui/material";

const HangUpButton = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const handleHangup = () => {
        const videosContainer = document.getElementById("videos_portal");
        if (videosContainer) videosContainer.innerHTML = "";
        navigate("/intro");

        setTimeout(()=> {
            window.location.reload();
        }, 100)
    }
    return (
        <ButtonContainer bgColor={theme.palette.error.main}>
            <IconButton onClick={handleHangup} sx={{color: theme.palette.common.white}}>
                <PhoneDisconnect />
            </IconButton>
        </ButtonContainer>
    );
};

export default HangUpButton;
