const express = require("express");
const {handleSellerConnectAccount} = require("../../controllers/payment/paymentControllers");
const {authMiddleware, isSeller} = require("../../middleware/authMiddleware");
const paymentRoutes = express.Router();

// * SELLER PAYMENT

// * CONNECT ACCOUNT || GET || /api/payment/seller/connect-account
paymentRoutes.get("/seller/connect-account", authMiddleware, isSeller, handleSellerConnectAccount);

module.exports = paymentRoutes;
