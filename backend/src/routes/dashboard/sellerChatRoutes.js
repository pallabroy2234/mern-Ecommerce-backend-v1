const express = require("express");
const {handleChatForGetUsers, handleGetUserMessages, handleSendSellerMessage} = require("../../controllers/dashbaord/sellerChatControllers");
const {isSeller, authMiddleware} = require("../../middleware/authMiddleware");
const sellerChatRoutes = express.Router();

// * GET USERS FOR READY TO CHAT  || GET /api/dashboard/chat/seller/get-users
sellerChatRoutes.get("/get-users", authMiddleware, isSeller, handleChatForGetUsers);

// * GET USER MESSAGES FOR SELLER || GET /api/dashboard/chat/seller/get-user-messages/:customerId
sellerChatRoutes.get("/get-user-messages/:customerId", authMiddleware, isSeller, handleGetUserMessages);

// * SEND MESSAGE TO SELLER || POST  || /api/dashboard/chat/seller/send-seller-message
sellerChatRoutes.post("/send-seller-message", authMiddleware, isSeller, handleSendSellerMessage);

module.exports = sellerChatRoutes;
