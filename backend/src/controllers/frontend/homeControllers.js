const Category = require("../../models/categoryModal")
const Product = require("../../models/productModal")
const {successResponse, errorResponse} = require("../../helper/responseHelper");


// ! getCategories function for frontend
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


// ! format product function
//  !  const products =[
//  !     [1,2,3],
//  !     [4,5,6],
//  ! ]  like this

// const formatProduct = (products1) => {
//     const products = []
//     let temp = []
//     products1.map((item, index) => {
//         temp.push(item)
//         if (temp.length === 3) {
//             products.push(temp)
//             temp = []
//         }
//     })
//     return products
// }


// ! get products function for Feature Products
// const getProducts = async (req, res) => {
//     try {
//         // Feature Products
//         const products = await Product.find({}).limit(20).sort({createdAt: -1})
//         if (!products) {
//             return errorResponse(res, {
//                 statusCode: 404,
//                 message: "No Products Found"
//             })
//         }
//
//         //  Latest Product
//         const products1 = await Product.find({}).limit(9).sort({createdAt: -1})
//         if (!products1) {
//             errorResponse(res, {statusCode: 404, message: "No Latest Product Found"})
//         }
//         const latestProducts = formatProduct(products1)
//
//         //  Top Rated Product
//         const products2 =await Product.find({}).limit(9).sort({ratting:-1})
//         if (!products2) {
//             return errorResponse(res, {statusCode: 404, message: "No Top Rated Product Found"})
//         }
//         const topRatedProducts = formatProduct(products2)
//
//
//         return successResponse(res, {
//             statusCode: 200,
//             message: "Products",
//             payload: {
//                 featureProducts: products,
//                 latestProducts: latestProducts,
//                 topRatedProducts: topRatedProducts
//             }
//         })
//
//
//     } catch (e) {
//         return errorResponse(res, {
//             statusCode: 500,
//             message: "Internal Server Error"
//         })
//     }
// }


module.exports = {
    getCategories,

}