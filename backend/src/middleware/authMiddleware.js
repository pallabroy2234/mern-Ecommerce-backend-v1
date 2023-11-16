require("dotenv").config();
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const authMiddleware = async (req, res, next) => {
    const {accessToken} = req.cookies;
    if (!accessToken) {
        throw createError(401, "Please Login first")
    } else {
        try {
            const decodeToken = await jwt.verify(accessToken, process.env.SECRET_KEY)
            req.role = decodeToken.role;
            req.id = decodeToken.id;
            next()
        } catch (e) {
            throw createError(409, "Please Login first")
        }
    }
    
}

module.exports = {
    authMiddleware
}