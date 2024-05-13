import {createSlice} from "@reduxjs/toolkit";

const user_id = window.localStorage.getItem('user_id');

const initialState = {
    chat: {
        user_conversations: [],
        current_conversation: null,
        current_messages: []
    },
    isChatActive: false,
    isSent: false,

}

export const UpdateIsSent = () => async (dispatch, getState) => {
    dispatch(slice.actions.updateIsSent());

    setTimeout(() => dispatch(slice.actions.closeIsSent()), 4000)
}

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
        updateIsSent(state) {
            state.isSent = true;
        },
        closeIsSent(state) {
            state.isSent = false;
        }
    }
})

export const {fetchUserConversations, closeIsSent, updateIsSent, setIsChatActive, setCurrentConversation, setCurrentMessages} = slice.actions;

function processMessages(messages, currentUserId) {
    const processedMessages = [];
    let lastDate = null;

    messages.forEach((message, index) => {
        // Déterminer si le message est entrant ou sortant
        const isOutgoing = message.from === currentUserId;
        processedMessages.push({
            type: "msg",
            message: message.text,
            incoming: !isOutgoing,
            outgoing: isOutgoing,
        });

        // Ajouter un diviseur de date si la date change
        const messageDate = new Date(message.created_at).toDateString();
        if (lastDate !== messageDate) {
            if (lastDate !== null) { // Éviter d'ajouter un diviseur avant le premier message
                processedMessages.push({
                    type: "divider",
                    text: messageDate === new Date().toDateString() ? "Today" : messageDate
                });
            }
            lastDate = messageDate;
        }
    });

    return processedMessages;
}

export default slice.reducer;
