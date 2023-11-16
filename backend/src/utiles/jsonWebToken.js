const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = async (data) => {
    const token = await jwt.sign(data, process.env.SECRET_KEY, {expiresIn: "7d"})
    return token
}

module.exports = {
    createToken
}