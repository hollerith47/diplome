import {store} from "../redux/store";
import {SetOverlay} from "../redux/slices/appSlice";
import * as wss from "./wss";

const constraints = {
    audio: true,
    video: true
}

let localStream ;
export const getLocalPreviewAndInitRoomConnection = (isRoomHost, identity, roomId=null) => {
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) =>{
            console.log("stream successfully")
            store.dispatch(SetOverlay(false));
            localStream = stream;
            showLocalVideoPreview(localStream);
            isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(roomId, identity)
        })
        .catch((error) =>{
            console.log("error occured local stream", error);
        })
}
const showLocalVideoPreview = (stream) => {
    // TODO: show the video preview
}

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {

}
