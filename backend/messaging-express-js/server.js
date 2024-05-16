require("dotenv").config()
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const {v4: uuidv4} = require('uuid');
const cors = require('cors');
const path = require("path");
const connectDB = require("./config/database");
const { joinRoomHandler, createNewRoomHandler, disconnectHandler, existingRoom, signalingHandler,
    initializeConnectionHandler
} = require('./controllers/RoomController')
const {isAuth, loginAPI, getId} = require("./controllers/AuthController");
const OneToOneMessage = require("./models/OneToOneMessage");
const User = require('./models/user.model');
const {getTurnServers} = require("./controllers/TurnServerController");
const {textMessageHandler} = require("./controllers/OneToOne.Controller");

const PORT = process.env.PORT || 5000;



const app = express();
const server = http.createServer(app)
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get("/api/get-turn-credentials", getTurnServers);
app.get("/api/room-exists/:roomId", existingRoom);

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})
// app.post("/api/login", login);
app.post("/api/get-user-id", getId);
io.on('connection', async (socket) => {
    const token = socket.handshake.query.token
    // console.log(`user connected socket ID: ${socket.id}`);
    // console.log(`user connected token: ${token}`);

    // console.log({tokenAPI});
    const isAuthenticated = await isAuth(token);
    if (!isAuthenticated){
        socket.emit("unauthorized", "Authentication failed")
        return socket.disconnect();
    }else {
        try {
            await User.findOneAndUpdate({ email: isAuthenticated.email },
                { status: "Online", socket_id: socket.id });
        }catch (error){
            console.error("Error: User not authenticated or another error occurred.", error);
            return false;
        }
    }

    //First off all get users conversations List
    socket.on("get_direct_conversation", async ({user_id}) => {
        try{
            const existing_conversation = await OneToOneMessage.find({
                participants: {$all: [user_id]},
            }).populate("participants", "first_name last_name _id email status image");
            socket.emit("get_user_conversations", existing_conversation)
            // socket.emit("get_user_conversations", existing_conversation);
        } catch (error){
            console.log(error);
            socket.emit("error", "Failed to fetch conversations");
        }
    });

    // quand on click sur l'utilisateur pour commencer une conversation,
    // permet de retourner les messages precedent si ca existe
    socket.on("start_conversation", async (data) => {
        // data : { to, from }
        const { from, to } = data;
        try {
            // console.log("start_conversation", {to, from})
            const existing_conversation = await OneToOneMessage.find({
                participants: {$size: 2, $all: [to, from]},
            }).populate("participants", "first_name last_name _id email status image");
            // console.log(existing_conversation, "Existing conversation");

            // if no => create a new OneToOneMessage
            if (!existing_conversation[0]){
                let new_chat = await OneToOneMessage.create({
                    participants: [to, from],
                });

                new_chat = await OneToOneMessage.populate(new_chat, {
                    path: "participants",
                    select: "first_name last_name _id email status image"
                });
                socket.emit("start_chat", new_chat);
            } else {
                socket.emit("start_chat", existing_conversation[0]);
            }
        } catch (error) {
            console.log(error);
            socket.emit("error", "Failed to start conversation");
        }
    });

    // handle incoming text/link messages
    socket.on("text_message", async (data)=>{
        // console.log("received text message", data)
        await textMessageHandler(data, socket, io)
    })

    // handle file messages
    socket.on("file_message", (data)=>{
        console.log("received file message", data)
        fileMessageHandler(data, socket)
    })

    // *********************************************************************************** //
    // handle Room
    // *********************************************************************************** //
    socket.on("create-new-room", (data)=>{
        createNewRoomHandler(data, socket)
    })
    socket.on("join-room", (data)=>{
        joinRoomHandler(data, socket, io)
    });
    socket.on("conn-signal", (data)=>{
        signalingHandler(socket, io, data)
    })

    socket.on("conn-init", (data)=>{
        initializeConnectionHandler(socket, io, data)
    });

    socket.on("disconnect", async ()=>{
        disconnectHandler(socket, io);
        await User.findOneAndUpdate({socket_id : socket.id}, {status: "Offline", socket_id: ""});
        console.log(`user disconnected socket ID: ${socket.id}`);
    });

    socket.on("end", async ({user_id})=>{
        await User.findOneAndUpdate({_id : user_id}, {status: "Offline", socket_id: ""});
        console.log(`user disconnected with the end event socket ID: ${socket.id}`);
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
server.listen(PORT, async ()=>{
    await connectDB();
    await loginAPI();
    setInterval(async () => {
        await loginAPI().catch(console.error);
    }, 5 * 60 * 1000);
    console.log(`Server listening on ${PORT}`);
})