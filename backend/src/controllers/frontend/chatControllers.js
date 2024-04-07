const {errorResponse, successResponse} = require("../../helper/responseHelper");
const {
	Types: {ObjectId},
} = require("mongoose");
const mongoose = require("mongoose");
const User = require("../../models/userModal");
const Seller = require("../../models/sellerModal");
const SellerCustomerModal = require("../../models/chat/sellerCustomerModal");
const SellerCustomerMessageModal = require("../../models/chat/sellerCustomerMessageModal");

// * HANDLE ADD FRIEND || POST || /api/frontend/chat/add-friend
const handleAddFriend = async (req, res) => {
	try {
		const {userId} = req;
		const {sellerId} = req.body;

		const userExists = await User.findOne({_id: userId});
		if (!userExists) {
			return errorResponse(res, {
				status: 404,
				message: "User does not exist",
			});
		}

		if (sellerId !== "" && sellerId !== null && sellerId !== undefined) {
			const sellerExists = await Seller.findOne({_id: sellerId});
			const checkSeller = await SellerCustomerModal.findOneAndUpdate(
				{
					myId: userId,
				},
				{
					$addToSet: {
						// * Using $addToSet to avoid adding duplicate friendId
						myFriends: {
							friendId: new ObjectId(sellerId),
							sellerName: sellerExists?.name,
							shopName: sellerExists?.shopInfo?.shopName,
							image: sellerExists?.image,
						},
					},
				},
				{
					upsert: true, //* Create a new document if not found
					new: true, // Return the updated document
				},
			);

			const checkUser = await SellerCustomerModal.findOneAndUpdate(
				{
					myId: sellerId,
				},
				{
					$addToSet: {
						//* Using $addToSet to avoid adding duplicate friendId
						myFriends: {
							friendId: new ObjectId(userId),
							userName: userExists?.name,
							image: userExists?.image || "",
						},
					},
				},
				{
					upsert: true, //* Create a new document if not found
					new: true, //* Return the updated document
				},
			);

			const messages = await SellerCustomerModal.find({
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
									$eq: new ObjectId(userId),
								},
							},
						],
					},
					{
						$and: [
							{
								senderId: {
									$eq: new ObjectId(userId),
								},
							},
							{
								receiverId: {
									$eq: new ObjectId(sellerId),
								},
							},
						],
					},
				],
			});

			const myFriends = await SellerCustomerModal.findOne({
				myId: userId,
			});
			const currentFriend = await SellerCustomerModal.aggregate([
				{
					$match: {myId: userId},
				},
				{
					$unwind: "$myFriends",
				},
				{
					$match: {"myFriends.friendId": new ObjectId(sellerId)},
				},
				{
					$replaceRoot: {newRoot: "$myFriends"},
				},
				{
					$limit: 1,
				},
			]);

			return successResponse(res, {
				statusCode: 200,
				message: "ok",
				payload: {
					myFriends,
					currentFriend: currentFriend[0],
				},
			});
		} else {
			const myFriends = await SellerCustomerModal.findOne({
				myId: userId,
			});

			return successResponse(res, {
				statusCode: 200,
				message: "ok",
				payload: {
					myFriends,
				},
			});
		}
	} catch (e) {
		console.log(e.message, "handleAddFriend");
		return errorResponse(res, {
			status: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

//  * HANDLE SEND MESSAGE TO SELLER || POST || /api/frontend/chat/send-message-to-seller

const handleSendMessageToSeller = async (req, res) => {
	try {
		const {userId} = req;
		const {receiverId, message} = req.body;
		console.log(message, "message");
		if (!ObjectId.isValid(userId) || !ObjectId.isValid(receiverId)) {
			return errorResponse(res, {
				status: 400,
				message: "Invalid  id",
			});
		}
		const userExists = await User.findOne({_id: userId});
		if (!userExists) {
			return errorResponse(res, {
				status: 404,
				message: "Please login first",
			});
		}
		const sellerExists = await Seller.findOne({_id: receiverId});
		if (!sellerExists) {
			return errorResponse(res, {
				status: 404,
				message: "Seller does not exist",
			});
		}

		const creteMessage = await SellerCustomerMessageModal.create({
			senderId: userId,
			senderName: userExists.name,
			receiverId: receiverId,
			receiverName: sellerExists.name,
			message: message,
		});

		// 	* Sort message friend list
		// const userSellerSortFriend = await SellerCustomerModal.findOne({
		// 	myId: userId,
		// });
		//
		// let myFriends = userSellerSortFriend.myFriends;
		// let index = myFriends.findIndex((friend) => friend.friendId.toString() === receiverId.toString());
		// while (index > 0) {
		// 	let temp = myFriends[index];
		// 	myFriends[index] = myFriends[index - 1];
		// 	myFriends[index - 1] = temp;
		// 	index--;
		// }

		// * Seller sort
		const userSellerSortFriend = await SellerCustomerModal.findOne({myId: userId});

		// Extract the array of myFriends
		let myFriends = userSellerSortFriend.myFriends;

		// Find the index of the friend to be moved
		const index = myFriends.findIndex((friend) => friend.friendId.toString() === receiverId.toString());

		// If the friend is found and it's not already at the beginning of the array
		if (index !== -1 && index !== 0) {
			// Remove the friend from its current position
			const removedFriend = myFriends.splice(index, 1)[0];

			// Add the friend back to the beginning of the array
			myFriends.unshift(removedFriend);

			// Update the document in the database
			await SellerCustomerModal.updateOne({myId: userId}, {$set: {myFriends: myFriends}});
		}

		// * User sort
		const sellerUserSortFriend = await SellerCustomerModal.findOne({myId: receiverId});
		let sellerFriends = sellerUserSortFriend.myFriends;
		const indexUser = sellerFriends.findIndex((friend) => friend.friendId.toString() === userId.toString());
		if (indexUser !== -1 && indexUser !== 0) {
			const removeFriend = sellerFriends.splice(indexUser, 1)[0];
			sellerFriends.unshift(removeFriend);
			await SellerCustomerModal.updateOne(
				{
					myId: receiverId,
				},
				{
					myFriends: sellerFriends,
				},
			);
		}

		return successResponse(res, {
			statusCode: 200,
			message: "ok",
			payload: {
				message: creteMessage,
			},
		});
	} catch (e) {
		console.log(e.message, "handleSendMessageToSeller");
		return errorResponse(res, {
			status: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

module.exports = {
	handleAddFriend,
	handleSendMessageToSeller,
};
