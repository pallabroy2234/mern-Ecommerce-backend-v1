require("dotenv").config();
const jwt = require("jsonwebtoken");

const {errorResponse} = require("../../helper/responseHelper");


//  ! AUTH MIDDLEWARE -> CHECKS IF USER IS LOGGED IN OR NOT AND REQUEST TO SET THE ROLE AND ID IN REQ OBJECT
const authMiddleware = async (req, res, next) => {
    const cookies = req.cookies;
    if (cookies.userAuthorization) {
        try {
            const decodeToken = await jwt.verify(cookies.userAuthorization, process.env.SECRET_KEY);
            if (!decodeToken) {
                return errorResponse(res, {
                    statusCode: 401,
                    message: "Invalid access token. Please login"
                })
            }
            req.id = decodeToken.id;
            req.role = decodeToken.role;
            next();
        } catch (e) {
            // Token verification failed
            console.error("Token verification failed:", e);
            return errorResponse(res, {
                statusCode: 401,
                message: "Invalid access token. Please login"
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

// ! IS USER MIDDLEWARE -> CHECKS IF USER IS USER OR NOT

const isUser = async (req, res, next) => {
    try {
        if (req.role === "user") {
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

const isLoggedIn = async (req, res, next) => {
    try {
        const userAuthorization = req.cookies.userAuthorization;
        if (!userAuthorization) {
            return errorResponse(res, {
                statusCode: 401,
                message: "Please login first"
            })
        }
        next();
    } catch (e) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
};


const isLoggedOut = async (req, res, next) => {
    try {
        const userAuthorization = req.cookies.userAuthorization
        if (userAuthorization) {
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
    isUser,
    isLoggedOut,
    isLoggedIn
}