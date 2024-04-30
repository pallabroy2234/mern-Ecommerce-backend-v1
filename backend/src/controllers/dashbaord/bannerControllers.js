const {errorResponse, successResponse} = require("../../helper/responseHelper");
const {
	Types: {ObjectId},
} = require("mongoose");
const SellerModal = require("../../models/sellerModal");
const ProductModal = require("../../models/productModal");
const BannerModal = require("../../models/bannerModal");
const Products = require("../../models/productModal");
const {uploadSingleImage, publicIdWithOutExtensionFromUrl, deleteImageFromCloudinary} = require("../../helper/cloudinaryHelper");
const {unlinkAllFilesMiddleware} = require("../../utiles/upload");

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
		const productExists = await ProductModal.findOne({_id: productId});
		if (!productExists) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Product not found",
			});
		}

		//  * UPLOAD BANNER
		const banner = req.file;
		if (!banner) {
			return errorResponse(res, {statusCode: 400, message: "Banner is required"});
		}
		if (banner.size > 1024 * 1024 * 2) {
			return errorResponse(res, {statusCode: 400, message: "Banner size should be less than 2mb"});
		}

		const result = await uploadSingleImage(res, banner, "multiVendor/banner");

		const bannerExists = await BannerModal.findOne({productId: productId});

		let bannerData;
		// * delete previous image from cloudinary
		if (!bannerExists) {
			bannerData = await BannerModal.create({
				productId: productId,
				sellerId: id,
				banner: result,
				link: productExists.slug,
			});
		} else {
			const publicId = await publicIdWithOutExtensionFromUrl(bannerExists.banner);
			await deleteImageFromCloudinary(res, publicId, "multiVendor/banner");
			bannerData = await BannerModal.findOneAndUpdate({productId: productId}, {banner: result}, {new: true});
		}

		unlinkAllFilesMiddleware();
		return successResponse(res, {
			statusCode: 201,
			message: "Banner upload successfully",
			payload: bannerData || {},
		});
	} catch (e) {
		console.log(e.message, "handleAddBanner");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

// * HANDLE GET BANNER || GET || /api/dashboard/banner/get-banner/:productId

const handleGetBanner = async (req, res) => {
	try {
		const {id} = req;
		const {productId} = req.params;
		if (!ObjectId.isValid(id) || !ObjectId.isValid(productId)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid id",
			});
		}
		const sellerExists = await SellerModal.findOne({_id: id});
		if (!sellerExists) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Please register first",
			});
		}

		const banner = await BannerModal.findOne({
			$and: [{productId: new ObjectId(productId)}, {sellerId: new ObjectId(id)}],
		});

		return successResponse(res, {
			statusCode: 200,
			message: "Banner get successfully",
			payload: {
				banner: banner || {},
			},
		});
	} catch (e) {
		console.log(e.message, "handleGetBanner");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

// * HANDLE DELETE BANNER || POST || /api/dashboard/banner/delete-banner

const handleDeleteBanner = async (req, res) => {
	try {
		const {id} = req;
		const {productId, bannerId} = req.body;
		if (!ObjectId.isValid(id) || !ObjectId.isValid(productId) || !ObjectId.isValid(bannerId)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid id",
			});
		}
		const sellerExists = await SellerModal.findOne({_id: id});
		if (!sellerExists) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Please login first",
			});
		}

		const bannerExists = await BannerModal.findOne({
			$and: [{productId: new ObjectId(productId)}, {sellerId: new ObjectId(id)}, {_id: new ObjectId(bannerId)}],
		});

		if (!bannerExists) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Banner not found",
			});
		}

		const publicId = await publicIdWithOutExtensionFromUrl(bannerExists.banner);
		await deleteImageFromCloudinary(res, publicId, "multiVendor/banner");
		await bannerExists.deleteOne();

		return successResponse(res, {
			statusCode: 200,
			message: "Banner delete successfully",
		});
	} catch (e) {
		console.log(e.message, "handleDeleteBanner");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

module.exports = {
	handleAddBanner,
	handleGetBanner,
	handleDeleteBanner,
};
