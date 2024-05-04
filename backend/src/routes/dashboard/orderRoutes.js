const express = require("express");
const {handleGetAdminOrders, handleGEtAdminOrderDetails, handleGetSellerOrderDetails, handleUpdateAdminOrderStatus, handleGetSellerOrders, handleUpdateSellerOrderStatus} = require("../../controllers/dashbaord/orderControllers");
const {authMiddleware, isAdmin, isSeller} = require("../../middleware/authMiddleware");
const orderRouter = express.Router();

// * -------------------------------------------------- Admin Routes --------------------------- * //

// * GET ADMIN ORDERS || GET || /api/dashboard/order/admin/get-orders?currentPage=1&&parPage=5&&searchValue=""
orderRouter.get("/admin/get-orders", authMiddleware, isAdmin, handleGetAdminOrders);

// * GET ADMIN ORDER DETAILS || GET || /api/dashboard/order/admin/get-order-details/:orderId
orderRouter.get("/admin/get-order-details/:orderId", authMiddleware, isAdmin, handleGEtAdminOrderDetails);

// * UPDATE ADMIN ORDER STATUS || PUT || /api/dashboard/order/admin/update-order-status/:orderId
orderRouter.put("/admin/update-order-status/:orderId", authMiddleware, isAdmin, handleUpdateAdminOrderStatus);

// * ------------------------------------------------- Seller Routes --- -------------------------------* //

// * GET SELLER ORDERS || GET || /api/dashboard/order/seller/get-orders?currentPage=1&&parPage=5&&searchValue=""
orderRouter.get("/seller/get-orders", authMiddleware, isSeller, handleGetSellerOrders);

// * GET SELLER ORDER DETAILS || GET || /api/dashboard/order/seller/get-order-details/:orderId
orderRouter.get("/seller/get-order-details/:orderId", authMiddleware, isSeller, handleGetSellerOrderDetails);

// * UPDATE ADMIN ORDER STATUS || PUT || /api/dashboard/order/admin/update-order-status/:orderId
orderRouter.put("/seller/update-order-status/:orderId", authMiddleware, isSeller, handleUpdateSellerOrderStatus);

module.exports = orderRouter;
