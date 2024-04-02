const express = require("express");
const {getCategories, getHomePageProduct, getPriceRangeLatestProduct, getFeatureProducts, getCarouselLatestProducts, getCarouselProducts, getPriceRange, getQueryProducts, handleGetProductDetails, handleSubmitReview} = require("../../controllers/frontend/homeControllers");
const {isLoggedIn, authMiddleware} = require("../../middleware/frontend/authMiddleware");
const {userSubmitValidator} = require("../../validator/frontend/userSubmitValidator");
const {runValidation} = require("../../validator");
const homeRouter = express.Router();

homeRouter.get("/get-categories", getCategories);

homeRouter.get("/get-featureProducts", getFeatureProducts);

homeRouter.get("/get-carouselLatestProducts", getCarouselLatestProducts);

homeRouter.get("/get-carouselProducts", getCarouselProducts);

homeRouter.get("/get-priceRange", getPriceRange);

homeRouter.get("/get-queryProducts", getQueryProducts);

// * GET PRODUCT DETAILS || GET || /api/frontend/get-product/details/:slug

homeRouter.get("/get-product/details/:slug", handleGetProductDetails);

// * SUBMIT USER REVIEW || POST || /api/frontend/submit-user-review
homeRouter.post("/submit-user-review", isLoggedIn, authMiddleware, userSubmitValidator, runValidation, handleSubmitReview);

module.exports = homeRouter;
