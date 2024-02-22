
const express = require('express');
const {getCategories, getHomePageProduct, getPriceRangeLatestProduct, getFeatureProducts} = require("../../controllers/frontend/homeControllers");
const homeRouter = express.Router();



homeRouter.get("/get-categories" , getCategories)


homeRouter.get("/get-featureProducts", getFeatureProducts)

homeRouter.get("/get-homePageProduct", getHomePageProduct)

homeRouter.get("/get-priceRange-latestProduct", getPriceRangeLatestProduct)



module.exports = homeRouter;