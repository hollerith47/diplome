import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import axios from "axios";
import CryptoJS from "crypto-js";
import {BASE_FLASK_API, ENCRYPTION_KEY} from "../../config";
import {getSocket} from "../../socket";
import {decrypt, encrypt} from "../../dataEncryption";

// const secretKey = "1679e3a60a7d2123141074a836e1681a";
const secretKey = ENCRYPTION_KEY;


const user_id = window.localStorage.getItem('user_id');

const initialState = {
    isLoading: false,
    chat: {
        user_conversations: [],
        current_conversation: null,
        current_messages: []
    },
    isChatActive: false,
}

export const checkTextToxicity = async (texts) => {
    try {
        const response = await axios.post(`${BASE_FLASK_API}/check-texts`, {texts: texts});
        // const isToxic =
        console.log(response.data)
        return response.data[0].is_toxic;
    } catch (error) {
        console.log("checkTextToxicity Error:", error);
        // return thunkAPI.rejectWithValue(error.message);
        return false
    }
}
export const checkAndSendText = createAsyncThunk(
    'messages/checkAndSendText',
    async ({ text, userId, conversationId, type}, { dispatch, getState }) => {
        const toastId = toast.loading("Проверка сообщения перед отправкой...", {
            style: { backgroundColor: '#2C6E49', color: '#fff' }});
        try {
            const isToxic = await checkTextToxicity(text);
            toast.dismiss(toastId);  // Enlever le toast de chargement
            if (!isToxic) {
                const socket = getSocket();
                const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
                socket.emit("text_message", {
                    message: encrypted,
                    from: userId,
                    to: conversationId,
                    type: type,
                });
                toast.success("сообщение успешно отправлено!");
                return true;
            } else {
                toast.error("Возможно, содержимое токсично и не будет отправлено.");
                return false;
            }
        } catch (error) {
            toast.dismiss(toastId);
            console.log(error)
            toast.error("Error checking toxicity: " + error.message);
            return false;
        }
    }
);

