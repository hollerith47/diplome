const User = require('../models/user.model');

const findUser = async (email) => {
    return User.findOne({email});
}

const getUserIdFromEmail = async (email) => {
    const user = await User.findOne({email});
    return user["_id"];
}

module.exports = {
    findUser,
    getUserIdFromEmail
};