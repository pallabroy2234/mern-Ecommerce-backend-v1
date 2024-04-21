const {errorResponse} = require("../../helper/responseHelper");
const StripeModal = require("../../models/stripeModal");

// * HANDLE SELLER STRIPE CONNECT ACCOUNT || GET || /api/payment/seller/connect-account

const handleSellerConnectAccount = async (req, res) => {
	try {
		const {id} = req;
		console.log(id);
	} catch (e) {
		console.log(e.message, "handleSellerConnectAccount");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

module.exports = {
	handleSellerConnectAccount,
};
