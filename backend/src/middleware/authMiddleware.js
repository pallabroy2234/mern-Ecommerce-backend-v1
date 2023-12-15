require("dotenv").config();
const jwt = require("jsonwebtoken");
const createError = require("http-errors");



const authMiddleware = async (req, res, next) => {
    const cookies = req.cookies;
    if (cookies.accessToken) {
        try {
            const decodeToken = await jwt.verify(cookies.accessToken, process.env.SECRET_KEY);
            req.role = decodeToken.role;
            req.id = decodeToken.id;
            
            next();
        } catch (e) {
            // Token verification failed
            console.error("Token verification failed:", e);
           throw createError(401, "Login first");
        }
    } else {
        // No token found in cookies
        console.error("No token found in cookies");
        res.status(401).json({ error: "Please log in first" });
    }
};

module.exports = {
    authMiddleware
}