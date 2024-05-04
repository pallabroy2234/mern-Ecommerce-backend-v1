const {Schema, model} = require("mongoose");

const adminSellerMessageSchema = new Schema(
	{
		senderId: {
			type: Schema.Types.ObjectId,
			require: true,
		},
		senderName: {
			type: String,
			require: true,
		},
		receiverId: {
			type: Schema.Types.ObjectId,
			require: true,
		},
		receiverName: {
			type: String,
			require: true,
		},
		message: {
			type: String,
			require: true,
		},
		status: {
			type: String,
			default: "unseen",
		},
	},
	{timestamps: true},
);

const SellerAdminMessages = model("sellerAdminMessages", adminSellerMessageSchema);
module.exports = SellerAdminMessages;
