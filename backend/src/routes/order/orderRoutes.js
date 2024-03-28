const express = require("express");
const {handlePlaceOrder} = require("../../controllers/order/orderControllers");
const {isLoggedIn} = require("../../middleware/frontend/authMiddleware");
const {placeOrderValidator} = require("../../validator/order/orderValidator");
const {runValidation} = require("../../validator");
const orderRoutes = express.Router();

// * PLACE  ORDER
orderRoutes.post("/place-order", isLoggedIn, placeOrderValidator, runValidation, handlePlaceOrder);

module.exports = orderRoutes;
