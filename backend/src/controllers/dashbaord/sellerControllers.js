const Seller = require("../../models/sellerModal");
const {successResponse, errorResponse} = require("../../helper/responseHelper");
const mongoose = require("mongoose");

// ! GET REQUEST SELLERS ONLY PENDING SELLERS ARE RETURNED -> GET
const getRequestSellers = async (req, res) => {
	try {
		const {id} = req;
		if (!id) {
			return errorResponse(res, {statusCode: 400, message: "Login first"});
		}
		const {currentPage, searchValue, parPage} = req.query;
		const skipPage = parseInt(parPage) * (parseInt(currentPage) - 1);
		const searchRegExp = new RegExp(".*" + searchValue + ".*", "i");
		if (searchValue) {
			const sellers = await Seller.find({
				$and: [
					{status: "pending"},
					{
						$or: [{name: {$regex: searchRegExp}}, {email: {$regex: searchRegExp}}, {payment: {$regex: searchRegExp}}],
					},
				],
			})
				.skip(skipPage)
				.limit(parseInt(parPage))
				.sort({createdAt: -1});

			const totalSellers = await Seller.find({
				$and: [
					{status: "pending"},
					{
						$or: [{name: {$regex: searchRegExp}}, {email: {$regex: searchRegExp}}, {payment: {$regex: searchRegExp}}],
					},
				],
			}).countDocuments();

			return successResponse(res, {statusCode: 200, payload: {sellers, totalSellers}});
		} else {
			const sellers = await Seller.find({status: "pending"}).skip(skipPage).limit(parseInt(parPage)).sort({createdAt: -1});

			const totalSellers = await Seller.find({status: "pending"}).countDocuments();

			return successResponse(res, {statusCode: 200, payload: {sellers, totalSellers}});
		}
	} catch (e) {
		return errorResponse(res, {statusCode: 500, message: "Something went wrong"});
	}
};

// ! GET SELLER BY ID -> GET

const getSellerById = async (req, res) => {
	try {
		const {id} = req;
		if (!id) {
			return errorResponse(res, {statusCode: 404, message: "Login first"});
		}
		const {sellerId} = req.params;
		if (!sellerId) {
			return errorResponse(res, {statusCode: 404, message: "Seller id not found"});
		}

		const seller = await Seller.findById(sellerId);
		if (!seller) {
			return errorResponse(res, {statusCode: 404, message: "Seller not found"});
		}
		return successResponse(res, {statusCode: 200, payload: seller});
	} catch (error) {
		if (error instanceof mongoose.Error) {
			return errorResponse(res, {
				statusCode: 500,
				message: "Invalid seller id",
			});
		}
		return errorResponse(res, {
			statusCode: 500,
			message: "Internal Server Error",
		});
	}
};

// ! UPDATE SELLER STATUS -> POST

const updateSellerStatus = async (req, res) => {
	try {
		const {sellerId, status} = req.body;
		if (!sellerId || !status) {
			return errorResponse(res, {statusCode: 404, message: "Seller id or status not found"});
		}
		const seller = await Seller.exists({_id: sellerId});
		if (!seller) {
			return errorResponse(res, {statusCode: 404, message: "Seller not found"});
		}

		const updateStatus = await Seller.findByIdAndUpdate(sellerId, {status}, {new: true});

		if (!updateStatus) {
			return errorResponse(res, {statusCode: 404, message: "Seller status not updated"});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Seller status updated successfully",
			payload: updateStatus,
		});
	} catch (error) {
		if (error instanceof mongoose.Error) {
			return errorResponse(res, {
				statusCode: 500,
				message: "Invalid seller id",
			});
		}
		return errorResponse(res, {
			statusCode: 500,
			message: "Internal Server Error",
		});
	}
};

// * HANDLE GET ACTIVE SELLERS BY QUERY || GET || /api/get-active-sellers

