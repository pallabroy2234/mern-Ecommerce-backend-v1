const createError = require('http-errors');
const {successResponse, errorResponse} = require("../helper/responseHelper");
const bcypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel')
const {createToken} = require("../utiles/jsonWebToken");

class authControllers {
    
    // ! admin login -> POST
    admin_login = async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const admin = await Admin.findOne({email}).select("+password")
            
            if (!admin) {
                throw createError(404, "Email not found")
            }
            const isPasswordMatch = await bcypt.compare(password, admin.password)
            
            if (!isPasswordMatch) {
                throw createError(400, "Password not match")
            }
            
            const token = await createToken({
                id: admin._id, role: admin.role,
            })
            
            res.cookie("accessToken", token, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), httpOnly: true, secure: true, sameSite: "none",
            })
            
            return successResponse(res, {
                statusCode: 200, message: "Admin login success", payload: token
            })
        } catch (error) {
            next(error)
        }
    }
    
    
    // ! GET USER -> GET
    getUser = async (req, res, next) => {
        const {id, role} = req;
        try {
            if (role === "admin") {
                const user = await Admin.findById(id)
                return successResponse(res, {
                    statusCode: 200, message: "Get user success", payload: user
                })
            } else {
                console.log("role", role)
            }
        } catch (e) {
            next(e)
        }
    }
}


module.exports = new authControllers();