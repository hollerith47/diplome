const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        id: {type: String},
        first_name: {type: String},
        last_name: {type: String},
        email: {type: String, unique: true, required:true},
        role: {type: String},
        phone: {type: String},
        about: {type: String},
        image: {type: String},
        birth_date: {type: Date},
        socket_id: {type: String},
        status: {
            type: String,
            enum: ['Online', 'Offline']
        }
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User;