const {errorResponse, successResponse} = require("../../helper/responseHelper");
const Seller = require("../../models/sellerModal");

// * HANDLE GET SELLERS || GET || /api/dashboard/chat/admin/get-sellers
const handleGetSellers = async (req, res) => {
	try {
		const sellers = await Seller.find({});
		return successResponse(res, {
			statusCode: 200,
			message: "Sellers fetched successfully",
			payload: sellers,
		});
	} catch (e) {
		console.log(e.message, "handle get sellers");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal server error",
		});
	}
};

module.exports = {
	handleGetSellers,
};
