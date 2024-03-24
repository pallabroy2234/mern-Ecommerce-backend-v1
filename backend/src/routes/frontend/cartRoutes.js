const express = require('express');
const {handleAddToCart} = require("../../controllers/frontend/cartControllers");
const {isLoggedIn} = require("../../middleware/frontend/authMiddleware");

const cartRoutes = express.Router();

cartRoutes.post("/add-to-cart", isLoggedIn, handleAddToCart)


module.exports = cartRoutes;