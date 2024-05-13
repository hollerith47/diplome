const mongoose = require('mongoose');

const oneToOneMessageSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    messages: [
        {
            to: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
            from: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
            type: {
                type: String,
                enum: ["Text","Link", "Media", "Document"]
            },
            created_at: {
                type: Date,
                default: Date.now()
            },
            text: {
                type: String
            },
            file: {
                type: String
            },
        }
    ]
});

// method to add one message to the schema
// oneToOneMessageSchema.methods.addMessage = async function(message) {
//     this.messages.push(message);
//     return this.save();
// }

const OneToOneMessage = new mongoose.model("OneToOneMessage", oneToOneMessageSchema);

module.exports = OneToOneMessage;

