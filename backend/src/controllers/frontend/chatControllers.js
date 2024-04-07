const {errorResponse, successResponse} = require("../../helper/responseHelper");
const {
	Types: {ObjectId},
} = require("mongoose");
const mongoose = require("mongoose");
const User = require("../../models/userModal");
const Seller = require("../../models/sellerModal");
const SellerCustomerModal = require("../../models/chat/sellerCustomerModal");
const sellerCustomerMessageModal = require("../../models/chat/sellerCustomerMessageModal");

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

module.exports = {
	handleAddFriend,
};
