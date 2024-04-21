const {Schema, model, Types} = require("mongoose");

const stripeSchema = new Schema(
	{
		sellerId: {
			type: Schema.Types.ObjectId,
			require: true,
		},
		stripeId: {
			type: String,
			require: true,
		},
		code: {
			type: String,
			require: true,
		},
	},
	{timestamps: true},
);

const stripeModal = model("users", stripeSchema);
module.exports = stripeModal;
