const express = require('express');
const sellerRouter =express.Router();
const {authMiddleware, isAdmin} = require("../../middleware/authMiddleware");
const {getRequestSellers,getSellerById, updateSellerStatus} = require("../../controllers/dashbaord/sellerControllers");





sellerRouter.get("/get-request-sellers",authMiddleware,isAdmin, getRequestSellers)

sellerRouter.get("/get-sellerById/:sellerId",authMiddleware,isAdmin, getSellerById)

sellerRouter.post("/update-sellerStatus",authMiddleware,isAdmin, updateSellerStatus)

module.exports =sellerRouter;

