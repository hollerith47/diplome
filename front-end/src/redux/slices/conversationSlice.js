import {createSlice} from "@reduxjs/toolkit";
import {faker} from "@faker-js/faker";

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
            state.direct_chat.conversations = action.payload.conversations.map((el) => {
                    const this_user = el.participants.find(
                        (elm) => elm._id.toSorted() !== user_id);
                    return {
                        id: el._id,
                        user_id: this_user._id,
                        name: `${this_user.first_name}  ${this_user.last_name}`,
                        online: this_user.status === 'online',
                        image: faker.image.avatar(),
                        msg: faker.music.songName(),
                        time: "9:36",
                        unread: 0,
                        pinned: true,
                    }
                }
            );
        },

        updateDirectConversation(state, action) {
            const this_conversation = action.payload.conversation;
            state.direct_chat.conversations = state.direct_chat.conversations.map(
                (el) => {
                    if (el?.id !== this_conversation._id) {
                        return el;
                    } else {
                        const user = this_conversation.participants.find(
                            (elm) => elm._id.toString() !== user_id
                        );
                        return {
                            id: this_conversation._id._id,
                            user_id: user?._id,
                            name: `${user?.firstName} ${user?.lastName}`,
                            online: user?.status === "Online",
                            img: faker.image.avatar(),
                            msg: faker.music.songName(),
                            time: "9:36",
                            unread: 0,
                            pinned: false,
                        };
                    }
                }
            );
        },
        addDirectConversation(state, action) {
            const this_conversation = action.payload.conversation;
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
                img: faker.image.avatar(),
                msg: faker.music.songName(),
                time: "9:36",
                unread: 0,
                pinned: false,
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

export const AddDirectConversation = ({conversation }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.addDirectConversation({conversation}))
    }
}

export const UpdateDirectConversation = ({conversation}) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateDirectConversation({conversation}))
    }
}
