const express = require("express");
const {handlePlaceOrder, handleGetOrders} = require("../../controllers/order/orderControllers");
const {isLoggedIn, authMiddleware} = require("../../middleware/frontend/authMiddleware");
const {placeOrderValidator} = require("../../validator/order/orderValidator");
const {runValidation} = require("../../validator");
const orderRoutes = express.Router();

// * PLACE  ORDER
orderRoutes.post("/place-order", isLoggedIn, placeOrderValidator, runValidation, handlePlaceOrder);

orderRoutes.get("/get-recentOrders/:userId", isLoggedIn, handleGetOrders);

module.exports = orderRoutes;
