const express = require("express");
const {authMiddleware, isSeller} = require("../../middleware/authMiddleware");
const {handleGetSellerDashboardData} = require("../../controllers/dashbaord/dashboardControllers");
const dashboardRouter = express.Router();

// * ------------------------------ SELLER ROUTES ------------------------------- *//

// * GET SELLER DASHBOARD DATA || GET || /api/dashboard/seller/get-seller-dashboard-data
dashboardRouter.get("/seller/get-seller-dashboard-data", authMiddleware, isSeller, handleGetSellerDashboardData);

module.exports = dashboardRouter;
