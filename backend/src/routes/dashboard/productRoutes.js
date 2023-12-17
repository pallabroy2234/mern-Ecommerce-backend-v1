
const express = require('express');
const productRouter =express.Router();
const {authMiddleware} = require("../../middleware/authMiddleware");
const {upload, uploadMultiple} =require("../../utiles/upload")
const {add_product, get_products} = require("../../controllers/dashbaord/productControllers");
const {addProductValidator} = require("../../validator/dashboard/productValidator");
const {runValidation} = require("../../validator");


// ! ADD PRODUCT -> POST REQUEST
productRouter.post("/add_product", uploadMultiple, addProductValidator,runValidation, authMiddleware, add_product)

productRouter.get("/get_products", authMiddleware,get_products)

module.exports = productRouter;