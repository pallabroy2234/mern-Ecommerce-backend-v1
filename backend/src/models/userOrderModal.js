const {Schema, model} = require("mongoose");

const userOrderSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			require: [true, "User Id is required"],
		},
		products: {
			type: Array,
			require: [true, "Products are required"],
		},
		price: {
			type: Number,
			require: [true, "Price is required"],
		},
		paymentStatus: {
			type: String,
			require: true,
		},
		shippingInfo: {
			type: Object,
			require: [true, "Shipping Info is required"],
		},
		deliveryStatus: {
			type: String,
			require: true,
			default: "pending",
		},
		date: {
			type: String,
			require: true,
		},
	},
	{timestamps: true},
);

const UserOrder = model("userOrders", userOrderSchema);

module.exports = UserOrder;
