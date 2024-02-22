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



//  ! GET FEATURE PRODUCTS

const getFeatureProducts = async (req,res) => {
    try {
        const featureProducts =await Product.find({}).limit(20).sort({createdAt:-1})
        if(!featureProducts){
            return errorResponse(res, {
                statusCode: 404,
                message: "No Feature Products Found"
            })
        }
        return successResponse(res, {
            statusCode: 200,
            message: "Feature Products Fetch Successfully",
            payload: featureProducts
        })
    
    }catch (e) {
        return errorResponse(res, {
            statusCode:500,
            message: "Internal Server Error"
        })
    }
}





// ! format product function
//  !  const products =[
//  !     [1,2,3],
//  !     [4,5,6],
//  ! ]  like this

const formatProduct = (products1) => {
    const products = []
    let temp = []
    products1.map((item, index) => {
        temp.push(item)
        if (temp.length === 3) {
            products.push(temp)
            temp = []
        }
    })
    return products
}

// ! get products function for Feature Products
const getHomePageProduct = async (req, res) => {
    try {
        // Feature Products
        const featureProducts = await Product.find({}).limit(20).sort({createdAt: -1})
        if (!featureProducts) {
            return errorResponse(res, {
                statusCode: 404,
                message: "No Products Found"
            })
        }
        
        //  Latest Product
        const products1 = await Product.find({}).limit(9).sort({createdAt: -1})
        if (!products1) {
            errorResponse(res, {statusCode: 404, message: "No Latest Product Found"})
        }
        const latestProducts = formatProduct(products1)
        
        //  Top Rated Product
        const products2 =await Product.find({}).limit(9).sort({ratting:-1})
        if (!products2) {
            return errorResponse(res, {statusCode: 404, message: "No Top Rated Product Found"})
        }
        const topRatedProducts = formatProduct(products2)
        
        // Discount Product
        const products3 = await Product.find({}).limit(9).sort({discount: -1})
        if (!products3) {
            return errorResponse(res, {statusCode: 404, message: "No Discount Product Found"})
        }
        const discountProducts = formatProduct(products3)
        
        
        return successResponse(res, {
            statusCode: 200,
            message: "Products fetch successfully",
            payload: {
                featureProducts: featureProducts,
                latestProducts: latestProducts,
                topRatedProducts: topRatedProducts,
                discountProducts: discountProducts
            }
        })
        
    } catch (e) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
}




// ! get price range and latest product

const getPriceRangeLatestProduct = async (req,res)=> {
    try {
     
        const priceRange = {
            low  : 0,
            high:0,
        }
        
        const products =await Product.find({}).limit(9).sort({createdAt:-1})
        if(!products){
            return  errorResponse(res, {statusCode: 404, message: "No Products Found"})
        }
        const latestProducts = formatProduct(products)
        
        const price = await Product.find({}).sort({price:1}).limit(1)
        priceRange.low = price[0].price
        
        const price1 = await Product.find({}).sort({price:-1}).limit(1)
        priceRange.high = price1[0].price
        
        
        
        
        return successResponse(res, {
            statusCode: 200,
            message: "Price Range and Latest Product Fetch Successfully",
            payload: {
                priceRange: priceRange,
                latestProducts: latestProducts
            }
        })
        
        
        
        
    }catch (e) {
     return errorResponse(res, {
         statusCode: 500,
         message: "Internal Server Error"
     
     })
    }
}



module.exports = {
    getCategories,
    getFeatureProducts,
    getHomePageProduct,
    getPriceRangeLatestProduct
}