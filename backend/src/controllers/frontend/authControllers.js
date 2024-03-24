const {errorResponse, successResponse} = require("../../helper/responseHelper");
const User = require("../../models/userModal")
const SellerCustomer = require("../../models/chat/sellerCustomerModal")
const {createToken} = require("../../utiles/jsonWebToken");
const handleUserRegister = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        
        const userExists = await User.findOne({email})
        if (userExists) {
            return errorResponse(res, {
                status: 404,
                message: "User already exists with this email"
            })
        }
        
        const newUser = await User.create({
            name,
            email,
            password,
            method: "manually"
        })
        
        if (!newUser) {
            return errorResponse(res, {
                status: 500,
                message: "User registration failed"
            })
        }
        
        // create a chat room for the user
        
        const userId = await SellerCustomer.create({
            myId: newUser._id,
        })
        if (!userId) {
            return errorResponse(res, {statusCode: 500, message: "User registration failed"})
            
        }
        const token = await createToken({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            method: newUser.method
        })
        if (!token) {
            return errorResponse(res, {statusCode: 500, message: "User registration failed"})
        }
        
        res.cookie("userToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })
        
        console.log(newUser)
        
        return successResponse(res, {
            statusCode: 201,
            message: "Registration success",
            payload: token
        })
        
    } catch (e) {
        return errorResponse(res, {
            status: 500,
            message: e.message
        })
    }
}


module.exports = {
    handleUserRegister
}