export const checkImagesToxicity = async (img) => {
    try {
        const formData = new FormData();
        formData.append("image", img);
        const response = await axios.post(`${BASE_FLASK_API}/check-images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        // const isToxic =
        // console.log("check Images toxicity");
        // console.log(response.data.is_toxic);
        return response.data;
    } catch (error) {
        console.log("checkTextToxicity Error:", error);
        // return thunkAPI.rejectWithValue(error.message);
        return false
    }
}
export const checkAndSendImages = createAsyncThunk(
    'messages/checkAndSendImages',
    async (formData, { dispatch, getState }) => {
        const toastId = toast.loading("Проверка сообщения перед отправкой...", {
            style: { backgroundColor: '#2C6E49', color: '#fff' }});
        try {
            const imageResponse = await checkImagesToxicity(formData.get("file"));
             // Enlever le toast de chargement
            const isTextToxic = await checkTextToxicity(formData.get('text'));
            toast.dismiss(toastId);
            if (!imageResponse.is_toxic) {
                const socket = getSocket();
                const fileUrl = `${BASE_FLASK_API}${imageResponse.image}`;
                const encrypted = CryptoJS.AES.encrypt(formData.get('text'), secretKey).toString();

                socket.emit("text_message", {
                    message: isTextToxic ? "" : encrypted,
                    from: formData.get('userId'),
                    to: formData.get('toUserId'),
                    type: "img",
                    file: fileUrl,
                });
                toast.success("сообщение успешно отправлено!");
                return true;
            } else {
                toast.error("Возможно, содержимое токсично и не будет отправлено.");
                return false;
            }
        } catch (error) {
            toast.dismiss(toastId);
            toast.error("Error checking toxicity: " + error.message);
            return false;
        }
    }
);

const slice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        fetchUserConversations(state, action) {
            if (Array.isArray(action.payload)) {
                state.chat.user_conversations = action.payload.flatMap(item => {
                    const lastMessage = item.messages[item.messages.length - 1];
                    let decrypted
                    if (lastMessage){
                        const bytes  = CryptoJS.AES.decrypt(lastMessage, secretKey);
                        decrypted = bytes.toString(CryptoJS.enc.Utf8);
                    }

                    return item.participants
                        .filter(participant => participant._id !== user_id)
                        .map(participant => ({
                            _id: participant._id,
                            name: `${participant.first_name} ${participant.last_name}`,
                            img: participant.image,
                            online: participant.status === "Online",
                            unread: 0,
                            pinned: false,
                            msg: lastMessage ? decrypted : null
                        }))
                });
            }else if (typeof action.payload === "object" && action.payload !== null) {
                // Gérer un seul objet représentant une conversation
                const conversation = action.payload;
                const lastMessage = conversation.messages ? conversation.messages[conversation.messages.length - 1] : null;
                let decrypted;
                if (lastMessage){
                    const bytes  = CryptoJS.AES.decrypt(lastMessage, secretKey);
                    decrypted = bytes.toString(CryptoJS.enc.Utf8);
                }

                if (Object.keys(action.payload).length > 0) {
                    const otherParticipant = conversation.participants.find(participant => participant._id !== user_id);

                    if (otherParticipant) {
                        state.chat.current_conversation = {
                            _id: otherParticipant._id,
                            name: `${otherParticipant.first_name} ${otherParticipant.last_name}`,
                            img: otherParticipant.image,
                            online: otherParticipant.status === "Online",
                            msg: lastMessage ? decrypted : null  // Utiliser le texte du dernier message
                        };
                    } else {
                        console.error("No valid participant found in the conversation.");
                    }
                }else {
                    console.error("action.payload is an empty object");
                }
            }
            else {
                console.error("Expected an array for action.payload, received:", action.payload);
            }
        },
        setCurrentConversation(state, action) {
            state.chat.current_conversation = action.payload;
        },
        setCurrentMessages(state, action) {
            const chatList = action.payload.messages ? action.payload.messages : {};
            state.chat.current_messages = processMessages(chatList, user_id);
        },
        setIsChatActive(state) {
            state.isChatActive = !state.isChatActive;
        },
    },
    extraReducers: builder => {
        // builder
        //     .addCase(checkTextToxicity.pending, state => {
        //         state.isLoading = true;
        //     })
        //     .addCase(checkTextToxicity.fulfilled, (state, {payload}) => {
        //         state.isLoading = false;
        //         state.isToxicContent = payload.is_toxic;
        //     })
        //     .addCase(checkTextToxicity.rejected, state => {
        //         state.isLoading = false;
        //         toast.error("Failed to check Text toxicity");
        //     })
    }
})

export const {fetchUserConversations, setIsChatActive, setCurrentConversation, setCurrentMessages} = slice.actions;

function processMessages(messages, currentUserId) {
    if (!Array.isArray(messages)) {
        return []; // Retourner immédiatement un tableau vide si 'messages' n'est pas un tableau
    }

    const processedMessages = [];
    let lastDate = null;

    messages.forEach((message, index) => {
        const messageDate = formatDate(message.created_at);

        // Ajouter un diviseur de date si la date change
        if (lastDate !== messageDate) {
            if (lastDate !== null) {
                processedMessages.push({
                    type: "divider",
                    text: messageDate === new Date().toDateString() ? "Сегодня" : messageDate
                });
            }
            lastDate = messageDate;
        }

        // Déterminer si le message est entrant ou sortant
        const isOutgoing = message.from === currentUserId;
        const bytes  = CryptoJS.AES.decrypt(message.text, secretKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        processedMessages.push({
            type: "msg",
            subtype: message.type,
            img: message.file,
            message: decrypted,
            incoming: !isOutgoing,
            outgoing: isOutgoing,
        });
    });

    return processedMessages;
}


const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
        weekday: 'short', // "lun" etc.
        year: 'numeric', // "2024"
        month: 'short', // "juil"
        day: 'numeric' // "31"
    });
}


export default slice.reducer;
