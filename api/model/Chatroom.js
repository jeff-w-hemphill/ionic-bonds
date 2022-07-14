const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatroomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    messages: [{
        username: String,
        content: String,
        timestamp: Date
    }]
});

module.exports = mongoose.model('Chatroom', chatroomSchema);