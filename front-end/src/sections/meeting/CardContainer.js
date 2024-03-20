import {Button, Card, Stack} from "@mui/material";
import useResponsive from "../../hooks/useResponsive";

const CardContainer = ({children}) => {
    const isDesktop = useResponsive("up", "md");
    return (
        <>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 4,
                    width: isDesktop ? 320 : "auto",
                    // py: 8,
                }}
            >
                {children}

            </Card>

        </>
    );
};

export default CardContainer;
