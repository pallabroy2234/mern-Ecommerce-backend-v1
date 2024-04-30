const express = require("express");
const {authMiddleware, isSeller} = require("../../middleware/authMiddleware");
const {handleAddBanner} = require("../../controllers/dashbaord/bannerControllers");
const {upload} = require("../../utiles/upload");
const bannerRouter = express.Router();

// * ADD BANNER || POST || /api/dashboard/banner/add-banner
bannerRouter.post("/add-banner", upload.single("image"), authMiddleware, isSeller, handleAddBanner);

module.exports = bannerRouter;
