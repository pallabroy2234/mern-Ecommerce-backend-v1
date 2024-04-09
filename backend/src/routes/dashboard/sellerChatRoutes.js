const express = require("express");
const {handleChatForGetUsers} = require("../../controllers/dashbaord/sellerChatControllers");
const {isSeller, authMiddleware} = require("../../middleware/authMiddleware");
const sellerChatRoutes = express.Router();

// * GET USERS FOR READY TO CHAT  || GET /api/dashboard/chat/seller/get-users
sellerChatRoutes.get("/get-users", authMiddleware, isSeller, handleChatForGetUsers);

module.exports = sellerChatRoutes;
