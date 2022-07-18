const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    content: String,
    timestamp: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Message', messageSchema);