const {errorResponse, successResponse} = require("../../helper/responseHelper");

// * HANDLE PLACE ORDER  || POST || /api/frontend/product/order/place-order
const handlePlaceOrder = async (req, res) => {
	try {
		const {products} = req.body;

		for (const item of products) {
			console.log(item);
		}

		return successResponse(res, {
			status: 200,
			message: "Order Placed Successfully",
		});
	} catch (e) {
		return errorResponse(res, {
			status: 500,
			message: "Internal Server Error",
		});
	}
};

module.exports = {
	handlePlaceOrder,
};
