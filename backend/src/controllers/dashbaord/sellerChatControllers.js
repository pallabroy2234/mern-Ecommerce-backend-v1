const {errorResponse, successResponse} = require("../../helper/responseHelper");
const {
	Types: {ObjectId},
} = require("mongoose");
const {mongoose} = require("mongoose");
const Seller = require("../../models/sellerModal");
const User = require("../../models/userModal");
const SellerCustomer = require("../../models/chat/sellerCustomerModal");
const SellerCustomerMessageModal = require("../../models/chat/sellerCustomerMessageModal");
const SellerCustomerModal = require("../../models/chat/sellerCustomerModal");

// * HANDLE GET CHAT FOR GET USERS  || GET || /api/dashboard/chat/seller/get-user
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

// * HANDLE GET USER MESSAGES  || GET ||  /api/dashboard/chat/seller/get-user-messages/:customerId

const handleGetUserMessages = async (req, res) => {
	try {
		const {id} = req;
		const {customerId} = req.params;
		if (!ObjectId.isValid(customerId) || !ObjectId.isValid(id)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid id",
			});
		}
		const sellerExist = await Seller.findOne({_id: id});
		if (!sellerExist) {
			return errorResponse(res, {statusCode: 404, message: "Please login first"});
		}

		const userExist = await User.findOne({_id: customerId});
		if (!userExist) {
			return errorResponse(res, {statusCode: 404, message: "User not found"});
		}

		const messages = await SellerCustomerMessageModal.find({
			$or: [
				{
					$and: [
						{
							receiverId: {
								$eq: new ObjectId(customerId),
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
							senderId: {
								$eq: new ObjectId(customerId),
							},
						},
						{
							receiverId: {
								$eq: new ObjectId(id),
							},
						},
					],
				},
			],
		});

		// const currentFriend = await SellerCustomerModal.aggregate([
		// 	{
		// 		$match: {myId: id},
		// 	},
		// 	{
		// 		$unwind: "$myFriends",
		// 	},
		// 	{
		// 		$match: {"myFriends.friendId": new ObjectId(userExist._id)},
		// 	},
		// 	{
		// 		$replaceRoot: {newRoot: "$myFriends"},
		// 	},
		// 	{
		// 		$limit: 1,
		// 	},
		// ]);
		return successResponse(res, {
			statusCode: 200,
			message: "ok",
			payload: {
				messages,
				currentFriend: userExist,
			},
		});
	} catch (error) {
		return errorResponse(res, {
			statusCode: 500,
			message: error.message || "Internal server error",
		});
	}
};

// * HANDLE SEND SELLER MESSAGE || POST || /api/dashboard/chat/seller/send-seller-message

const handleSendSellerMessage = async (req, res) => {
	try {
		const {id} = req;
		const {receiverId, message} = req.body;
		if (!ObjectId.isValid(id) || !ObjectId.isValid(receiverId)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid id",
			});
		}
		const sellerExist = await Seller.findOne({_id: id});
		if (!sellerExist) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Please login first",
			});
		}
		const userExist = await User.findOne({_id: receiverId});
		if (!userExist) {
			return errorResponse(res, {
				statusCode: 404,
				message: "User not found",
			});
		}

		const creteMessage = await SellerCustomerMessageModal.create({
			senderId: sellerExist._id,
			senderName: sellerExist.name,
			receiverId: userExist._id,
			receiverName: userExist.name,
			message: message,
		});

		// * User sort
		const userSortFriend = await SellerCustomer.findOne({myId: sellerExist._id});
		let sellerFriends = userSortFriend.myFriends;
		const indexUser = sellerFriends.findIndex((friend) => friend.friendId.toString() === userExist._id.toString());
		if (indexUser !== -1 && indexUser !== 0) {
			const removeFriend = sellerFriends.splice(indexUser, 1)[0];
			sellerFriends.unshift(removeFriend);
			await SellerCustomer.updateOne(
				{
					myId: sellerExist._id,
				},
				{
					myFriends: sellerFriends,
				},
			);
		}

		// * Seller sort
		const sellerSort = await SellerCustomer.findOne({myId: userExist._id});
		let userFriends = sellerSort.myFriends;
		const index = userFriends.findIndex((friend) => friend.friendId.toString() === sellerExist._id.toString());
		if (index !== -1 && index !== 0) {
			const removedFriend = userFriends.splice(index, 1)[0];
			userFriends.unshift(removedFriend);
			await SellerCustomer.updateOne({myId: userExist._id}, {$set: {myFriends: userFriends}});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Message sent successfully",
			payload: {
				message: creteMessage,
			},
		});
	} catch (e) {
		console.log(e.message, "handleSendSellerMessage");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal server error",
		});
	}
};

module.exports = {
	handleChatForGetUsers,
	handleGetUserMessages,
	handleSendSellerMessage,
};
