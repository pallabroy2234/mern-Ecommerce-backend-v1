const {errorResponse, successResponse} = require("../../helper/responseHelper");
const User = require("../../models/userModal");
const SellerCustomer = require("../../models/chat/sellerCustomerModal");
const {createToken} = require("../../utiles/jsonWebToken");
const bcrypt = require("bcrypt");
const {
	Types: {ObjectId},
} = require("mongoose");

//  ! HANDLE USER REGISTER
const handleUserRegister = async (req, res) => {
	try {
		const {name, email, password} = req.body;

		const userExists = await User.findOne({email});
		if (userExists) {
			return errorResponse(res, {
				status: 404,
				message: "User already exists with this email",
			});
		}

		const newUser = await User.create({
			name,
			email,
			password,
			method: "manually",
		});

		if (!newUser) {
			return errorResponse(res, {
				status: 500,
				message: "User registration failed",
			});
		}

		// create a chat room for the user

		const userId = await SellerCustomer.create({
			myId: newUser._id,
		});
		if (!userId) {
			return errorResponse(res, {statusCode: 500, message: "User registration failed"});
		}

		return successResponse(res, {
			statusCode: 201,
			message: "Registration success",
		});
	} catch (e) {
		return errorResponse(res, {
			status: 500,
			message: e.message,
		});
	}
};

const handleUserLogin = async (req, res) => {
	try {
		const {email, password} = req.body;

		const userExists = await User.findOne({email}).select("+password");

		if (!userExists) {
			return errorResponse(res, {statusCode: 404, message: "Register first"});
		}

		const isPasswordMatch = await bcrypt.compare(password, userExists.password);

		if (!isPasswordMatch) {
			return errorResponse(res, {statusCode: 404, message: "Wrong password"});
		}

		const token = await createToken({
			id: userExists._id,
			name: userExists.name,
			email: userExists.email,
			role: userExists.role,
		});

		if (!token) {
			return errorResponse(res, {statusCode: 400, message: "Login failed"});
		}

		res.cookie("userAuthorization", token, {
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
			httpOnly: true,
			secure: true,
			sameSite: "strict",
		});

		return successResponse(res, {
			statusCode: 200,
			message: "Login success",
			payload: token,
		});
	} catch (e) {
		return errorResponse(res, {
			status: 500,
			message: "Internal Server Error",
		});
	}
};

// * HANDLE LOGOUT || GET || /api/frontend/user/user-logout

const handleUserLogout = async (req, res) => {
	try {
		res.cookie("userAuthorization", null, {
			expires: new Date(Date.now()),
			httpOnly: true,
		});

		return successResponse(res, {
			statusCode: 200,
			message: "Logout success",
		});
	} catch (e) {
		console.log(e.message, "handleUserLogout");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

// * HANDLE CHANGE PASSWORD || POST || /api/frontend/user/change-password

const handleChangePassword = async (req, res) => {
	try {
		const {userId} = req;
		const {oldPassword, newPassword} = req.body;
		if (!ObjectId.isValid(userId)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid  id",
			});
		}

		const userExists = await User.findById(userId).select("+password");

		if (!userExists) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Please login first",
			});
		}

		const isPasswordMatch = await bcrypt.compare(oldPassword, userExists.password);
		if (!isPasswordMatch) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Old password is not correct",
			});
		}

		const updatePassword = await User.findByIdAndUpdate(userId, {
			password: newPassword,
		});

		return successResponse(res, {
			statusCode: 200,
			message: "Password updated successfully",
		});
	} catch (e) {
		console.log(e.message, "handleChangePassword");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

module.exports = {
	handleUserRegister,
	handleUserLogin,
	handleUserLogout,
	handleChangePassword,
};
