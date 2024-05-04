const express = require("express");
const {handleGetBanner} = require("../../controllers/frontend/bannerControllers");
const bannerRouter = express.Router();

// * GET BANNER RANDOMLY -> 10 || GET || /api/frontend/banner/get-banner
bannerRouter.get("/get-banner", handleGetBanner);

module.exports = bannerRouter;
