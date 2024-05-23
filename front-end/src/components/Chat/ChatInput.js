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
    }
];
const ChatInput = ({openPicker, setOpenPicker, setValue, value, inputRef, onFileSelect}) => {
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
                            {Actions.map((el, index) => (
                                <Tooltip key={index} placement="right" title={el.title}>
                                    <Fab
                                        onClick={() => document.getElementById(`file-input-${index}`).click()}
                                        // onClick={() => {
                                        //     setOpenActions(!openActions);
                                        // }}
                                        sx={{
                                            position: "absolute",
                                            top: -el.y,
                                            backgroundColor: el.color,
                                        }}
                                        aria-label="add"
                                    >
                                        {el.icon}
                                    </Fab>
                                    <input
                                        type="file"
                                        id={`file-input-${index}`}
                                        style={{display: "none"}}
                                        accept={el.type}
                                        onChange={onFileSelect}
                                    />
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
