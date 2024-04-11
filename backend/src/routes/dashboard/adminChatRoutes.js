const express = require("express");
const {handleGetSellers, handleSendMessageSellerAdmin} = require("../../controllers/dashbaord/adminChatControllers");
const {authMiddleware, isAdmin} = require("../../middleware/authMiddleware");
const adminChatRoutes = express.Router();

// * GET SELLERS || GET || /api/dashboard/chat/admin/get-sellers
adminChatRoutes.get("/get-sellers", authMiddleware, isAdmin, handleGetSellers);

// * SEND MESSAGE SELLER - ADMIN || POST || /api/dashboard/chat/admin/message-send-seller-admin
adminChatRoutes.post("/message-send-seller-admin", authMiddleware, handleSendMessageSellerAdmin);

module.exports = adminChatRoutes;
