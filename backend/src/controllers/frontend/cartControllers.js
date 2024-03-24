const CartProducts = require("../../models/cartModal");
const {errorResponse, successResponse} = require("../../helper/responseHelper");


// ! HANDLE ADD TO CART

const handleAddToCart = async (req, res) => {
    try {
        const {userId, productId, quantity} = req.body;
        if (!userId || !productId || !quantity) {
            return res.status(400).json({errorMessage: "Something went wrong!"})
        }
        
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
        
        console.log(addToCart)
        
        return successResponse(res, {
            statusCode: 201,
            message: "Successfully added to cart",
            payload: addToCart
        })
        
    } catch (e) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
}

module.exports = {
    handleAddToCart
}