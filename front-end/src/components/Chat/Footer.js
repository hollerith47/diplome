import {
    Box,
    IconButton,
    Stack,
} from "@mui/material";
import {
    PaperPlaneTilt,
} from "phosphor-react";
import {useTheme} from "@mui/material/styles";
import {useState, useRef} from "react";
import useResponsive from "../../hooks/useResponsive";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {useDispatch, useSelector} from "react-redux";
import ChatInput from "./ChatInput";
import {checkAndSendImages, checkAndSendText} from "../../redux/slices/messagesSlice";

function linkify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(
        urlRegex,
        (url) => `<a href="${url}" target="_blank">${url}</a>`
    );
}
function containsUrl(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
}

const Footer = () => {
    const theme = useTheme();
    const dispatch = useDispatch()
    const {current_conversation} = useSelector(store => store.messages.chat);
    const user_id = useSelector(store => store.auth.user._id);
    const isMobile = useResponsive("between", "md", "xs", "sm");
    const {sideBar} = useSelector(store => store.app);
    const [openPicker, setOpenPicker] = useState(false);
    const [value, setValue] = useState("");
    const [file, setFile] = useState(null);
    const inputRef = useRef(null);

    function handleEmojiClick(emoji) {
        const input = inputRef.current;

        if (input) {
            const selectionStart = input.selectionStart;
            const selectionEnd = input.selectionEnd;

            setValue(
                value.substring(0, selectionStart) +
                emoji +
                value.substring(selectionEnd)
            );
            // Move the cursor to the end of the inserted emoji
            input.selectionStart = input.selectionEnd = selectionStart + 1;
        }
    }

    function handleFileSelect(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    }

    async function sendMessage() {
        if (value.trim() !== "" && !file) {
            const messageContent = linkify(value);
            const type = file ? file.type : (containsUrl(value) ? "Link" : "Text");
            const fileName = file ? file.name : null

            const data = {
                text: messageContent,
                userId: user_id,
                conversationId: current_conversation?._id,
                type: type,
                file: fileName,
            }
            dispatch(checkAndSendText(data))
            setValue("");
            setFile(null);
        }else if (file){
            const formData = new FormData();
            formData.append('file', file);
            formData.append('text', linkify(value));
            formData.append('userId', user_id);
            formData.append('toUserId', current_conversation?._id);
            formData.append('type', file.type);
            dispatch(checkAndSendImages(formData))
            setValue("");
            setFile(null);
        }
    }

    return (
        <Box
            sx={{
                position: "relative",
                backgroundColor: "transparent !important",
            }}
        >
            <Box
                p={isMobile ? 1 : 2}
                width={"100%"}
                sx={{
                    backgroundColor:
                        theme.palette.mode === "light"
                            ? "#F8FAFF"
                            : theme.palette.background,
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                }}
            >
                <Stack direction="row" alignItems={"center"} spacing={isMobile ? 1 : 3}>
                    <Stack sx={{width: "100%"}}>
                        <Box
                            style={{
                                zIndex: 10,
                                position: "fixed",
                                display: openPicker ? "inline" : "none",
                                bottom: 81,
                                right: isMobile ? 20 : sideBar?.open ? 420 : 100,
                            }}
                        >
                            <Picker
                                theme={theme.palette.mode}
                                data={data}
                                onEmojiSelect={(emoji) => {
                                    handleEmojiClick(emoji.native);
                                }}
                            />
                        </Box>
                        {/* Chat Input */}
                        <ChatInput
                            inputRef={inputRef}
                            value={value}
                            setValue={setValue}
                            openPicker={openPicker}
                            setOpenPicker={setOpenPicker}
                            onFileSelect={handleFileSelect}
                        />
                    </Stack>
                    <Box
                        sx={{
                            height: 48,
                            width: 48,
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: 1.5,
                        }}
                    >
                        <Stack
                            sx={{height: "100%"}}
                            alignItems={"center"}
                            justifyContent="center"
                        >
                            <IconButton onClick={sendMessage}>
                                <PaperPlaneTilt color="#ffffff"/>
                            </IconButton>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default Footer;
