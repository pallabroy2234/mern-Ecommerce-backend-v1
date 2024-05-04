const {Schema, model} = require("mongoose");

const withdrawRequestSchema = new Schema(
	{
		sellerId: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			default: "pending",
		},
	},
	{timestamps: true},
);

const WithdrawRequestModal = model("withdrawRequests", withdrawRequestSchema);
module.exports = WithdrawRequestModal;
