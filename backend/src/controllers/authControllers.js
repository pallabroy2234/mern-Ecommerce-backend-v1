const createError = require('http-errors');
const {successResponse, errorResponse} = require("../helper/responseHelper");
const bcypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel')
const {createToken} = require("../utiles/jsonWebToken");
const Seller = require("../models/sellerModal")
const sellerCustomer = require("../models/chat/sellerCustomerModal")
const {
    publicIdWithOutExtensionFromUrl,
    deleteImageFromCloudinary,
    uploadSingleImage
} = require("../helper/cloudinaryHelper");
const {unlinkAllFilesMiddleware} = require("../utiles/upload");
const {runValidation} = require("../validator");
const {validate} = require("uuid");
const cloudinary = require("cloudinary").v2;

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
    
    
    // ! seller register -> POST
    seller_register = async (req, res, next) => {
        try {
            const {name, email, password} = req.body;
            const user = await Seller.exists({email});
            
            if (user) {
                throw createError(400, "Email already exists")
            }
            
            const seller = await Seller.create({
                name,
                email,
                password,
                method: "manually",
                shopInfo: {}
            })
            
            if (!seller) {
                throw createError(400, "Seller register failed")
            }
            
            // ! create for chat sellerCustomer
            const sellerId = await sellerCustomer.create({
                myId: seller._id,
            })
            
            if (!sellerId) {
                throw createError(400, "Seller register failed")
            }
            
            const token = await createToken({
                id: seller._id,
                role: seller.role,
            })
            if (!token) {
                throw createError(400, "Seller register failed")
            }
            
            res.cookie("accessToken", token, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: true,
                sameSite: "none",
                
            })
            
            return successResponse(res, {
                statusCode: 201,
                message: "Seller register success",
                payload: token
            })
            
        } catch (e) {
            next(e)
        }
    }
    
    
    // ! seller login -> POST
    seller_login = async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const sellerExists = await Seller.findOne({email}).select("+password");
            if (!sellerExists) {
                throw createError(404, "Email not found")
            }
            const passwordMatch = await bcypt.compare(password, sellerExists.password);
            if (!passwordMatch) {
                throw createError(400, "Password not match")
            }
            const token = await createToken({
                id: sellerExists._id,
                role: sellerExists.role,
            })
            if (!token) {
                throw createError(400, "login failed")
            }
            res.cookie("accessToken", token, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })
            return successResponse(res, {
                statusCode: 200,
                message: "Login success",
                payload: token
            })
            
        } catch (e) {
            next(e)
        }
    }
    
    // ! GET USER -> GET
    getUser = async (req, res, next) => {
        try {
            const {id, role} = req;
            if (role === "admin") {
                const admin = await Admin.findById(id)
                return successResponse(res, {
                    statusCode: 200, message: "Get user success", payload: admin
                })
            } else if (role === "seller") {
                const seller = await Seller.findById(id)
                return successResponse(res, {
                    statusCode: 200, message: "Get user success", payload: seller
                })
            }
        } catch (e) {
            next(e)
        }
    }
    
    // ! Seller Profile Image Upload -> POST
    profile_image_upload = async (req, res) => {
        try {
            const {id} = req;
            const userExists = await Seller.findOne({_id: id})
            
            if (!userExists) {
                return errorResponse(res, {statusCode: 404, message: "Please login first"})
            }
            
            const image = req.file;
            if (!image) {
                return errorResponse(res, {statusCode: 400, message: "Image is required"})
            }
            if (image.size > 1024 * 1024 * 2) {
                return errorResponse(res, {statusCode: 400, message: "Image size should be less than 2mb"})
            }
            const response = await uploadSingleImage(res, image, "multiVendor/sellerProfile")
            
            const updateSeller = await Seller.findByIdAndUpdate(id, {image: response}, {new: true})
            
            if (!updateSeller) {
                return errorResponse(res, {statusCode: 400, message: "Image upload failed"})
            }
            
            // ! delete previous image from cloudinary
            if (userExists.image) {
                const publicId = await publicIdWithOutExtensionFromUrl(userExists.image);
                await deleteImageFromCloudinary(res, publicId, "multiVendor/sellerProfile")
            }
            
            unlinkAllFilesMiddleware()
            return successResponse(res, {
                statusCode: 200,
                message: "Image upload successfully",
                payload: updateSeller
            })
            
        } catch (e) {
            return errorResponse(res, {statusCode: 500, message: "Internal Server Error"})
        }
    }

//     ! Seller Profile Info add -> POST
    profile_info_add = async (req, res) => {
        try {
            const {id} = req;
            const userExists = await Seller.exists({_id: id});
            if (!userExists) {
                return errorResponse(res, {statusCode: 404, message: "Please login first"})
            }
            const {shopName, division, district, thana} = req.body;
            
            const updateSeller = await Seller.findByIdAndUpdate(id, {
                shopInfo: {
                    shopName,
                    division,
                    district,
                    thana
                }
            }, {new: true})
            
            if (!updateSeller) {
                return errorResponse(res, {statusCode: 400, message: "Profile update failed"})
            }
            
            return successResponse(res, {
                statusCode: 200,
                message: "Profile Info add successfully",
                payload:updateSeller,
            })
        } catch (e) {
            return errorResponse(res, {statusCode: 500, message: "Internal Server Error"})
        }
    }
}


module.exports = new authControllers();