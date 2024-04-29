const {errorResponse} = require("../../helper/responseHelper");
const {
	Types: {ObjectId},
} = require("mongoose");
const SellerModal = require("../../models/sellerModal");
const ProductModal = require("../../models/productModal");

// * HANDLE ADD BANNER || POST || /api/dashboard/banner/add-banner
const handleAddBanner = async (req, res) => {
	try {
		const {id} = req;
		const {productId} = req.body;
		if (!ObjectId.isValid(id) || !ObjectId.isValid(productId)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid  id",
			});
		}
		const sellerExists = await SellerModal.findOne({_id: id});
		if (!sellerExists) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Please login first",
			});
		}
		const banner = req.file;
	} catch (e) {
		console.log(e.message, "handleAddBanner");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

module.exports = {
	handleAddBanner,
};
