const {errorResponse, successResponse} = require("../../helper/responseHelper");
const AdminOrder = require("../../models/adminOrderModal");
const UserOrder = require("../../models/userOrderModal");
const User = require("../../models/userModal");
const CartProducts = require("../../models/cartModal");
const ShopWalletModal = require("../../models/shopWalletModal");
const SellerWalletModal = require("../../models/sellerWalletModal");
const moment = require("moment");
const {mongoose} = require("mongoose");
const {
	Types: {ObjectId},
} = mongoose;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
				tempUserOrderProductInfo.quantity = product[j].quantity;
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

			console.log(price);
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

// * HANDLE GET RECENT ORDERS || GET || /api/frontend/product/order/get-recentOrders/:userId
const handleGetRecentOrders = async (req, res) => {
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

// * HANDLE GET MY ORDERS || GET || /api/frontend/product/order/get-myOrders/:userId/:deliveryStatus

const handleGetMyOrders = async (req, res) => {
	try {
		const {userId, status} = req.params;
		if (!userId) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Please login first",
			});
		}

		let orders = [];

		if (status !== "all") {
			orders = await UserOrder.find({userId: userId, deliveryStatus: status}).sort({createdAt: -1});
		} else {
			orders = await UserOrder.find({userId: userId}).sort({createdAt: -1});
		}

		if (orders.length === 0) {
			return errorResponse(res, {
				statusCode: 404,
				message: "No orders found",
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Orders Found",
			payload: orders,
		});
	} catch (e) {
		return errorResponse(res, {
			status: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

// * HANDLE GET ORDER DETAILS || GET || /api/frontend/product/order/get-orderDetails/:orderId
const handleGetOrderDetails = async (req, res) => {
	try {
		const {orderId} = req.params;
		const {userId} = req;

		const userExist = await User.exists({_id: userId});

		if (!userExist) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Please login first",
			});
		}

		if (!orderId) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Invalid Order Id",
			});
		}

		// * Find Order Details
		const orderDetails = await UserOrder.findById({
			_id: orderId,
			userId: userId,
		});

		if (!orderDetails) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Order not found",
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Order Found",
			payload: orderDetails,
		});
	} catch (e) {
		if (e instanceof mongoose.Error) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Invalid Order Id",
			});
		}
		return errorResponse(res, {
			status: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

// *** HANDLE CREATE PAYMENT || POST || /api/frontend/product/order/create-payment

const handleCreatePayment = async (req, res) => {
	try {
		const {price} = req.body;
		if (!price) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Price is required",
			});
		}

		const payment = await stripe.paymentIntents.create({
			amount: parseInt(price) * 100,
			currency: "usd",
			automatic_payment_methods: {
				enabled: true,
			},
		});

		if (!payment) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Payment failed",
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Payment created successfully",
			payload: payment.client_secret,
		});
	} catch (e) {
		console.log(e.message, "handleCreatePayment");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

// *** HANDLE CONFIRM PAYMENT || GET || /api/frontend/product/order/confirm-payment/:orderId

const handleConfirmPayment = async (req, res) => {
	try {
		const {orderId} = req.params;
		if (!ObjectId.isValid(orderId)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid Order Id",
			});
		}

		const userOrder = await UserOrder.findByIdAndUpdate(orderId, {
			paymentStatus: "paid",
			deliveryStatus: "pending",
		});
		if (!userOrder) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Order not found",
			});
		}

		const adminOrderUpdate = await AdminOrder.updateMany(
			{orderId: new ObjectId(orderId)},
			{
				paymentStatus: "paid",
				deliveryStatus: "pending",
			},
		);
		if (!adminOrderUpdate) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Order not found",
			});
		}

		const userOrders = await UserOrder.findById(orderId);
		const adminOrders = await AdminOrder.find({orderId: new ObjectId(orderId)});
		const time = moment(Date.now()).format("l");
		const splitTime = time.split("/");
		// * SHOP WALLET
		const shopWallet = await ShopWalletModal.create({
			amount: userOrders.price,
			year: splitTime[2],
			month: splitTime[0],
		});

		// 	* SELLER WALLET
		for (let i = 0; i < adminOrders.length; i++) {
			await SellerWalletModal.create({
				sellerId: adminOrders[i].sellerId,
				amount: adminOrders[i].price,
				year: splitTime[2],
				month: splitTime[0],
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Payment confirmed successfully",
		});
	} catch (e) {
		console.log(e.message, "handleConfirmPayment");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

module.exports = {
	handlePlaceOrder,
	handleGetRecentOrders,
	handleGetMyOrders,
	handleGetOrderDetails,
	handleCreatePayment,
	handleConfirmPayment,
};
