const {getConversationId} = require("../utils/utilities");
const OneToOneMessage = require("../models/OneToOneMessage");
const User = require("../models/user.model");

const textMessageHandler = async (data, socket, io) => {
    // data : {to, from, message, conversation_id, type}
    // console.log("received text message", data)
    let { from, message, type, to, file} = data;

    let new_message;

    if (file){
        new_message = {
            to,
            from,
            type,
            text: message,
            created_at: Date.now(),
            file: file
        }
    }else{
        new_message = {
            to,
            from,
            type,
            text: message,
            created_at: Date.now(),
        }
    }

    // create a new conversation if not already existing
    try {
        const checkConversationId = await getConversationId(to, from);
        // const isTrue = checkConversationId.toString() === conversation_id;
        // const isTrue = new ObjectId(conversation_id).equals(checkConversationId)
        if (checkConversationId){
            let updatedChat = await OneToOneMessage.findByIdAndUpdate(
                checkConversationId,
                {$push : { messages: new_message}}, {new: true}
            );
            updatedChat = await OneToOneMessage.populate(updatedChat, {
                path: "participants",
                select: "first_name last_name _id email status image"
            });

            const toUser = await User.findById(to).select("socket_id")
            const fromUser = await User.findById(from).select("socket_id")


            // emit incoming_message -> to user ("new message received")
            io.to(toUser?.socket_id).emit("message_received", updatedChat);
            socket.emit("start_chat", updatedChat);
            // emit outgoing_message -> from user ("message sent successfully")
            io.to(fromUser?.socket_id).emit("message_sent", updatedChat);
        }

    } catch (error){
        console.log(error);
        socket.emit("error", "Failed to send message");
    }
};


module.exports = {
    textMessageHandler
}