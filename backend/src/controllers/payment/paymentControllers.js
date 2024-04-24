require("dotenv").config();
const {errorResponse, successResponse} = require("../../helper/responseHelper");
const StripeModal = require("../../models/stripeModal");
const SellerModal = require("../../models/sellerModal");
const {v4: uuidv4} = require("uuid");
const mongoose = require("mongoose");
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

module.exports = {
	handleSellerConnectAccount,
	handleSellerActiveAccount,
};