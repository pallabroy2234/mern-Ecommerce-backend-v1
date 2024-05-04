const express = require("express");
const {handleAddToCart, handleTotalCartProducts, handleGetCartProducts, handleDeleteCartProduct, handleQuantityIncrement, handleQuantityDecrement, handleAddToWishList, handleGetWishList, handleRemoveWishList} = require("../../controllers/frontend/cartControllers");
const {isLoggedIn, authMiddleware} = require("../../middleware/frontend/authMiddleware");
const {cartValidator} = require("../../validator/dashboard/cartValidator");
const {runValidation} = require("../../validator");
const {wishListValidator} = require("../../validator/frontend/wishListValidator");

const cartRoutes = express.Router();

cartRoutes.post("/add-to-cart", isLoggedIn, cartValidator, runValidation, handleAddToCart);

cartRoutes.post("/total-cartProducts", isLoggedIn, handleTotalCartProducts);

cartRoutes.get("/get-cart-products/:userId", isLoggedIn, handleGetCartProducts);

// * DELETE CART PRODUCT
cartRoutes.delete("/delete-cartProduct/:cartId", isLoggedIn, handleDeleteCartProduct);

// * QUANTITY INCREMENT
cartRoutes.put("/quantity-increment/:cartId", isLoggedIn, handleQuantityIncrement);

// * QUANTITY DECREMENT
cartRoutes.put("/quantity-decrement/:cartId", isLoggedIn, handleQuantityDecrement);

// * ADD TO WISHLIST || POST || /api/frontend/product/add-to-wishlist
cartRoutes.post("/add-to-wishlist", isLoggedIn, wishListValidator, runValidation, handleAddToWishList);

// * GET WISHLIST || POST || /api/frontend/product/get-wishlist
cartRoutes.get("/get-wishlist/:userId", isLoggedIn, handleGetWishList);

// * REMOVE WISHLIST || DELETE || /api/frontend/product/remove-wishlist/:wishlistId
cartRoutes.delete("/remove-wishlist/:wishlistId", isLoggedIn, authMiddleware, handleRemoveWishList);

module.exports = cartRoutes;
