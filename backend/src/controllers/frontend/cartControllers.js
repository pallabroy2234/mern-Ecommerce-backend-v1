const CartProducts = require("../../models/cartModal");
const {errorResponse, successResponse} = require("../../helper/responseHelper");


// ! HANDLE ADD TO CART

const handleAddToCart = async (req, res) => {
    try {
        const {userId, productId, quantity} = req.body;
        
        
        const product = await CartProducts.findOne({
            $and: [
                {
                    productId: {
                        $eq: productId
                    }
                },
                {
                    userId: {
                        $eq: userId
                    }
                }
            ]
        })
        
        if (product) {
            return errorResponse(res, {
                statusCode: 404,
                message: "Product already exists in cart"
            })
        }
        
        const addToCart = await CartProducts.create({
            userId,
            productId,
            quantity
        })
        
        if (!addToCart) {
            return errorResponse(res, {
                statusCode: 400,
                message: "Failed add to cart"
            })
        }
        
        
        return successResponse(res, {
            statusCode: 201,
            message: "Successfully add to cart",
        })
        
    } catch (e) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
}


// ! HANDLE TOTAL CART PRODUCTS
const handleTotalCartProducts = async (req, res) => {
    try {
        const {userId} = req.body;
        
        if (!userId) {
            return errorResponse(res, {
                statusCode: 400,
                message: "Please login first"
            })
        }
        
        const totalCartProduct = await CartProducts.countDocuments({userId: userId})
        
        
        return successResponse(res, {
            statusCode: 200,
            message: "Total Cart Products",
            payload: totalCartProduct
        })
        
    } catch (e) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
}

// ! HANDLE GET CART PRODUCTS

const handleGetCartProducts = async (req, res) => {
    try {
        const {userId} = req.params
        console.log(userId)
    } catch (e) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
}


module.exports = {
    handleAddToCart,
    handleTotalCartProducts,
    handleGetCartProducts
}