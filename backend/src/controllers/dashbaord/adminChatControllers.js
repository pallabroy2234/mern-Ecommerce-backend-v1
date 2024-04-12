const {errorResponse, successResponse} = require("../../helper/responseHelper");
const Seller = require("../../models/sellerModal");
const SellerAdminMessage = require("../../models/chat/adminSellerMessagModal");
const AdminModal = require("../../models/adminModel");
const {
	Types: {ObjectId},
	Types,
} = require("mongoose");

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

// * SEND MESSAGE SELLER - ADMIN || POST || /api/dashboard/chat/admin/message-send-seller-admin

const handleSendMessageSellerAdmin = async (req, res) => {
	try {
		const {id} = req;

		const {receiverId, message, senderName} = req.body;
		if (!ObjectId.isValid(receiverId)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid  id",
			});
		}

		const sellerExists = await Seller.findOne({_id: receiverId});
		if (!sellerExists) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Seller not found",
			});
		}

		const createMessage = await SellerAdminMessage.create({
			senderId: new ObjectId(id),
			senderName: senderName,
			receiverId: receiverId,
			receiverName: sellerExists.name,
			message: message,
		});

		if (!createMessage) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Message not sent",
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Message sent successfully",
			payload: createMessage,
		});
	} catch (e) {
		console.log(e.message, "handle send message seller admin");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal server error",
		});
	}
};

// * HANDLE GET CURRENT SELLER AND WITH MESSAGES || GET || /api/dashboard/chat/admin/get-admin-messages/:sellerId

const handleGetCurrentSellerAdminMessages = async (req, res) => {
	try {
		let {id} = req;
		const {sellerId} = req.params;
		if (!ObjectId.isValid(sellerId) || !ObjectId.isValid(id)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid id",
			});
		}
		const sellerExists = await Seller.findOne({_id: sellerId});
		if (!sellerExists) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Seller not found",
			});
		}

		const messages = await SellerAdminMessage.find({
			$or: [
				{
					$and: [
						{
							receiverId: {
								$eq: new ObjectId(sellerId),
							},
						},
						{
							senderId: {
								$eq: new ObjectId(id),
							},
						},
					],
				},
				{
					$and: [
						{
							receiverId: {
								$eq: new ObjectId(id),
							},
						},
						{
							senderId: {
								$eq: new ObjectId(sellerId),
							},
						},
					],
				},
			],
		});

		return successResponse(res, {
			statusCode: 200,
			message: "Messages fetched successfully",
			payload: {
				messages: messages,
				currentSeller: sellerExists,
			},
		});
	} catch (e) {
		console.log(e.message, "handle get current seller admin messages");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal server error",
		});
	}
};

const handleGetSellerMessages = async (req, res) => {
	try {
		const {id} = req;
		const sellerExist = await Seller.findOne({_id: id});
		if (!sellerExist) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Seller not found",
			});
		}

		const messages = await SellerAdminMessage.find({
			$or: [
				{
					receiverId: {
						$eq: new ObjectId(id),
					},
				},
				{
					senderId: {
						$eq: new ObjectId(id),
					},
				},
			],
		});

		return successResponse(res, {
			statusCode: 200,
			message: "Messages fetched successfully",
			payload: {
				messages,
			},
		});
	} catch (e) {
		console.log(e.message, "handle get seller messages");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal server error",
		});
	}
};

module.exports = {
	handleGetSellers,
	handleSendMessageSellerAdmin,
	handleGetCurrentSellerAdminMessages,
	handleGetSellerMessages,
};
