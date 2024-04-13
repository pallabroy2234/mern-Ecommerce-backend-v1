const express = require("express");
const sellerRouter = express.Router();
const {authMiddleware, isAdmin} = require("../../middleware/authMiddleware");
const {getRequestSellers, getSellerById, updateSellerStatus, handleGetActiveSellers} = require("../../controllers/dashbaord/sellerControllers");

sellerRouter.get("/get-request-sellers", authMiddleware, isAdmin, getRequestSellers);

sellerRouter.get("/get-sellerById/:sellerId", authMiddleware, isAdmin, getSellerById);

sellerRouter.post("/update-sellerStatus", authMiddleware, isAdmin, updateSellerStatus);

// * GET ACTIVE SELLERS || GET || /api/get-active-sellers
sellerRouter.get("/get-active-sellers", authMiddleware, isAdmin, handleGetActiveSellers);

module.exports = sellerRouter;
