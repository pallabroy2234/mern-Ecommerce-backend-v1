const Category = require("../../models/categoryModal")
const {successResponse, errorResponse} = require("../../helper/responseHelper");


const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        if (!categories) {
            return errorResponse(res, {statusCode: 404, message: "No Categories Found"})
        }
        
        return successResponse(res, {
            statusCode: 200,
            message: "categories",
            payload: categories
        })
        
    } catch (e) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Internal Server Error",
        })
    }
}


module.exports = {
    getCategories
}