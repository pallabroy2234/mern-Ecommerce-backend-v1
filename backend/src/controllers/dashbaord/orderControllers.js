const {errorResponse, successResponse} = require("../../helper/responseHelper");
const AdminOrderModal = require("../../models/adminOrderModal");
const UserOrderModal = require("../../models/userOrderModal");

// * HANDLE GET ADMIN ORDERS || GET || /api/dashboard/order/admin/get-orders?currentPage=1&&parPage=5&&searchValue=""
const handleGetAdminOrders = async (req, res) => {
	try {
		const parPage = parseInt(req.query.parPage) || 5;
		const currentPage = parseInt(req.query.currentPage) || 1;
		const searchValue = req.query.searchValue || "";
		const searchRegExp = new RegExp(".*" + searchValue + ".*", "i");
		const skipPage = parseInt(parPage) * (parseInt(currentPage) - 1);

		if (searchValue) {
		} else {
			const orders = await UserOrderModal.aggregate([
				{
					$lookup: {
						from: "adminorders",
						localField: "_id",
						foreignField: "orderId",
						as: "subOrders",
					},
				},
			]);

			return successResponse(res, {
				payload: {
					orders,
					pagination: {
						totalNumberOfSellers: orders.length,
						totalPages: Math.ceil(orders.length / parPage),
						currentPage: currentPage,
						previousPage: currentPage - 1 ? currentPage - 1 : null,
						nextPage: currentPage + 1 <= Math.ceil(orders.length / parPage) ? currentPage + 1 : null,
					}
				},
			});
		}
	} catch (e) {
		console.log(e.message, "handleGetAdminOrders");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal server error",
		});
	}
};

module.exports = {
	handleGetAdminOrders,
};
