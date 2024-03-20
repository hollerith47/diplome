import {createSlice} from "@reduxjs/toolkit";

// import {dispatch} from "../store";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT", // can be CONTACT, STARRED MESSAGE, SHARED DATA
        linkSelected: 0,
    },
    identity: "",
    roomId: "",
    isRoomHost: false,
    connectionOnlyWithAudio: false,
}

//actions
export function UpdateIsRoomHost(value) {
    return async (dispatch) => {
        dispatch(updateIsRoomHost(value));
    }
}

export function SetIdentity(value) {
    return async (dispatch) => {
        dispatch(updateIdentity(value));
    }
}

export function SetRoomId(value) {
    return async (dispatch) => {
        dispatch(updateRoomId(value));
    }
}

export function SetConnectionOnlyWithAudio(value) {
    return async (dispatch) => {
        dispatch(updateConnectOnlyWithAudio(value));
    }
}

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        // Toggle Sidebar
        ToggleSidebar(state, action) {
            state.sidebar.open = !state.sidebar.open;
        },
        UpdateSidebarType(state, action) {
            state.sidebar.type = action.payload.type;
        },
        UpdateSidebarLink(state, action) {
            state.sidebar.linkSelected = action.payload.linkSelected;
        },
        updateIsRoomHost(state, action) {
            state.isRoomHost = action.payload
        },
        updateIdentity(state, action) {
            state.identity = action.payload
        },
        updateRoomId(state, action) {
            state.roomId = action.payload
        },
        updateConnectOnlyWithAudio(state, action) {
            state.connectionOnlyWithAudio = action.payload
        },
    }
});

export const {ToggleSidebar, updateConnectOnlyWithAudio,updateRoomId, updateIdentity, updateIsRoomHost, UpdateSidebarLink, UpdateSidebarType} = slice.actions;

export default slice.reducer;



