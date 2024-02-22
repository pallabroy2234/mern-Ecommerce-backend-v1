
const express = require('express');
const {getCategories, getHomePageProduct, getPriceRangeLatestProduct, getFeatureProducts, getCarouselLatestProducts,
    getCarouselProducts, getPriceRange
} = require("../../controllers/frontend/homeControllers");
const homeRouter = express.Router();



homeRouter.get("/get-categories" , getCategories)


homeRouter.get("/get-featureProducts", getFeatureProducts)

homeRouter.get("/get-carouselLatestProducts", getCarouselLatestProducts)

homeRouter.get("/get-carouselProducts", getCarouselProducts)

homeRouter.get("/get-priceRange", getPriceRange)


homeRouter.get("/get-priceRange-latestProduct", getPriceRangeLatestProduct)



module.exports = homeRouter;