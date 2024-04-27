const {errorResponse, successResponse} = require("../../helper/responseHelper");
const {
	Types: {ObjectId},
} = require("mongoose");
const SellerModal = require("../../models/sellerModal");
const AdminOrderModal = require("../../models/adminOrderModal");
const UserOrderModal = require("../../models/userOrderModal");
const SellerWalletModal = require("../../models/sellerWalletModal");
const ShopWalletModal = require("../../models/shopWalletModal");
const ProductModal = require("../../models/productModal");
const SellerAdminChatModal = require("../../models/chat/adminSellerMessagModal");
const SellerUserChatModal = require("../../models/chat/sellerCustomerMessageModal");

// * HANDLE GET SELLER DASHBOARD DATA || GET || /api/dashboard/seller/get-seller-dashboard-data
const handleGetSellerDashboardData = async (req, res) => {
	try {
		const {id} = req;
		if (!ObjectId.isValid(id)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid  Id",
			});
		}
		const sellerExist = await SellerModal.findOne({_id: id});
		if (!sellerExist) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Please Register first",
			});
		}

		const totalSale = await SellerWalletModal.aggregate([
			{$match: {sellerId: new ObjectId(id)}},
			{
				$group: {
					_id: "$sellerId",
					totalAmount: {$sum: "$amount"},
				},
			},
		]);

		const totalProduct = await ProductModal.find({sellerId: new ObjectId(id)}).countDocuments();

		const totalOrder = await AdminOrderModal.find({sellerId: new ObjectId(id)}).countDocuments();

		const totalPendingOrder = await AdminOrderModal.find({
			$and: [{sellerId: {$eq: new ObjectId(id)}}, {deliveryStatus: {$eq: "pending"}}],
		}).countDocuments();

		const message = await SellerUserChatModal.find({$or: [{senderId: id}, {receiverId: id}]})
			.limit(3)
			.sort({createdAt: -1});

		const recentOrders = await AdminOrderModal.find({sellerId: new ObjectId(id)})
			.limit(5)
			.sort({createdAt: -1});

		return successResponse(res, {
			statusCode: 200,
			message: "Seller Dashboard Data",
			payload: {
				totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0,
				totalProducts: totalProduct || 0,
				totalOrder: totalOrder || 0,
				totalPendingOrder: totalPendingOrder || 0,
				message: message || [],
				recentOrders: recentOrders || [],
			},
		});
	} catch (e) {
		console.log(e.message, "handleGetSellerDashboardData");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

const handleGetAdminDashboardData = async (req, res) => {
	try {
		const {id} = req;
		if (!ObjectId.isValid(id)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid  Id",
			});
		}

		const totalSale = await ShopWalletModal.aggregate([{$group: {_id: null, totalAmount: {$sum: "$amount"}}}]);
		const totalProduct = await ProductModal.find({}).countDocuments();
		const totalOrder = await UserOrderModal.find({}).countDocuments();
		const totalSeller = await SellerModal.find({}).countDocuments();

		const message = await SellerAdminChatModal.find({$or: [{senderId: id}, {receiverId: id}]})
			.limit(3)
			.sort({createdAt: -1});

		const recentOrders = await UserOrderModal.find({}).limit(5).sort({createdAt: -1});

		return successResponse(res, {
			statusCode: 200,
			message: "Admin Dashboard Data",
			payload: {
				totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0,
				totalProducts: totalProduct || 0,
				totalOrder: totalOrder || 0,
				totalSellers: totalSeller || 0,
				message: message || [],
				recentOrders: recentOrders || [],
			},
		});
	} catch (e) {
		console.log(e.message, "handleGetAdminDashboardData");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

module.exports = {
	handleGetSellerDashboardData,
	handleGetAdminDashboardData,
};
