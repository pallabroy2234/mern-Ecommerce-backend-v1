const express = require("express");
const {errorResponse} = require("./helper/responseHelper");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const authRouter = require("./routes/authRouters");
const categoryRouter = require("./routes/dashboard/categoryRouters");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const sellerRouter = require("./routes/dashboard/sellerRouters");

// * ALL API MIDDLEWARE
app.use(
	cors({
		origin: /.*/,
		preflightContinue: false,
		credentials: true
	})
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// * BACKEND ROUTES
app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", require("./routes/dashboard/productRoutes"));
app.use("/api", sellerRouter);

// * Frontend route
app.use("/api/frontend", require("./routes/frontend/homeRoutes"));
app.use("/api/frontend/user", require("./routes/frontend/authRoutes"));
app.use("/api/frontend/product", require("./routes/frontend/cartRoutes"));

// * ORDER ROUTES
app.use("/api/frontend/product/order", require("./routes/order/orderRoutes"));

// * CHAT ROUTES
app.use("/api/frontend/chat", require("./routes/frontend/chatRoutes"));

// * CLOUDINARY CONFIG
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_SECRET_KEY
});

//  * Client error handle
app.use((req, res, next) => {
	// next(createError(404, "Route not found"));
	return errorResponse(res, {
		statusCode: 404,
		message: "Route not found"
	});
});

// * All Server Error Handler
app.use((err, req, res, next) => {
	console.log(err);
	if (err instanceof multer.MulterError) {
		return errorResponse(res, {
			statusCode: 500,
			message: err.message
		});
	}
	return errorResponse(res, {
		statusCode: err.status,
		message: err.message
	});
});

module.exports = app;
