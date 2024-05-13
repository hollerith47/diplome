import {useState, useRef} from "react";
import {Fab, IconButton, InputAdornment, Stack, TextField, Tooltip} from "@mui/material";
import { File, Image, LinkSimple, Smiley } from "phosphor-react";
import {styled} from "@mui/material/styles";


const StyledInput = styled(TextField)(({theme}) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px !important",
        paddingBottom: "12px !important",
    },
}));

const Actions = [
    {
        color: "#4da5fe",
        icon: <Image size={24}/>,
        y: 102,
        title: "фото",
        type: "image/*"
    },
    {
        color: "#0159b2",
        icon: <File size={24}/>,
        y: 172,
        title: "Файл/документ",
        type: "application/*"
    },
];
const ChatInput = ({openPicker, setOpenPicker, setValue, value, inputRef}) => {
    const [openActions, setOpenActions] = useState(false);

    return (
        <StyledInput
            fullWidth
            inputRef={inputRef}
            placeholder="Напишите сообщение..."
            variant="filled"
            value={value}
            onChange={e => {
                setValue(e.target.value)
            }}
            InputProps={{
                disableUnderline: true,
                startAdornment: (
                    <Stack sx={{width: "max-content"}}>
                        <Stack
                            sx={{
                                position: "relative",
                                display: openActions ? "inline-block" : "none",
                            }}
                        >
                            {Actions.map((el) => (
                                <Tooltip placement="right" title={el.title}>
                                    <Fab
                                        onClick={() => {
                                            setOpenActions(!openActions);
                                        }}
                                        sx={{
                                            position: "absolute",
                                            top: -el.y,
                                            backgroundColor: el.color,
                                        }}
                                        aria-label="add"
                                    >
                                        {el.icon}
                                    </Fab>
                                </Tooltip>
                            ))}
                        </Stack>

                        <InputAdornment position="">
                            <IconButton
                                onClick={() => {
                                    setOpenActions(!openActions);
                                }}
                            >
                                <LinkSimple/>
                            </IconButton>
                        </InputAdornment>
                    </Stack>
                ),
                endAdornment: (
                    <Stack sx={{position: "relative"}}>
                        <InputAdornment position="">
                            <IconButton
                                onClick={() => {
                                    setOpenPicker(!openPicker);
                                }}
                            >
                                <Smiley/>
                            </IconButton>
                        </InputAdornment>
                    </Stack>
                ),
            }}
        />
    );
};

export default ChatInput;
