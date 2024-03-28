require("dotenv").config()
const express = require('express');
const http = require('http');
const {v4: uuidv4} = require('uuid');
const cors = require('cors');
const twilio = require('twilio');
const path = require("path");
const {findUser, getUserIdFromEmail} = require("./utils/utilities")
const connectDB = require("./config/database");
const { joinRoomHandler, createNewRoomHandler, disconnectHandler, existingRoom} = require('./controllers/RoomController')
const {isAuth, loginAPI} = require("./controllers/AuthController");
const OneToOneMessage = require("./models/OneToOneMessage");
const User = require('./models/user.model');

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
const server = http.createServer(app)
app.use(cors());



app.get("/api/room-exists/:roomId", existingRoom)

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})
io.on('connection', async (socket) => {
    const token = socket.handshake.query.token
    console.log(`user connected socket ID: ${socket.id}`);
    console.log(`user connected token: ${token}`);

    // console.log({tokenAPI});

    const isAuthenticated = await isAuth(token);
    if (!isAuthenticated){
        socket.emit("unauthorized", "Authentication failed")
        return socket.disconnect();
    }
    const {email} = await isAuthenticated;
    const user = await findUser(email)
    if (user){
        const user_id = user['_id']
        socket.emit("authenticated", {user_id})
    }

    socket.on("get_direct_conversation", async ({user_id}, callback) => {
        const existing_conversation = await OneToOneMessage.find({
            participants: {$all: [user_id]},
        }).populate("participants", "first_name last_name _id email status");

        console.log("get_direct_conversation", user_id)
        console.log(existing_conversation);

        callback(existing_conversation);
    });

    socket.on("start_conversation", async (data) => {
        // data : { to, from }
        const { from} = data;
        let {to } = data
        to = await getUserIdFromEmail(to);

        console.log("start_conversation", { to, from})

        const existing_conversation = await OneToOneMessage.find({
            participants: {$size: 2, $all: [to, from]},
        }).populate("participants", "first_name last_name _id email status");

        console.log(existing_conversation[0], "Existing conversation");

        // if no existing conversation
        if (existing_conversation.length === 0) {
            let new_chat = await OneToOneMessage.create({
                participants: [to, from],
            });

            new_chat = await OneToOneMessage.findById(new_chat._id).populate("participants", "first_name last_name _id email status");
            console.log(new_chat);
            socket.emit("start_chat", new_chat);
        }
        // if there is already a conversation
        else {
            socket.emit("start_chat", existing_conversation[0])
        }
    });

    socket.on("get_messages", async (data, callback) => {
        const {messages} = await OneToOneMessage.findById(data.conversation_id).select("messages")
        callback(messages)
    })

    // handle text/link messages
    socket.on("text_message", (data)=>{
        console.log("received text message", data)

        textMessageHandler(data, socket)
    })

    // handle file messages
    socket.on("file_message", (data)=>{
        console.log("received file message", data)

        fileMessageHandler(data, socket)
    })

    // handle Room
    socket.on("create-new-room", (data)=>{
        createNewRoomHandler(data, socket)
    })
    socket.on("join-room", (data)=>{
        joinRoomHandler(data, socket, io)
    });
    socket.on("disconnect", ()=>{
        disconnectHandler(socket, io)
    })
})

const fileMessageHandler = (data, socket) => {
    // data : {to, from, text, file}
    // get the file extension
    const fileExtension = path.extname(data.file.name);

    // generate a unique filename
    const fileName = `${Date.now()}_${Math.random() * 1000}.${fileExtension}`

    // upload file to AWS s3

    // create a new conversation if not already existing

    // save to database

    // emit incoming_message -> to user

    // emit outgoing_message -> from user
}

const textMessageHandler = async (data, socket) => {
    // data : {to, from, message, conversation_id, type}
    const { from, message, conversation_id, type} = data;
    let {to} = data
    to = await getUserIdFromEmail(to);

    const new_message = {
        to,
        from,
        type,
        text: message,
        created_at: Date.now(),
    }
    // create a new conversation if not already existing
    const chat = await OneToOneMessage.findById(conversation_id);
    chat.messages.push(new_message);

    // save to database
    await chat.save({});

    // emit new_message -> to user
    const to_user = await User.findById(to);
    const from_user = await User.findById(from);
    io.to(to_user.socket_id).emit("new_message", {
        conversation_id,
        message: new_message,
    })

    // emit new_message-> from user
    io.to(from_user.socket_id).emit("new_message", {
        conversation_id,
        message: new_message,
    })
}




server.listen(PORT, async ()=>{
    setInterval(() => {
        loginAPI().catch(console.error);
    }, 5 * 60 * 1000);
    console.log(`Server listening on ${PORT}`);
})