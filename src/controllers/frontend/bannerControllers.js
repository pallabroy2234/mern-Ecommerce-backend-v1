const {errorResponse, successResponse} = require("../../helper/responseHelper");
const BannerModal = require("../../models/bannerModal");

// * HANDLE GET BANNER RANDOMLY -> 10 || GET || /api/frontend/banner/get-banner
const handleGetBanner = async (req, res) => {
	try {
		const banner = await BannerModal.aggregate([{$sample: {size: 10}}]);

		return successResponse(res, {
			statusCode: 200,
			message: "Banner fetched successfully",
			payload: banner || [],
		});
	} catch (e) {
		console.log(e.message, "handleGetBanner");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal server error",
		});
	}
};

module.exports = {
	handleGetBanner,
};
