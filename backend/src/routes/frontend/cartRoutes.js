const express = require('express');
const {handleAddToCart, handleTotalCartProducts} = require("../../controllers/frontend/cartControllers");
const {isLoggedIn} = require("../../middleware/frontend/authMiddleware");
const {cartValidator} = require("../../validator/dashboard/cartValidator");
const {runValidation} = require("../../validator");

const cartRoutes = express.Router();

cartRoutes.post("/add-to-cart", isLoggedIn, cartValidator, runValidation, handleAddToCart)

cartRoutes.post("/total-cartProducts", isLoggedIn, handleTotalCartProducts)


module.exports = cartRoutes;