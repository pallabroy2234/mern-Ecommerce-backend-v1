const express = require("express");
const {handleGetSellers, handleSendMessageSellerAdmin, handleGetCurrentSellerAdminMessages} = require("../../controllers/dashbaord/adminChatControllers");
const {authMiddleware, isAdmin} = require("../../middleware/authMiddleware");
const adminChatRoutes = express.Router();

// * GET SELLERS || GET || /api/dashboard/chat/admin/get-sellers
adminChatRoutes.get("/get-sellers", authMiddleware, isAdmin, handleGetSellers);

// * SEND MESSAGE SELLER - ADMIN || POST || /api/dashboard/chat/admin/message-send-seller-admin
adminChatRoutes.post("/message-send-seller-admin", authMiddleware, handleSendMessageSellerAdmin);

// * GET CURRENT SELLER AND WITH MESSAGES || GET || /api/dashboard/chat/admin/current-seller/:sellerId
adminChatRoutes.get("/current-seller/:sellerId", authMiddleware, handleGetCurrentSellerAdminMessages);

module.exports = adminChatRoutes;
