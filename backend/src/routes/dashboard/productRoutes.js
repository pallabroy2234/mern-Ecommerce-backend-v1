
const express = require('express');
const productRouter =express.Router();
const {authMiddleware} = require("../../middleware/authMiddleware");
const {upload, uploadMultiple} =require("../../utiles/upload")
const {add_product} = require("../../controllers/dashbaord/productControllers");
const {addProductValidator} = require("../../validator/dashboard/productValidator");
const {runValidation} = require("../../validator");



productRouter.post("/add_product", uploadMultiple, addProductValidator,runValidation, authMiddleware, add_product)



module.exports = productRouter;