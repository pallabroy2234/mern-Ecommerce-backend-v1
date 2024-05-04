const {Schema, model} = require("mongoose");

const shopWalletSchema = new Schema(
	{
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

const shopWalletModal = model("shopWallets", shopWalletSchema);
module.exports = shopWalletModal;
