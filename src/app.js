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

let allowedOrigins = [];

if (process.env.NODE_ENV === 'development') {
    // Development environment
    allowedOrigins = [process.env.CLIENT_USER_LOCAL_URL, process.env.CLIENT_DASHBOARD_LOCAL_URL];
} else if (process.env.NODE_ENV === 'production') {
    // Production environment
    allowedOrigins = [process.env.CLIENT_USER_PRODUCTION_URL, process.env.CLIENT_DASHBOARD_PRODUCTION_URL];
}


// * CORS middleware configuration
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error("The CORS policy for this site does not allow access from the specified origin."), false);
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: false,
};

app.use(cors(corsOptions));

// * Additional CORS configuration for all routes
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// Use CORS middleware with dynamic allowed origins
// app.use(cors({
//     // origin: function (origin, callback) {
//     //     // allow requests with no origin (like mobile apps or curl requests)
//     //     if (!origin) return callback(null, true);
//     //     if (allowedOrigins.indexOf(origin) === -1) {
//     //         let msg = "The CORS policy for this site does not allow access from the specified Origin.";
//     //         return callback(new Error(msg), false);
//     //     }
//     //     return callback(null, true);
//     // },
//     origin: function (origin, callback) {
//         // Check if the request origin is in the allowedOrigins array
//         if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true); // Allow the request
//         } else {
//             callback(new Error("The CORS policy for this site does not allow access from the specified origin."), false);
//         }
//     },
//     // origin: /.*/,
//     credentials: true,
//     optionsSuccessStatus: 200,
//     preflightContinue: false,
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


app.get("/", (req, res) => {
    res.send("Welcome to the E-commerce API");
})

// * BACKEND ROUTES
app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", require("./routes/dashboard/productRoutes"));
app.use("/api", sellerRouter);

// * DASHBOARD ROUTES
app.use("/api/dashboard/chat/seller", require("./routes/dashboard/sellerChatRoutes"));
app.use("/api/dashboard/order/", require("./routes/dashboard/orderRoutes"));
app.use("/api/dashboard/banner", require("./routes/dashboard/bannerRouters"));

// * DASHBOARD INDEX ROUTES FOR ADMIN AND SELLER ALSO
app.use("/api/dashboard", require("./routes/dashboard/dashboardRoutes"));

// * PAYMENT ROUTES
app.use("/api/payment/", require("./routes/payment/paymentRoutes"));

// * Frontend route
app.use("/api/frontend", require("./routes/frontend/homeRoutes"));
app.use("/api/frontend/user", require("./routes/frontend/authRoutes"));
app.use("/api/frontend/product", require("./routes/frontend/cartRoutes"));
app.use("/api/frontend/banner", require("./routes/frontend/bannerRoutes"));

// * ORDER ROUTES
app.use("/api/frontend/product/order", require("./routes/order/orderRoutes"));

// * SELLER CHAT ROUTES
app.use("/api/frontend/chat", require("./routes/frontend/chatRoutes"));

// * ADMIN CHAT ROUTES
app.use("/api/dashboard/chat/admin", require("./routes/dashboard/adminChatRoutes"));

// * CLOUDINARY CONFIG
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
});

//  * Client error handle
app.use((req, res, next) => {
    // next(createError(404, "Route not found"));
    return errorResponse(res, {
        statusCode: 404,
        message: "Route not found",
    });
});

// * All Server Error Handler
app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof multer.MulterError) {
        return errorResponse(res, {
            statusCode: 500,
            message: err.message,
        });
    }
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message,
    });
});

module.exports = app;
