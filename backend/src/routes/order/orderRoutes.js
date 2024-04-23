const express = require("express");
const {handlePlaceOrder, handleGetRecentOrders, handleGetMyOrders, handleGetOrderDetails, handleCreatePayment} = require("../../controllers/order/orderControllers");
const {isLoggedIn, authMiddleware} = require("../../middleware/frontend/authMiddleware");
const {placeOrderValidator} = require("../../validator/order/orderValidator");
const {runValidation} = require("../../validator");
const orderRoutes = express.Router();

// * PLACE  ORDER
orderRoutes.post("/place-order", isLoggedIn, placeOrderValidator, runValidation, handlePlaceOrder);

// * GET RECENT ORDERS || GET || /api/frontend/product/order/get-recentOrders/:userId
orderRoutes.get("/get-recentOrders/:userId", isLoggedIn, handleGetRecentOrders);

// * GET MY ORDERS || GET || /api/frontend/product/order/get-myOrders/:userId/:deliveryStatus
orderRoutes.get("/get-myOrders/:userId/:status", isLoggedIn, handleGetMyOrders);

// * GET ORDER DETAILS || GET || /api/frontend/product/order/get-orderDetails/:orderId
orderRoutes.get("/get-orderDetails/:orderId", isLoggedIn, authMiddleware, handleGetOrderDetails);

// *** CREATE PAYMENT || POST  || /api/frontend/product/order/create-payment
orderRoutes.post("/create-payment", isLoggedIn, authMiddleware, handleCreatePayment);

module.exports = orderRoutes;
