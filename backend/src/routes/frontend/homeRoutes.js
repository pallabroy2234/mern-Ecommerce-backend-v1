
const express = require('express');
const {getCategories, getHomePageProduct, getPriceRangeLatestProduct, getFeatureProducts, getCarouselLatestProducts,
    getCarouselProducts, getPriceRange, getQueryProducts
} = require("../../controllers/frontend/homeControllers");
const homeRouter = express.Router();



homeRouter.get("/get-categories" , getCategories)


homeRouter.get("/get-featureProducts", getFeatureProducts)

homeRouter.get("/get-carouselLatestProducts", getCarouselLatestProducts)

homeRouter.get("/get-carouselProducts", getCarouselProducts)

homeRouter.get("/get-priceRange", getPriceRange)

homeRouter.get("/get-queryProducts", getQueryProducts)





module.exports = homeRouter;