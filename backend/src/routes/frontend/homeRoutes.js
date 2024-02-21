
const express = require('express');
const {getCategories, getProducts} = require("../../controllers/frontend/homeControllers");
const homeRouter = express.Router();



homeRouter.get("/get-categories" , getCategories)
// homeRouter.get("/get-products", getProducts)



module.exports = homeRouter;