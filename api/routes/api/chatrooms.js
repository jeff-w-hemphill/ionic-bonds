const express = require('express');
const router = express.Router();
const chatroomController = require('../../controllers/chatroomController');

router.route('/')
    .get(chatroomController.getAllChatrooms)
    .post(chatroomController.createNewChatroom)
    .put(chatroomController.updateChatroom)
    .delete(chatroomController.deleteChatroom);

router.route('/:name')
    .get(chatroomController.getChatroom);


module.exports = router