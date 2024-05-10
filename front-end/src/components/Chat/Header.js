import React from 'react';
import {Avatar, Box, Divider, IconButton, Stack, Typography} from "@mui/material";
import {faker} from "@faker-js/faker";
import {CaretDown, MagnifyingGlass, Phone, VideoCamera} from "phosphor-react";
import {useTheme} from "@mui/material/styles";
import StyledBadge from "../StyledBadge";
import {ToggleSidebar} from "../../redux/slices/appSlice";
import {useDispatch} from "react-redux";

const Header = ({to_user}) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const fullName = `${to_user.first_name} ${to_user.last_name}`;

    return (
        <>
        <Box
            p={2}
            sx={{
                width: "100%",
                boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
                backgroundColor: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper
            }}
        >
            <Stack
                alignItems={"center"}
                direction={"row"}
                justifyContent={"space-between"}
                sx={{width: "100%", height: "100%"}}
            >
                {/* avatar online */}
                <Stack
                    onClick={()=> dispatch(ToggleSidebar())}
                    direction={"row"} spacing={2}>
                    <Box>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                            variant="dot"
                        >
                            <Avatar alt={fullName} src={to_user.image}/>
                        </StyledBadge>
                    </Box>
                    <Stack spacing={0.2}>
                        <Typography variant={"subtitle2"}>{fullName}</Typography>
                        <Typography variant={"caption"}>Online</Typography>
                    </Stack>
                </Stack>
                {/* btns */}
                <Stack direction={"row"} spacing={3}>
                    <IconButton><VideoCamera/></IconButton>
                    <IconButton><Phone/></IconButton>
                    <IconButton><MagnifyingGlass/></IconButton>
                    <Divider orientation={"vertical"} flexItem/>
                    <IconButton onClick={()=> dispatch(ToggleSidebar())}><CaretDown/></IconButton>
                </Stack>
            </Stack>
        </Box>
        </>
    );
};

export default Header;
