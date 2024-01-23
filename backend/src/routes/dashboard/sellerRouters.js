const express = require('express');
const sellerRouter =express.Router();
const {authMiddleware} = require("../../middleware/authMiddleware");
const {getRequestSellers} = require("../../controllers/dashbaord/sellerControllers");





sellerRouter.get("/get-request-sellers",authMiddleware, getRequestSellers)


module.exports =sellerRouter;

