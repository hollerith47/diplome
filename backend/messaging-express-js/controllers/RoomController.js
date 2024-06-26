const {v4: uuidv4} = require("uuid");

let connectedUsers = [];
let rooms =[];

const existingRoom = (req, res) => {
    const {roomId} = req.params;
    // console.log({roomId})
    // console.log({rooms})
    const room = rooms.find(room => room?.id === roomId);
    // const room = '123456' ===roomId ;
    if (room){
        if (connectedUsers.length > 3){
            return res.status(404).json({
                roomExists: true,
                full: true,
                message: 'Room is full',
            })
        } else {
            return res.status(200).json({
                roomExists: true,
                full: false,
            })
        }
    }else{
        return res.status(404).json({
            message: 'Meeting not found. Check your meeting ID please',
        });
    }
}
const joinRoomHandler = (data, socket, io) => {
    const {identity, roomId, onlyAudio} = data;
    const newUser = {
        identity,
        id: uuidv4(),
        socketId: socket.id,
        roomId,
        onlyAudio,
    }

    const room = rooms.find((room) => room.id === roomId);

    if (!room) {
        socket.emit("error", { message: "La salle n'existe pas." });
        return;
    }
    // update the room
    room.connectedUsers.push(newUser);

    // join socket room
    socket.join(roomId);

    // add new user to connected users array
    connectedUsers.push(newUser)

    // emit an event to all users which are already in the room
    room.connectedUsers.forEach((user) => {
        if (user.socketId !== socket.id) {
            const data = {connUserSocketId: socket.id};
            io.to(user.socketId).emit("conn-prepare", data);
        }
    })


    io.to(roomId).emit("room-update", {connectedUsers: room.connectedUsers})
}

const createNewRoomHandler = (data, socket) =>{
    // console.log({data})

    const {identity, onlyAudio } = data;
    const roomId = uuidv4();

    const newUser = {
        identity,
        id: uuidv4(),
        socketId: socket.id,
        roomId,
        onlyAudio,
    }

    // add user to connected users
    connectedUsers = [...connectedUsers, newUser];

    // create new room
    const newRoom = {
        id: roomId,
        connectedUsers: [newUser]
    }

    // join socket room
    socket.join(roomId);

    rooms = [...rooms, newRoom];

    // emit events back to client who created this room => roomId
    socket.emit('room-id', {roomId});

    // emit the connected users list event
    socket.emit("room-update", {connectedUsers: newRoom.connectedUsers})
}

const disconnectHandler = (socket, io) => {
    // find if user was registered to  any room
    const user = connectedUsers.find(user => user.socketId === socket.id);

    if (user){
        // remove user from connected users array (room)
        const room = rooms.find((room) => room.id === user.roomId);
        room.connectedUsers = room.connectedUsers.filter(user => user.socketId !== socket.id);
        // connectedUsers = room;

        // leave socket
        socket.leave(user.roomId);

        // if all users leave the room must close the room
        if (room.connectedUsers.length > 0){
            io.to(room.id).emit("user-disconnected", {
                socketId: socket.id
            })
            //emit and event to rest of users in the room with new list of connected users
            io.to(room.id).emit("room-update", {connectedUsers: room.connectedUsers});
        }else{
            rooms = rooms.filter(r => r.id !== room.id);
        }

    }
}

const signalingHandler = (socket, io, data) => {
    const { connUserSocketId, signal} = data;

    const signalingData = {signal, connUserSocketId: socket.id}

    io.to(connUserSocketId).emit("conn-signal", signalingData)
}

const initializeConnectionHandler =  (socket, io, data) => {
    const { connUserSocketId} = data;

    const initData = {connUserSocketId : socket.id}

    io.to(connUserSocketId).emit("conn-init", initData)
}

module.exports = {
    joinRoomHandler,
    createNewRoomHandler,
    disconnectHandler,
    existingRoom,
    signalingHandler,
    initializeConnectionHandler
}