require("dotenv").config();
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const {errorResponse} = require("../helper/responseHelper");


//  ! AUTH MIDDLEWARE -> CHECKS IF USER IS LOGGED IN OR NOT AND REQUEST TO SET THE ROLE AND ID IN REQ OBJECT
const authMiddleware = async (req, res, next) => {
    const cookies = req.cookies;
    if (cookies.accessToken) {
        try {
            const decodeToken = await jwt.verify(cookies.accessToken, process.env.SECRET_KEY);
            if (!decodeToken) {
                return errorResponse(res, {
                    statusCode: 401,
                    message: "Invalid access token. Please login"
                })
            }
            req.role = decodeToken.role;
            req.id = decodeToken.id;
            next();
        } catch (e) {
            // Token verification failed
            console.error("Token verification failed:", e);
           return  errorResponse(res,{
               statusCode:401,
               message:"Invalid access token. Please login"
           })
        }
    } else {
        // No token found in cookies
        console.error("No token found in cookies");
        return errorResponse(res, {
            statusCode: 401,
            message: "Please log in first",
        })
        
    }
};

// ! IS ADMIN MIDDLEWARE -> CHECKS IF USER IS ADMIN OR NOT
const isAdmin = async (req, res, next) => {
    try {
        if (req.role === "admin") {
            next()
        } else {
            errorResponse(res, {
                statusCode: 403,
                message: "Forbidden. You must be an admin to access this resource"
            })
        }
    } catch (e) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
};


const isSeller = async (req, res, next) => {
    try {
        if (req.role === "seller") {
            next()
        } else {
            errorResponse(res, {
                statusCode: 403,
                message: "Forbidden. You must be an seller to access this resource"
            })
        }
    } catch (e) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
};

const isLoggedOut = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken
        if (accessToken) {
            return errorResponse(res, {
                statusCode: 400,
                message: "you are already logged in"
            });
        }
        next()
    } catch (e) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
}

module.exports = {
    authMiddleware,
    isAdmin,
    isSeller,
    isLoggedOut
}