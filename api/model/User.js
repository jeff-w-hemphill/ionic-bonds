const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
});

// Mongoose will look for users collection in mongo. * It looks for the lowercase plural version
module.exports = mongoose.model('User', userSchema);