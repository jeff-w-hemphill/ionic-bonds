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
    res.json(chatrooms);
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
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.'});
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ 'message': `No Employee matched ID ${req.body.id}`});
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.json(result);
}

const deleteChatroom = async (req,res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Employee ID required.'});

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ 'message': `No Employee matched ID ${req.body.id}`});
    }
    const result = await employee.deleteOne({ _id: req.body.id });
    res.json(result);
}



module.exports = {
    getAllChatrooms,
    createNewChatroom,
    updateChatroom,
    deleteChatroom,
    getChatroom
}