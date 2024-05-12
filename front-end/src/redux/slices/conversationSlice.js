import {createSlice} from "@reduxjs/toolkit";

const user_id = window.localStorage.getItem("user_id");

const initialState = {
    direct_chat: {
        conversations: [],
        current_conversation: null,
        current_messages: []
    },
    group_chat: {},
}

const slice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        fetchDirectConversations(state, action) {
            console.log("conversation list from Feach direct conversation", action.payload)
            state.direct_chat.conversations = action.payload.conversations.map((el) => {
                    const this_user = el.participants.find((elm) => elm._id.toString() !== user_id);
                    const lastMessage = el.messages[el.messages.length - 1];

                    return {
                        id: el._id,
                        user_id: this_user._id,
                        name: `${this_user.first_name}  ${this_user.last_name}`,
                        online: this_user.online === 'Online',
                        image: this_user.image,
                        msg: lastMessage.text,
                        time: el.created_at,
                        unread: 0,
                        pinned: this_user.pinned,
                    }
                }
            );
        },
        // Update direct conversations similarly
        updateDirectConversation(state, action) {
            const {id, data} = action.payload;
            const index = state.direct_chat.conversations.findIndex(convo => convo.id === id);
            if (index !== -1) {
                state.direct_chat.conversations[index] = {...state.direct_chat.conversations[index], ...data};
            }
        },

        // updateDirectConversation(state, action) {
        //     const this_conversation = action.payload.conversation;
        //     console.log("update direct conversation", action.payload)
        //     state.direct_chat.conversations = state.direct_chat.conversations.map(
        //         (el) => {
        //             if (el?.id !== this_conversation._id) {
        //                 return el;
        //             } else {
        //                 const user = this_conversation.participants.find(
        //                     (elm) => elm._id.toString() !== user_id
        //                 );
        //                 return {
        //                     id: this_conversation._id,
        //                     user_id: user?._id,
        //                     name: `${user?.firstName} ${user?.lastName}`,
        //                     online: user?.status === "Online",
        //                     img: user.image,
        //                     msg: this_conversation.text,
        //                     time: this_conversation.created_at,
        //                     unread: 0,
        //                     pinned: false,
        //                 };
        //             }
        //         }
        //     );
        // },
        addDirectConversation(state, action) {
            const this_conversation = action.payload.conversation;
            console.log("This_conversation", this_conversation)

            const user = this_conversation.participants.find(
                (elm) => elm._id.toString() !== user_id
            );
            state.direct_chat.conversations = state.direct_chat.conversations.filter(
                (el) => el?.id !== this_conversation._id
            );
            state.direct_chat.conversations.push({
                id: this_conversation._id._id,
                user_id: user?._id,
                name: `${user?.firstName} ${user?.lastName}`,
                online: user?.status === "Online",
                img: user?.image,
                msg: this_conversation.text,
                time: this_conversation.created_at,
                unread: 0,
                pinned: false,
            });
        },
        setCurrentConversation(state, action) {
            state.direct_chat.current_conversation = action.payload;
        },
        fetchCurrentMessages(state, action) {
            const messages = action.payload.messages;
            console.log("current Message: ", messages)
            state.direct_chat.current_messages = messages.map((el) => ({
                id: el._id,
                type: "msg", // 'msg', 'img', 'link', etc.
                subtype: el.type, // 'text', 'image', 'document', etc.
                message: el?.text,
                incoming: el.to === user_id,
                outgoing: !(el.to === user_id),
                timestamp: el.created_at,
            }));
        },
        // Add a new message to the current message list
        addDirectMessage(state, action) {
            state.direct_chat.current_messages.push({
                ...action.payload.message,
                incoming: action.payload.message.to === user_id,
                outgoing: action.payload.message.from === user_id,
            });
        },
    }
})


export default slice.reducer;

export const FetchDirectConversations = ({conversations}) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchDirectConversations({conversations}))
    }
}

export const AddDirectConversation = ({conversation}) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.addDirectConversation({conversation}))
    }
}

export const UpdateDirectConversation = ({conversation}) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateDirectConversation({conversation}))
    }
}

export const SetCurrentConversation = (current_conversation) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.setCurrentConversation(current_conversation));
    };
};


export const FetchCurrentMessages = ({messages}) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchCurrentMessages({messages}));
    }
}

export const AddDirectMessage = (message) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.addDirectMessage({message}));
    }
}
