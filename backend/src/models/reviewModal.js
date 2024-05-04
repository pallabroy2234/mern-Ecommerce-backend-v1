const {Schema, model} = require("mongoose");

const reviewSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: [true, "User Id is required"],
		},
		productId: {
			type: Schema.Types.ObjectId,
			required: [true, "Product Id is required"],
		},
		name: {
			type: String,
			required: [true, "User Name is required"],
			trim: true,
		},
		ratting: {
			type: Number,
			required: true,
			default: 0,
		},
		review: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
	},
	{timestamps: true},
);

const ReviewModal = model("reviews", reviewSchema);
module.exports = ReviewModal;
