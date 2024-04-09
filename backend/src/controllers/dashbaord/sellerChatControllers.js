const {errorResponse, successResponse} = require("../../helper/responseHelper");
const {
	Types: {ObjectId},
} = require("mongoose");
const Seller = require("../../models/sellerModal");
const SellerCustomer = require("../../models/chat/sellerCustomerModal");

// * HANDLE GET CHAT FOR GET USERS  || GET /api/dashboard/chat/seller/get-user
const handleChatForGetUsers = async (req, res) => {
	try {
		const {id} = req;
		if (!ObjectId.isValid(id)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid id",
			});
		}
		const sellerExist = await Seller.findOne({_id: id});
		if (!sellerExist) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Seller not found",
			});
		}

		const sellerCustomers = await SellerCustomer.findOne({
			myId: id,
		});

		return successResponse(res, {
			statusCode: 200,
			message: "ok",
			payload: {
				users: sellerCustomers.myFriends,
			},
		});
	} catch (e) {
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal server error",
		});
	}
};

module.exports = {
	handleChatForGetUsers,
};
