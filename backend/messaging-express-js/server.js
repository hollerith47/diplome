const express = require('express');
const http = require('http');
const {v4: uuidv4} = require('uuid');
const cors = require('cors');
const twilio = require('twilio');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app)
app.use(cors());

let connectedUsers = [];
let rooms = ["123456",147852];

app.get("/api/room-exists/:roomId", (req, res) => {
    const {roomId} = req.params;
    const room = rooms.find(room => room.id === roomId);
    if (room){
        if (connectedUsers.length > 3){
            return res.status(404).json({
                roomExists: true,
                full: true,
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
})

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

server.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
})