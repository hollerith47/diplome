import {useTheme} from "@mui/material/styles";
import {Box, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {PaperPlaneTilt} from "phosphor-react";

const GroupChat = () => {
    const theme = useTheme();
    return (
        <>
            <Box sx={{
                width: 320,
                height: 1,
                textAlign: "left",
                borderLeft: `1px solid ${theme.palette.divider}`,
                flexDirection: "column",
                display: "flex",
                p: 2
            }}>
                <Typography
                    variant="subtitle1"
                    sx={{color: "text.secondary"}}
                >
                    Групповой чат
                </Typography>
                <Box sx={{flexGrow: 1}}>
                </Box>
                <TextField
                    placeholder="Напишите сообщение..."
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <PaperPlaneTilt />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </>
    );
};

export default GroupChat;
