require("dotenv").config();
const {errorResponse, successResponse} = require("../../helper/responseHelper");
const StripeModal = require("../../models/stripeModal");
const SellerModal = require("../../models/sellerModal");
const SellerWalletModal = require("../../models/sellerWalletModal");
const ShopWalletModal = require("../../models/shopWalletModal");
const WithdrawRequestModal = require("../../models/withdrawRequestModal");
const {v4: uuidv4} = require("uuid");
const mongoose = require("mongoose");
const {
	Types: {ObjectId},
} = mongoose;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// * HANDLE SELLER STRIPE CONNECT ACCOUNT || GET || /api/payment/seller/connect-account

const handleSellerConnectAccount = async (req, res) => {
	try {
		const {id} = req;
		const uuid = uuidv4();

		const stripeInfo = await StripeModal.findOne({sellerId: id});
		if (stripeInfo) {
			await StripeModal.deleteOne({sellerId: id});
			const account = await stripe.accounts.create({type: "express"});
			const accountLink = await stripe.accountLinks.create({
				account: account.id,
				refresh_url: "http://localhost:5173/refresh",
				return_url: `http://localhost:5173/success?activecode=${uuid}`,
				type: "account_onboarding",
			});

			await StripeModal.create({
				sellerId: id,
				stripeId: account.id,
				code: uuid,
			});

			return successResponse(res, {
				statusCode: 201,
				message: "account create successfully",
				payload: {
					url: accountLink.url,
				},
			});
		} else {
			const account = await stripe.accounts.create({type: "express"});
			const accountLink = await stripe.accountLinks.create({
				account: account.id,
				refresh_url: "http://localhost:5173/refresh",
				return_url: `http://localhost:5173/success?activecode=${uuid}`,
				type: "account_onboarding",
			});

			await StripeModal.create({
				sellerId: id,
				stripeId: account.id,
				code: uuid,
			});

			return successResponse(res, {
				statusCode: 201,
				message: "account create successfully",
				payload: {
					url: accountLink.url,
				},
			});
		}
	} catch (e) {
		console.log(e.message, "handleSellerConnectAccount");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

// * HANDLE SELLER STRIPE ACTIVE ACCOUNT || PUT || /api/payment/seller/active-account/:activecode
const handleSellerActiveAccount = async (req, res) => {
	try {
		const {activecode} = req.params;
		const {id} = req;

		const userStripe = await StripeModal.findOne({code: activecode});

		if (!userStripe) {
			return errorResponse(res, {
				statusCode: 400,
				message: "payment account active failed",
			});
		}
		await SellerModal.findByIdAndUpdate(id, {payment: "active"});

		return successResponse(res, {
			statusCode: 200,
			message: "payment account active successfully",
		});
	} catch (e) {
		console.log(e.message, "handleSellerActiveAccount");
		if (e instanceof mongoose.Error.CastError) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid id",
			});
		}
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

// * HANDLE GET SELLER PAYMENT DETAILS || GET || /api/payment/seller/get-payment-details

const handleSellerPaymentDetails = async (req, res) => {
	try {
		const {id} = req;
		if (!ObjectId.isValid(id)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid id",
			});
		}
		const sellerExists = await SellerModal.findOne({_id: id});
		if (!sellerExists) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Please register  first",
			});
		}

		const amount = await SellerWalletModal.aggregate([
			{$match: {sellerId: new ObjectId(id)}},
			{
				$group: {
					_id: "$sellerId",
					totalAmount: {$sum: "$amount"},
				},
			},
		]);

		const pendingWithdrawAmount = await WithdrawRequestModal.aggregate([
			{
				$match: {
					$and: [
						{
							sellerId: {
								$eq: new ObjectId(id),
							},
						},
						{
							status: {
								$eq: "pending",
							},
						},
					],
				},
			},
			{
				$group: {
					_id: "$sellerId",
					pendingAmount: {$sum: "$amount"},
					pendingWithdraw: {$push: "$$ROOT"},
				},
			},
			{
				$unwind: "$pendingWithdraw",
			},
			{
				$sort: {
					"pendingWithdraw.createdAt": -1,
				},
			},
			{
				$group: {
					_id: "$_id",
					pendingAmount: {$first: "$pendingAmount"},
					pendingWithdraw: {$push: "$pendingWithdraw"},
				},
			},
		]);

		const withdrawAmount = await WithdrawRequestModal.aggregate([
			{
				$match: {
					$and: [
						{
							sellerId: {
								$eq: new ObjectId(id),
							},
						},
						{
							status: {
								$eq: "success",
							},
						},
					],
				},
			},
			{
				$group: {
					_id: "$sellerId",
					withdrawAmount: {$sum: "$amount"},
					successWithdraw: {$push: "$$ROOT"},
				},
			},
			{
				$sort: {
					"successWithdraw.createdAt": -1,
				},
			},
			{
				$unwind: "$successWithdraw",
			},
			{
				$group: {
					_id: "$_id",
					withdrawAmount: {$first: "$withdrawAmount"},
					successWithdraw: {$push: "$successWithdraw"},
				},
			},
		]);

		let availableAmount = 0;
		if (amount.length > 0) {
			availableAmount = amount[0].totalAmount - (pendingWithdrawAmount.length > 0 ? pendingWithdrawAmount[0].pendingAmount : 0) - (withdrawAmount.length > 0 ? withdrawAmount[0].withdrawAmount : 0);
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Seller Payment Details",
			payload: {
				totalAmount: amount.length > 0 ? amount[0].totalAmount : 0,
				availableAmount: availableAmount,
				withdrawAmount: withdrawAmount.length > 0 ? withdrawAmount[0].withdrawAmount : 0,
				pendingAmount: pendingWithdrawAmount.length > 0 ? pendingWithdrawAmount[0].pendingAmount : 0,
				pendingWithdraw: pendingWithdrawAmount.length > 0 ? pendingWithdrawAmount[0].pendingWithdraw : [],
				successWithdraw: withdrawAmount.length > 0 ? withdrawAmount[0].successWithdraw : [],
			},
		});
	} catch (e) {
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

// * HANDLE SEND WITHDRAW REQUEST || POST || /api/payment/seller/send-withdraw-request
const handleSendWithdrawRequest = async (req, res) => {
	try {
		const {id} = req;
		const amount = parseInt(req.body.amount);
		if (!ObjectId.isValid(id)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid id",
			});
		}
		if (amount < 0 || amount === 0) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Please provide amount",
			});
		}
		const sellerExists = await SellerModal.findOne({_id: id});
		if (!sellerExists) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Please register first",
			});
		}

		const withdraw = await WithdrawRequestModal.create({
			sellerId: new ObjectId(id),
			amount: parseInt(amount),
		});

		if (!withdraw) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Withdraw request failed",
			});
		}

		return successResponse(res, {
			statusCode: 201,
			message: "Withdraw request send successfully",
			payload: {
				withdraw: withdraw,
			},
		});
	} catch (e) {
		console.log(e.message, "handleSendWithdrawRequest");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

// * HANDLE ADMIN-SELLER'S PAYMENT REQUEST || GET || /api/payment/admin/get-payment-request

const handleAdminSellerPaymentRequest = async (req, res) => {
	try {
		const withdrawRequest = await WithdrawRequestModal.find({status: "pending"}).sort({createdAt: -1});

		return successResponse(res, {
			statusCode: 200,
			message: "Seller's payment request",
			payload: {
				withdrawRequest: withdrawRequest || [],
			},
		});
	} catch (e) {
		console.log(e.message, "handleAdminSellerPaymentRequest");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

// * HANDLE CONFIRM PAYMENT REQUEST || POST || /api/payment/admin/confirm-payment-request

const handleConfirmPaymentRequest = async (req, res) => {
	try {
		const {paymentId} = req.body;
		if (!ObjectId.isValid(paymentId)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid id",
			});
		}
		const payment = await WithdrawRequestModal.findOne({
			_id: paymentId,
			status: "pending",
		});

		if (!payment) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Payment request not found",
			});
		}

		const findStripeId = await StripeModal.findOne({sellerId: payment.sellerId});

		if (!findStripeId) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Stripe account not found",
			});
		}

		const transfer = await stripe.transfers.create({
			amount: payment.amount * 100,
			currency: "usd",
			destination: findStripeId.stripeId,
		});

		if (!transfer) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Payment transfer failed",
			});
		}

		const updatePaymentStatus = await WithdrawRequestModal.findByIdAndUpdate(paymentId, {status: "success"});
		if (!updatePaymentStatus) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Payment status update failed",
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Payment request confirm successfully",
			payload: {
				payment: updatePaymentStatus,
			},
		});
	} catch (e) {
		console.log(e.message, "handleConfirmPaymentRequest");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

module.exports = {
	handleSellerConnectAccount,
	handleSellerActiveAccount,
	handleSellerPaymentDetails,
	handleSendWithdrawRequest,
	handleAdminSellerPaymentRequest,
	handleConfirmPaymentRequest,
};
