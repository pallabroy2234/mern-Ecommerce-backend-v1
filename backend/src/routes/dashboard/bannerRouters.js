const express = require("express");
const {authMiddleware, isSeller} = require("../../middleware/authMiddleware");
const {handleAddBanner, handleGetBanner} = require("../../controllers/dashbaord/bannerControllers");
const {upload} = require("../../utiles/upload");
const bannerRouter = express.Router();

// * ADD BANNER || POST || /api/dashboard/banner/add-banner
bannerRouter.post("/add-banner", upload.single("image"), authMiddleware, isSeller, handleAddBanner);

// * GET  BANNER BY PRODUCT ID || GET || /api/dashboard/banner/get-banner/:productId
bannerRouter.get("/get-banner/:productId", authMiddleware, isSeller, handleGetBanner);

module.exports = bannerRouter;
