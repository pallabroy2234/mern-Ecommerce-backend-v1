const {errorResponse, successResponse} = require("../../helper/responseHelper");
const AdminOrder = require("../../models/adminOrderModal");
const UserOrder = require("../../models/userOrderModal");
const CartProducts = require("../../models/cartModal");
const moment = require("moment");
const {mongoose} = require("mongoose");
const {
	Types: {ObjectId},
} = mongoose;

// *** If User not payment time wise than delete cartProducts

const handlePaymentCheck = async (id) => {
	try {
		const userOrder = await UserOrder.findById(id);
		if (userOrder.paymentStatus === "unpaid") {
			const userOrder = await UserOrder.findByIdAndUpdate(id, {
				deliveryStatus: "cancelled",
			});
		}
		if (!userOrder) {
			throw new Error("User Order not found");
		}

		const adminOrder = await AdminOrder.updateMany(
			{
				orderId: id,
			},
			{
				deliveryStatus: "cancelled",
			},
		);

		if (!adminOrder) {
			throw new Error("Admin Order not found");
		}
	} catch (e) {
		return console.log(e.message);
	}
};

// * HANDLE PLACE ORDER  || POST || /api/frontend/product/order/place-order
const handlePlaceOrder = async (req, res) => {
	try {
		const {price, shippingFee, products, shippingInfo, userId} = req.body;

		let adminOrderData = [];
		let cartId = [];
		let userOrderProducts = [];
		let tempDate = moment(Date.now()).format("LLL");

		for (let i = 0; i < products.length; i++) {
			const product = products[i].products;
			for (let j = 0; j < product.length; j++) {
				let tempUserOrderProductInfo = product[j].productInfo;
				userOrderProducts.push(tempUserOrderProductInfo);
				if (product[j].cartId) {
					cartId.push(product[j].cartId);
				}
			}
		}

		// * Transfer data to Admin
		const userOrderData = await UserOrder.create({
			userId,
			shippingInfo,
			products: userOrderProducts,
			price: parseInt(price) + parseInt(shippingFee),
			deliveryStatus: "pending",
			paymentStatus: "unpaid",
			date: tempDate,
		});

		if (!userOrderData) {
			return errorResponse(res, {
				status: 400,
				message: "Place order failed",
			});
		}

		// * Transfer data to Seller

		for (let i = 0; i < products.length; i++) {
			const product = products[i].products;
			const price = products[i].price;
			const sellerId = products[i].sellerId;

			// 	* formatting Product seller wise
			let sellerProducts = [];

			for (let j = 0; j < product.length; j++) {
				let tempProducts = product[j].productInfo;
				tempProducts.quantity = product[j].quantity;
				sellerProducts.push(tempProducts);
			}

			adminOrderData.push({
				orderId: userOrderData._id,
				sellerId,
				products: sellerProducts,
				price: price,
				paymentStatus: "unpaid",
				shippingInfo: "Pallab shop, Warehouse 1, Thakurgaon",
				deliveryStatus: "pending",
				date: tempDate,
			});
		}

		// * Create Admin Order
		const adminOrder = await AdminOrder.insertMany(adminOrderData);
		if (!adminOrder) {
			return errorResponse(res, {
				status: 400,
				message: "Place order failed",
			});
		}

		// * Delete Cart
		for (let i = 0; i < cartId.length; i++) {
			const deleteCart = await CartProducts.findByIdAndDelete(cartId[i]);
			if (!deleteCart) {
				return errorResponse(res, {
					status: 400,
					message: "Delete cart product failed",
				});
			}
		}

		// * If not payment than delete cartProducts
		setTimeout(
			() => {
				handlePaymentCheck(userOrderData._id);
			},
			1000 * 60 * 3,
		);

		return successResponse(res, {
			status: 200,
			message: "Order Placed Successfully",
			payload: userOrderData,
		});
	} catch (e) {
		console.log(e.message);
		return errorResponse(res, {
			status: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

// * GET ORDERS || GET || /api/frontend/product/order/get-orders/:userId

const handleGetOrders = async (req, res) => {
	try {
		const {userId} = req.params;

		if (!userId) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Please login first",
			});
		}

		const recentOrders = await UserOrder.find({
			userId: {
				$eq: new ObjectId(userId),
			},
		})
			.sort({createdAt: -1})
			.limit(5);

		if (!recentOrders) {
			return errorResponse(res, {
				statusCode: 404,
				message: "No recent orders found",
			});
		}

		const pendingOrders = await UserOrder.find({
			userId: {
				$eq: new ObjectId(userId),
			},
			deliveryStatus: "pending",
		}).countDocuments();

		const totalOrders = await UserOrder.find({
			userId: {
				$eq: new ObjectId(userId),
			},
		}).countDocuments();

		const cancelledOrders = await UserOrder.find({
			userId: {
				$eq: new ObjectId(userId),
			},
			deliveryStatus: "cancelled",
		}).countDocuments();

		return successResponse(res, {
			statusCode: 200,
			message: "Orders Found",
			payload: {
				recentOrders,
				totalOrders,
				pendingOrders,
				cancelledOrders,
			},
		});
	} catch (e) {
		if (e instanceof mongoose.Error) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid User Id",
			});
		}
		return errorResponse(res, {
			status: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

module.exports = {
	handlePlaceOrder,
	handleGetOrders,
};
