import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import axios from "axios";
import {BASE_FLASK_API} from "../../config";
import {getSocket} from "../../socket";

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
        return response.data[0].is_toxic;
    } catch (error) {
        console.log("checkTextToxicity Error:", error);
        // return thunkAPI.rejectWithValue(error.message);
        return false
    }
}
export const checkAndSendText = createAsyncThunk(
    'messages/checkAndSendText',
    async ({ text, userId, conversationId, type }, { dispatch, getState }) => {
        const toastId = toast.loading("Проверка сообщения перед отправкой...", {
            style: { backgroundColor: '#2C6E49', color: '#fff' }});
        try {
            const isToxic = await checkTextToxicity(text);
            toast.dismiss(toastId);  // Enlever le toast de chargement

            if (!isToxic) {
                const socket = getSocket();
                socket.emit("text_message", {
                    message: text,
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
                    return item.participants
                        .filter(participant => participant._id !== user_id)
                        .map(participant => ({
                            _id: participant._id,
                            name: `${participant.first_name} ${participant.last_name}`,
                            img: participant.image,
                            online: participant.status === "Online",
                            unread: 0,
                            pinned: false,
                            msg: lastMessage ? lastMessage.text : null
                        }))
                });
            }else {
                console.error("Expected an array for action.payload, received:", action.payload);
            }
        },
        setCurrentConversation(state, action) {
            state.chat.current_conversation = action.payload;
        },
        setCurrentMessages(state, action) {
            const chatList = action.payload.messages ? action.payload.messages : {};
            state.chat.current_messages = processMessages(chatList, user_id)
        },
        setIsChatActive(state) {
            state.isChatActive = !state.isChatActive;
        },
        setIsToxicFalse(state) {
            state.isToxicContent = false;
        }
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

export const {fetchUserConversations, setIsToxicFalse, setIsChatActive, setCurrentConversation, setCurrentMessages} = slice.actions;

function processMessages(messages, currentUserId) {
    const processedMessages = [];
    let lastDate = null;

    messages.forEach((message, index) => {
        const messageDate = formatDate(message.created_at);

        // Ajouter un diviseur de date si la date change
        if (lastDate !== messageDate) {
            if (lastDate !== null) { // Éviter d'ajouter un diviseur avant le premier message
                processedMessages.push({
                    type: "divider",
                    text: messageDate === new Date().toDateString() ? "Сегодня" : messageDate
                });
            }
            lastDate = messageDate;
        }

        // Déterminer si le message est entrant ou sortant
        const isOutgoing = message.from === currentUserId;
        processedMessages.push({
            type: "msg",
            message: message.text,
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
