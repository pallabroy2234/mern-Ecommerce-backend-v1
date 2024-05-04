const {Schema, model} = require("mongoose");

const wishListSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		productId: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		discount: {
			type: Number,
			required: true,
		},
		ratting: {
			type: Number,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
	},
	{timestamps: true},
);

const WishListModal = model("wishlists", wishListSchema);
module.exports = WishListModal;
