import io from 'socket.io-client';
import {store} from "../redux/store";
import {SetParticipants, SetRoomId, SetSocketId} from "../redux/slices/appSlice";
import * as webRTCHandler from "./webRTCHandler";
import {AddDirectConversation, UpdateDirectConversation} from "../redux/slices/conversationSlice";

const SERVER = 'http://localhost:5000';

let socket = null;

export const connectWithSocketServer = (token) => {
    socket = io(SERVER, {
        query: { token }
    } );

    socket.on('connect', ()=> {
        console.log("connection established successfully with Socket server, socket ID: " + socket.id);
        store.dispatch(SetSocketId(socket.id));
    })

    socket.on("authenticated", (data)=> {
        const { user_id } = data;
        console.log("authenticated", data)
        window.localStorage.setItem("user_id", user_id);
    })

    socket.on("room-id", (data)=> {
        const {roomId} = data;
        // console.log({roomId})

        store.dispatch(SetRoomId(roomId));
    })

    socket.on("room-update", (data) =>{
        const { connectedUsers} = data;
        // console.log({connectedUsers})
        store.dispatch(SetParticipants(connectedUsers))
    });

    socket.on("conn-prepare", (data) =>{
        const {connUserSocketId} = data;
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

        // inform the other user which just joined the room
        socket.emit("conn-init", {connUserSocketId: connUserSocketId})
    })
    socket.on("disconnect", (data) =>{
        const {connectedUsers} = data;
        store.dispatch(SetParticipants(connectedUsers))
    });

    const conversations  =  store.getState().conversation.direct_chat;
    socket.on("start_chat", (data) => {
        console.log(data);
        const existing_conversation = conversations.find((el) => el.id === data._id);
        if (existing_conversation){
            // update the conversation
            store.dispatch(UpdateDirectConversation({conversation: data}));

        }else {
            // add conversation to the state
            store.dispatch(AddDirectConversation({conversation:data}))
        }
        // selectConversation
        // dispatch(S)
    });

    socket.on("conn-signal", (data)=>{
        webRTCHandler.handleSignalingData(data)
    });

    socket.on("conn-init", (data)=>{
        const {connUserSocketId} = data;
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, true)
    })

    socket.on("user-disconnected", (data)=>{
        webRTCHandler.removePeerConnection(data)
    })



}

export const createNewRoom = (identity, onlyAudio) => {
    // emit a event to socket server
    const data = {
        identity,
        onlyAudio,
    }

    socket.emit('create-new-room', data);
}

export const joinRoom = (roomId, identity,onlyAudio) => {
    // emit a event to socket server
    const data = {
        roomId,
        identity,
        onlyAudio,
    }

    socket.emit('join-room', data);
}

// export const getDirectConversation = ({user_id}, callback) => {
//     socket.emit('get_direct_conversation', {user_id}, callback)
// }
//
// export const startConversation = ({to, from}) => {
//     socket.emit('start_conversation', {to, from});
//     console.log({to, from});
// }

export const signalPeerData = (data) => {
    socket.emit('conn-signal', data)
}
