const {Schema, model} = require("mongoose");

const adminSellerMessageSchema = new Schema(
	{
		senderId: {
			type: String,
			default: "",
		},
		senderName: {
			type: String,
			require: true,
		},
		receiverId: {
			type: String,
			default: "",
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
