const {errorResponse, successResponse} = require("../../helper/responseHelper");
const Seller = require("../../models/sellerModal");
const SellerAdminMessage = require("../../models/chat/adminSellerMessagModal");
const {
	Types: {ObjectId},
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
		const {senderId, receiverId, message, senderName} = req.body;
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
			senderId: senderId,
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

// * HANDLE GET CURRENT SELLER AND WITH MESSAGES || GET || /api/dashboard/chat/admin/current-seller/:receiverId

const handleGetCurrentSellerAdminMessages = async (req, res) => {
	try {
		const {id} = req;
		const {receiverId} = req.params;
		if (!ObjectId.isValid(id) || !ObjectId.isValid(receiverId)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid id",
			});
		}
		const sellerExist = await Seller.findOne({_id: receiverId});
		if (!sellerExist) {
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
								$eq: new ObjectId(receiverId),
							},
						},
						{
							senderId: {
								$eq: "",
							},
						},
					],
				},
				{
					$and: [
						{
							receiverId: {
								$eq: "",
							},
						},
						{
							senderId: {
								$eq: new ObjectId(receiverId),
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
				currentSeller: sellerExist,
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

module.exports = {
	handleGetSellers,
	handleSendMessageSellerAdmin,
	handleGetCurrentSellerAdminMessages,
};
