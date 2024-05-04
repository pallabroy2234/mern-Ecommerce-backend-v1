const express = require("express");
const {authMiddleware, isSeller, isAdmin} = require("../../middleware/authMiddleware");
const {handleGetSellerDashboardData, handleGetAdminDashboardData} = require("../../controllers/dashbaord/dashboardControllers");
const dashboardRouter = express.Router();

// * ------------------------------ SELLER ROUTES ------------------------------- *//

// * GET SELLER DASHBOARD DATA || GET || /api/dashboard/seller/get-seller-dashboard-data
dashboardRouter.get("/seller/get-seller-dashboard-data", authMiddleware, isSeller, handleGetSellerDashboardData);

// *------------------------------- ADMIN ------------------------------- //

dashboardRouter.get("/admin/get-admin-dashboard-data", authMiddleware, isAdmin, handleGetAdminDashboardData);

module.exports = dashboardRouter;
