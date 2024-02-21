
const express = require('express');
const {getCategories, getHomePageProduct} = require("../../controllers/frontend/homeControllers");
const homeRouter = express.Router();



homeRouter.get("/get-categories" , getCategories)
homeRouter.get("/get-homePageProduct", getHomePageProduct)



module.exports = homeRouter;