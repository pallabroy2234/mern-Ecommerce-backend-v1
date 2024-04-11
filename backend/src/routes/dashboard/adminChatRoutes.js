const express = require("express");
const {handleGetSellers} = require("../../controllers/dashbaord/adminChatControllers");
const {authMiddleware, isAdmin} = require("../../middleware/authMiddleware");
const adminChatRoutes = express.Router();

// * GET SELLERS || GET || /api/dashboard/chat/admin/get-sellers
adminChatRoutes.get("/get-sellers", authMiddleware, isAdmin, handleGetSellers);

module.exports = adminChatRoutes;
