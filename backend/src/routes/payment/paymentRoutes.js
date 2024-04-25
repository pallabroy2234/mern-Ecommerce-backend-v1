const express = require("express");
const {handleSellerConnectAccount, handleSellerActiveAccount, handleSellerPaymentDetails, handleSendWithdrawRequest} = require("../../controllers/payment/paymentControllers");
const {authMiddleware, isSeller} = require("../../middleware/authMiddleware");
const paymentRoutes = express.Router();

// * SELLER PAYMENT
// * CONNECT ACCOUNT || GET || /api/payment/seller/connect-account
paymentRoutes.get("/seller/connect-account", authMiddleware, isSeller, handleSellerConnectAccount);

// * SELLER STRIPE ACTIVE ACCOUNT || PUT || /api/payment/seller/active-account/:activecode
paymentRoutes.put("/seller/active-account/:activecode", authMiddleware, isSeller, handleSellerActiveAccount);

// * GET SELLER PAYMENT DETAILS || GET || /api/payment/seller/get-payment-details
paymentRoutes.get("/seller/get-payment-details", authMiddleware, isSeller, handleSellerPaymentDetails);

// * SEND WITHDRAW REQUEST || POST || /api/payment/seller/send-withdraw-request
paymentRoutes.post("/seller/send-withdraw-request", authMiddleware, isSeller, handleSendWithdrawRequest);

module.exports = paymentRoutes;
