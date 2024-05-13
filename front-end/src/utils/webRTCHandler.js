import {store} from "../redux/store";
import {SetOverlay} from "../redux/slices/appSlice";
import * as wss from "./wss";
import Peer from "simple-peer"
import {fetchTURNCredentials, getTURNIceServers} from "./turn";

const defaultConstraints = {
    audio: true,
    video: {
        width: 480,
        height: 360,
    },
}

const onlyAudioConstraints = {
    audio: true,
    video: false,
}

let localStream;
export const getLocalPreviewAndInitRoomConnection = async (isRoomHost, identity, roomId = null, onlyAudio) => {

    await fetchTURNCredentials();
    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            console.log("stream successfully")
            store.dispatch(SetOverlay(false));
            localStream = stream;
            showLocalVideoPreview(localStream);
            isRoomHost ? wss.createNewRoom(identity, onlyAudio) : wss.joinRoom(roomId, identity, onlyAudio)
        })
        .catch((error) => {
            console.log("error occured local stream", error);
        })
}


let peers = {};
let streams = [];
/*
* peers = {
*  sockedId: {
* }
* */

const getConfiguration = () => {
    const turnIceServers = getTURNIceServers();
    if (turnIceServers){
        console.log("TURN SERVERS fetched", turnIceServers)
        return {
            iceServers: [
                {urls: "stun:stun.l.google.com:19302"},
                ...turnIceServers
            ]
        }
    }else{
        console.warn("Using only STUN server")
        return { iceServers: [{urls: "stun:stun.l.google.com:19302"}] }
    }
}

const showLocalVideoPreview = (stream) => {
    // TODO: show the video preview UI
    const videosContainer = document.getElementById("videos_portal");
    videosContainer.classList.add("videos_portal_styles");

    const videoContainer = document.createElement("div")
    videoContainer.classList.add("video_track_container");

    const videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.srcObject = stream;

    videoElement.onloadedmetadata = () => {
        videoElement.play();
    }

    videoContainer.appendChild(videoElement);
    if (store.getState().app.connectionOnlyWithAudio) {
        videoContainer.appendChild(getAudioLabel("You"))
    }
    videosContainer.appendChild(videoContainer);
}

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
    const configuration = getConfiguration()

    peers[connUserSocketId] = new Peer({
        initiator: isInitiator,
        config: configuration,
        stream: localStream,
    })

    peers[connUserSocketId].on("signal", (data) => {
        const signalData = {
            signal: data,
            connUserSocketId: connUserSocketId
        };

        wss.signalPeerData(signalData)
    })

    peers[connUserSocketId].on("stream", (stream) => {
        console.log("new stream from other peer")

        addStream(stream, connUserSocketId);
        streams = [...streams, stream];
    });
}

export const handleSignalingData = (data) => {
    // add signaling data to peer connection
    peers[data.connUserSocketId].signal(data.signal);
}
const addStream = (stream, connUserSocketId) => {
    console.log(stream, connUserSocketId, "addStream")
    // TODO: add the incoming stream
    const videosContainer = document.getElementById("videos_portal");
    const videoContainer = document.createElement("div");
    // it will help to delete the user stream
    videoContainer.id = connUserSocketId;
    videoContainer.classList.add("video_track_container");

    const videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.srcObject = stream;
    videoElement.id = `${connUserSocketId}-video`;

    videoElement.onloadedmetadata = () => {
        videoElement.play();
    }

    videoContainer.appendChild(videoElement);
    // check the onlyAudio state
    const participants = store.getState().app.participants;
    const participant = participants.find(p => p.socketId === connUserSocketId)
    // participant && participant.onlyAudio
    if (participant && participant.onlyAudio) {
        videoContainer.appendChild(getAudioLabel(participant.identity))
    }
    videosContainer.appendChild(videoContainer);
}


const getAudioLabel = (labelText) => {
    const labelContainer = document.createElement("div");
    labelContainer.classList.add("label_audio_container");

    const label = document.createElement("p");
    label.classList.add("label_only_audio_text");
    // TODO: get the participant identity
    label.innerHTML = `Only audio <br> ${labelText}`;
    label.style.color = "blue";
    return labelContainer.appendChild(label);
}

export const removePeerConnection = (data) => {
    const {socketId} = data;
    console.log("SockedID", socketId)
    const videoContainer = document.getElementById(socketId);
    const videoEl = document.getElementById(`${socketId}-video`);

    if (videoContainer && videoEl) {
        const tracks = videoEl.srcObject.getTracks();
        tracks.forEach((track) => {
            track.stop();
        });

        // videoEl.srcObject.remove();
        videoEl.srcObject = null;
        videoContainer.removeChild(videoEl);
        videoContainer.parentNode.removeChild(videoContainer);

        if (peers[socketId]) {
            peers[socketId] = null;
        }
        delete peers[socketId];
    }
}

/* Buttons functions */
export const toggleMute = (isMuted) => {
    // localStream, isMuted
    localStream.getAudioTracks()[0].enabled = !!isMuted;
}

export const toggleVideo = (isVideoOn) => {
    localStream.getVideoTracks()[0].enabled = !!isVideoOn;
}

export const toggleScreenShare = (isScreenSharingEnabled, screenSharingStream = null) => {
    if (isScreenSharingEnabled) {
        switchVideoTracks(localStream)
    } else {
        switchVideoTracks(screenSharingStream)
    }
}

const switchVideoTracks = (stream) => {
    for (let socketId in peers) {
        for (let index in peers[socketId].streams[0].getTracks()) {
            for (let index2 in stream.getTracks()) {
                if (peers[socketId].streams[0].getTracks()[index].kind === stream.getTracks()[index2].kind) {
                    peers[socketId]
                        .replaceTrack(peers[socketId].streams[0].getTracks()[index], stream.getTracks()[index2], peers[socketId].streams[0])

                    break;
                }

            }
        }
    }
}


