const {Schema, model} = require("mongoose");

const sellerWalletSchema = new Schema(
	{
		sellerId: {
			type: Schema.Types.ObjectId,
			require: true,
		},
		amount: {
			type: Number,
			require: true,
		},
		year: {
			type: Number,
			require: true,
		},
		month: {
			type: Number,
			require: true,
		},
	},
	{timestamps: true},
);

const SellerWalletModal = model("sellerWallets", sellerWalletSchema);
module.exports = SellerWalletModal;
