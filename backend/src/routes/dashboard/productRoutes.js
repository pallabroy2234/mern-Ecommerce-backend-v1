
const express = require('express');
const productRouter =express.Router();
const {authMiddleware} = require("../../middleware/authMiddleware");
const {upload, uploadMultiple} =require("../../utiles/upload")
const {add_product, get_products, get_product, update_product} = require("../../controllers/dashbaord/productControllers");
const {addProductValidator, updateProductValidator} = require("../../validator/dashboard/productValidator");
const {runValidation} = require("../../validator");



// ! ADD PRODUCT -> POST REQUEST
productRouter.post("/add_product",uploadMultiple,authMiddleware , addProductValidator,runValidation , add_product)

// ! GET ALL PRODUCTS BY SELLER ID -> GET REQUEST
productRouter.get("/get_products", authMiddleware,get_products)


// ! GET PRODUCT BY ID -> GET REQUEST
productRouter.get("/get_product/:productId", authMiddleware,get_product)


// ! UPDATE PRODUCT -> POST REQUEST
productRouter.post("/update_product",uploadMultiple,authMiddleware,updateProductValidator,runValidation ,update_product)

module.exports = productRouter;