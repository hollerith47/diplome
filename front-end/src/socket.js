import io from "socket.io-client";

let socket = null;

const connectSocket = (token) => {
    if (!socket) {
        // Only create the socket if it doesn't exist
        socket = io("http://localhost:5000", {
            query: { token }
        });
    } else {
        // If socket exists but with an old token, disconnect and reconnect
        if (socket.io.opts.query.token !== token) {
            socket.disconnect();
            socket.io.opts.query.token = token;
            socket.connect();
        }
    }
};

const getSocket = () => {
    return socket;
}

export { getSocket, connectSocket };
