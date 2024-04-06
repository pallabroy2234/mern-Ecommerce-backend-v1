const express = require("express");
const {handleAddFriend} = require("../../controllers/frontend/chatControllers");
const {isLoggedIn, authMiddleware} = require("../../middleware/frontend/authMiddleware");
const chatRoutes = express.Router();

// * ADD FRIEND || POST || /api/frontend/chat/add-friend
chatRoutes.post("/add-friend", isLoggedIn, authMiddleware, handleAddFriend);

module.exports = chatRoutes;
