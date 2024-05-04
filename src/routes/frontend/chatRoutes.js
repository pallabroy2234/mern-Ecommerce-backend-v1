const express = require("express");
const {handleAddFriend, handleSendMessageToSeller} = require("../../controllers/frontend/chatControllers");
const {isLoggedIn, authMiddleware} = require("../../middleware/frontend/authMiddleware");
const chatRoutes = express.Router();

// * ADD FRIEND || POST || /api/frontend/chat/add-friend
chatRoutes.post("/add-friend", isLoggedIn, authMiddleware, handleAddFriend);

// * SEND MESSAGE TO SELLER || POST || /api/frontend/chat/send-message-to-seller
chatRoutes.post("/send-message-to-seller", isLoggedIn, authMiddleware, handleSendMessageToSeller);

module.exports = chatRoutes;
