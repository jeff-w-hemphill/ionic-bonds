const Chatroom = require('../model/Chatroom');

const createNewChatroom = async (req, res) => {
    if (!req?.body) {
        console.log(req.body)
        return res.status(400).json({ 'message': 'Name is required' });
    }

    const duplicate = await Chatroom.findOne({ name: req.body.name }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict

    try {
        const result = await Chatroom.create(req.body);

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
} 

const getAllChatrooms = async (req, res) => {
    const chatrooms = await Chatroom.find();
    if (!chatrooms) return res.status(204).json({ 'message': 'No chatrooms found.' });
    
    // just return name and date of last message
    const result = chatrooms.map(chatroom => ({ name: chatroom.name, lastMessageTime: chatroom.messages[chatroom.messages.length - 1].timestamp }))
    res.json(result);
}

const getChatroom = async (req, res) => {
    if (!req?.params?.name) return res.status(400).json({ 'message': 'chatroom name required.'});
    const chatroom = await Chatroom.findOne({ name: req.params.name }).exec();
    if (!chatroom) {
        return res.status(204).json({ 'message': `Chatroom ${req.params.id} not found `});
    }
    res.json(chatroom);
}



const updateChatroom = async (req, res) => {
    return;
}

const deleteChatroom = async (req,res) => {
    return;
}



module.exports = {
    getAllChatrooms,
    createNewChatroom,
    updateChatroom,
    deleteChatroom,
    getChatroom
}