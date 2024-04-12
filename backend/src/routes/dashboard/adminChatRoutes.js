const express = require("express");
const {handleGetSellers, handleSendMessageSellerAdmin, handleGetCurrentSellerAdminMessages, handleGetSellerMessages, handleSendMessageAdmin} = require("../../controllers/dashbaord/adminChatControllers");
const {authMiddleware, isAdmin, isSeller} = require("../../middleware/authMiddleware");
const adminChatRoutes = express.Router();

// * GET SELLERS || GET || /api/dashboard/chat/admin/get-sellers
adminChatRoutes.get("/get-sellers", authMiddleware, isAdmin, handleGetSellers);

// * SEND MESSAGE SELLER - ADMIN || POST || /api/dashboard/chat/admin/message-send-seller-admin
adminChatRoutes.post("/message-send-seller-admin", authMiddleware, handleSendMessageSellerAdmin);

// * GET CURRENT SELLER AND WITH MESSAGES || GET || /api/dashboard/chat/admin/get-admin-messages/:sellerId
adminChatRoutes.get("/get-admin-messages/:sellerId", authMiddleware, isAdmin, handleGetCurrentSellerAdminMessages);

// * GET SELLER MESSAGES || GET || /api/dashboard/chat/admin/get-seller-messages
adminChatRoutes.get("/get-seller-messages", authMiddleware, isSeller, handleGetSellerMessages);

// * SEND MESSAGE TO ADMIN || POST || /api/dashboard/chat/seller/message-send-admin
adminChatRoutes.post("/message-send-admin", authMiddleware, isSeller, handleSendMessageAdmin);

module.exports = adminChatRoutes;
