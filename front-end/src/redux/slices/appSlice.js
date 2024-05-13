import {createSlice} from "@reduxjs/toolkit";

// import {dispatch} from "../store";

const initialState = {
    sideBar: {
        open: false,
        type: "CONTACT", // can be CONTACT, STARRED MESSAGE, SHARED DATA
        linkSelected: 0,
    },
    snackbar:{
        open: false,
        severity: null,
        message: null,
    },
    identity: "",
    roomId: "",
    chat_type: null,
    isRoomHost: false,
    connectionOnlyWithAudio: false,
    showOverlay: true,
    participants: [],
    socketId: null,
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

export function SetSocketId(value) {
    return async (dispatch) => {
        dispatch(updateSocketId(value));
    }
}

export function SetConnectionOnlyWithAudio(value) {
    return async (dispatch) => {
        dispatch(updateConnectOnlyWithAudio(value));
    }
}

export function SetOverlay(value) {
    return async (dispatch) => {
        dispatch(updateShowOverlay(value));
    }
}

export function SetParticipants(value) {
    return async (dispatch) => {
        dispatch(updateParticipants(value));
    }
}

export const SelectConversation = ({room_id}) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.selectConversation({room_id}));
    };
};

export const showSnackBar = ({ severity, message }) => async (dispatch, getState) => {
    dispatch(slice.actions.openSnackBar({message, severity}));
    setTimeout(() => {
        dispatch(slice.actions.closeSnackBar());
    }, 4000);
}

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        // Toggle Sidebar
        ToggleSidebar(state, action) {
            state.sideBar.open = !state.sideBar.open;
        },
        UpdateSidebarType(state, action) {
            state.sideBar.type = action.payload.type;
        },
        UpdateSidebarLink(state, action) {
            state.sideBar.linkSelected = action.payload.linkSelected;
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
        updateSocketId(state, action) {
            state.socketId = action.payload
        },
        updateConnectOnlyWithAudio(state, action) {
            state.connectionOnlyWithAudio = action.payload
        },
        updateShowOverlay(state, action) {
            state.showOverlay = action.payload
        },
        updateParticipants(state, action) {
            state.participants = action.payload
        },
        selectConversation(state, action) {
            state.chat_type = "individual";
            state.room_id = action.payload.room_id;
        },
        openSnackBar(state, action) {
            state.snackbar.open = true;
            state.snackbar.severity = action.payload.severity;
            state.snackbar.message = action.payload.message;
        },
        closeSnackBar(state, action) {
            state.snackbar.open = false;
            state.snackbar.severity = null;
            state.snackbar.message = null;
        }
    }
});

export const {
    ToggleSidebar,
    updateParticipants,
    updateShowOverlay,
    updateConnectOnlyWithAudio,
    updateRoomId,
    updateIdentity,
    updateIsRoomHost,
    UpdateSidebarLink,
    UpdateSidebarType,
    updateSocketId,
    closeSnackBar,
    openSnackBar,
    selectConversation
} = slice.actions;

export default slice.reducer;





