import io from "socket.io-client"; // Add this

let socket;

const connectSocket = (token) => {
    socket = io("http://localhost:5000", {
        query: { token }
    });
}

export {socket, connectSocket};
