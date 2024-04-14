const express = require("express");
const {handleGetAdminOrders} = require("../../controllers/dashbaord/orderControllers");
const {authMiddleware, isAdmin} = require("../../middleware/authMiddleware");
const orderRouter = express.Router();


// * GET ADMIN ORDERS || GET || /api/dashboard/order/admin/get-orders?currentPage=1&&parPage=5&&searchValue=""
orderRouter.get("/admin/get-orders",authMiddleware, isAdmin,  handleGetAdminOrders)






module.exports = orderRouter;