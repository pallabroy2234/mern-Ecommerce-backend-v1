const {Schema, model} = require("mongoose");

const adminOrderModal = new Schema(
	{
		orderId: {
			type: Schema.Types.ObjectId,
			require: [true, "Order Id is required"],
		},
		sellerId: {
			type: Schema.Types.ObjectId,
			require: [true, "Seller Id is required"],
		},
		products: {
			type: Array,
			require: [true, "Products is required"],
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
			type: String,
			require: [true, "Shipping Info is required"],
		},
		deliveryStatus: {
			type: String,
			require: true,
		},
		date: {
			type: String,
			require: true,
		},
	},
	{timestamps: true},
);

const AdminOrder = model("adminOrders", adminOrderModal);

module.exports = AdminOrder;
