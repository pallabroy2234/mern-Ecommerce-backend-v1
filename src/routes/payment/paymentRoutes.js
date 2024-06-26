const express = require("express");
const {handleSellerConnectAccount, handleSellerActiveAccount, handleSellerPaymentDetails, handleSendWithdrawRequest, handleAdminSellerPaymentRequest, handleConfirmPaymentRequest} = require("../../controllers/payment/paymentControllers");
const {authMiddleware, isSeller, isAdmin} = require("../../middleware/authMiddleware");
const paymentRoutes = express.Router();

// *--------------------------------- SELLER PAYMENT ROUTES ---------------------------------//
// * CONNECT ACCOUNT || GET || /api/payment/seller/connect-account
paymentRoutes.get("/seller/connect-account", authMiddleware, isSeller, handleSellerConnectAccount);

// * SELLER STRIPE ACTIVE ACCOUNT || PUT || /api/payment/seller/active-account/:activecode
paymentRoutes.put("/seller/active-account/:activecode", authMiddleware, isSeller, handleSellerActiveAccount);

// * GET SELLER PAYMENT DETAILS || GET || /api/payment/seller/get-payment-details
paymentRoutes.get("/seller/get-payment-details", authMiddleware, isSeller, handleSellerPaymentDetails);

// * SEND WITHDRAW REQUEST || POST || /api/payment/seller/send-withdraw-request
paymentRoutes.post("/seller/send-withdraw-request", authMiddleware, isSeller, handleSendWithdrawRequest);

// *--------------------------------- ADMIN PAYMENT ROUTES ---------------------------------//

// * GET ADMIN-SELLER'S PAYMENT REQUEST || GET || /api/payment/admin/get-payment-request
paymentRoutes.get("/admin/get-payment-request", authMiddleware, isAdmin, handleAdminSellerPaymentRequest);

// * CONFIRM PAYMENT REQUEST || POST || /api/payment/admin/confirm-payment-request
paymentRoutes.post("/admin/confirm-payment-request", authMiddleware, isAdmin, handleConfirmPaymentRequest);

module.exports = paymentRoutes;
