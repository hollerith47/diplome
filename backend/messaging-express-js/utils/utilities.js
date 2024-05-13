const User = require('../models/user.model');
const OneToOneMessage = require("../models/OneToOneMessage");

const findUser = async (email) => {
    return User.findOne({email});
}

const getUserIdFromEmail = async (email) => {
    const user = await User.findOne({email});
    return user["_id"];
}

async function getConversationId(to, from) {
    try{
        const conversation = await OneToOneMessage.findOne({
            participants: {$size: 2, $all: [to, from]},
        });
        if (conversation) {
            return conversation._id;
        }else {
            return null;
        }
    }
    catch (error){
        console.log("error when getting conversationId")
        return null;
    }
}

module.exports = {
    findUser,
    getUserIdFromEmail,
    getConversationId
};