const handleGetActiveSellers = async (req, res) => {
	try {
		const parPage = parseInt(req.query.parPage) || 5;
		const currentPage = parseInt(req.query.currentPage) || 1;
		const searchValue = req.query.searchValue || "";
		const searchRegExp = new RegExp(".*" + searchValue + ".*", "i");
		const skipPage = parseInt(parPage) * (parseInt(currentPage) - 1);

		if (searchRegExp) {
			const sellers = await Seller.find({
				status: "active",
				$or: [
					{name: {$regex: searchRegExp}},
					{
						email: {
							$regex: searchRegExp,
						},
					},
					{"shopInfo.shopName": {$regex: searchRegExp}},
					{
						payment: {
							$regex: searchRegExp,
						},
					},
					{
						"shopInfo.division": {
							$regex: searchRegExp,
						},
					},
					{"shopInfo.district": {$regex: searchRegExp}},
				],
			})
				.skip(skipPage)
				.limit(parseInt(parPage))
				.sort({createdAt: -1});

			const totalSellers = await Seller.find({
				status: "active",
				$or: [{name: {$regex: searchRegExp}}, {email: {$regex: searchRegExp}}, {"shopInfo.shopName": {$regex: searchRegExp}}, {payment: {$regex: searchRegExp}}, {"shopInfo.division": {$regex: searchRegExp}}, {"shopInfo.district": {$regex: searchRegExp}}],
			}).countDocuments();

			return successResponse(res, {
				statusCode: 200,
				payload: {
					sellers,
					pagination: {
						totalNumberOfSellers: totalSellers,
						totalPages: Math.ceil(totalSellers / parPage),
						currentPage: currentPage,
						previousPage: currentPage - 1 ? currentPage - 1 : null,
						nextPage: currentPage + 1 <= Math.ceil(currentPage / parPage) ? currentPage + 1 : null,
					},
				},
			});
		} else {
			const sellers = await Seller.find({status: "active"}).skip(skipPage).limit(parseInt(parPage)).sort({createdAt: -1});

			const totalSellers = await Seller.find({status: "active"}).countDocuments();
			return successResponse(res, {
				statusCode: 200,
				payload: {
					sellers,
					pagination: {
						totalNumberOfSellers: totalSellers,
						totalPages: Math.ceil(totalSellers / parPage),
						currentPage: currentPage,
						previousPage: currentPage - 1 ? currentPage - 1 : null,
						nextPage: currentPage + 1 <= Math.ceil(currentPage / parPage) ? currentPage + 1 : null,
					},
				},
			});
		}
	} catch (e) {
		console.log(e.message, "handleGetActiveSellers");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

// * HANDLE GET DEACTIVE SELLERS BY QUERY || GET || /api/get-deactive-sellers
const handleGetDeActiveSellers = async (req, res) => {
	try {
		const parPage = parseInt(req.query.parPage) || 5;
		const currentPage = parseInt(req.query.currentPage) || 1;
		const searchValue = req.query.searchValue || "";
		const searchRegExp = new RegExp(".*" + searchValue + ".*", "i");
		const skipPage = parseInt(parPage) * (parseInt(currentPage) - 1);

		if (searchRegExp) {
			const sellers = await Seller.find({
				status: "deactive",
				$or: [
					{name: {$regex: searchRegExp}},
					{
						email: {
							$regex: searchRegExp,
						},
					},
					{"shopInfo.shopName": {$regex: searchRegExp}},
					{
						payment: {
							$regex: searchRegExp,
						},
					},
					{
						"shopInfo.division": {
							$regex: searchRegExp,
						},
					},
					{"shopInfo.district": {$regex: searchRegExp}},
				],
			})
				.skip(skipPage)
				.limit(parseInt(parPage))
				.sort({createdAt: -1});

			const totalSellers = await Seller.find({
				status: "deactive",
				$or: [{name: {$regex: searchRegExp}}, {email: {$regex: searchRegExp}}, {"shopInfo.shopName": {$regex: searchRegExp}}, {payment: {$regex: searchRegExp}}, {"shopInfo.division": {$regex: searchRegExp}}, {"shopInfo.district": {$regex: searchRegExp}}],
			}).countDocuments();

			return successResponse(res, {
				statusCode: 200,
				payload: {
					sellers,
					pagination: {
						totalNumberOfSellers: totalSellers,
						totalPages: Math.ceil(totalSellers / parPage),
						currentPage: currentPage,
						previousPage: currentPage - 1 ? currentPage - 1 : null,
						nextPage: currentPage + 1 <= Math.ceil(totalSellers / parPage) ? currentPage + 1 : null,
					},
				},
			});
		} else {
			const sellers = await Seller.find({status: "deactive"}).skip(skipPage).limit(parseInt(parPage)).sort({createdAt: -1});

			const totalSellers = await Seller.find({status: "deactive"}).countDocuments();
			return successResponse(res, {
				statusCode: 200,
				payload: {
					sellers,
					pagination: {
						totalNumberOfSellers: totalSellers,
						totalPages: Math.ceil(totalSellers / parPage),
						currentPage: currentPage,
						previousPage: currentPage - 1 ? currentPage - 1 : null,
						nextPage: currentPage + 1 <= Math.ceil(totalSellers / parPage) ? currentPage + 1 : null,
					},
				},
			});
		}
	} catch (e) {
		console.log(e.message, "handleGetDeActiveSellers");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

module.exports = {
	getRequestSellers,
	getSellerById,
	updateSellerStatus,
	handleGetActiveSellers,
	handleGetDeActiveSellers,
};
