const express = require("express");
const {handleSellerConnectAccount, handleSellerActiveAccount} = require("../../controllers/payment/paymentControllers");
const {authMiddleware, isSeller} = require("../../middleware/authMiddleware");
const paymentRoutes = express.Router();

// * SELLER PAYMENT

// * CONNECT ACCOUNT || GET || /api/payment/seller/connect-account
paymentRoutes.get("/seller/connect-account", authMiddleware, isSeller, handleSellerConnectAccount);

// * SELLER STRIPE ACTIVE ACCOUNT || PUT || /api/payment/seller/active-account/:activecode
paymentRoutes.put("/seller/active-account/:activecode", authMiddleware, isSeller, handleSellerActiveAccount);

module.exports = paymentRoutes;
