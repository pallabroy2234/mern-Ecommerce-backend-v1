const Category = require("../../models/categoryModal")
const Product = require("../../models/productModal")
const {successResponse, errorResponse} = require("../../helper/responseHelper");
const queryProducts = require("../../utiles/queryProducts")
const {isHexColor} = require("validator");

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

const getFeatureProducts = async (req, res) => {
    try {
        const featureProducts = await Product.find({}).limit(20).sort({createdAt: -1})
        if (!featureProducts) {
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
        
    } catch (e) {
        return errorResponse(res, {
            statusCode: 500,
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


// ! GET CAROUSEL LATEST PRODUCTS

const getCarouselLatestProducts = async (req, res) => {
    try {
        const products = await Product.find({}).limit(9).sort({createdAt: -1})
        if (!products) {
            errorResponse(res, {statusCode: 404, message: "No Latest Product Found"})
        }
        const latestProducts = formatProduct(products)
        
        
        return successResponse(res, {
            statusCode: 200,
            message: "Latest Products Fetch Successfully",
            payload: latestProducts
        })
        
    } catch (e) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
}


//  ! GET CAROUSEL PRODUCTS

const getCarouselProducts = async (req, res) => {
    try {
        
        //  TOP RATED PRODUCTS
        const products = await Product.find({}).limit(9).sort({ratting: -1})
        if (!products) {
            return errorResponse(res, {statusCode: 404, message: "No Top Rated Product Found"})
        }
        const topRatedProducts = formatProduct(products)
        
        
        //  DISCOUNT PRODUCTS
        const products1 = await Product.find({}).limit(9).sort({discount: -1})
        if (!products1) {
            return errorResponse(res, {statusCode: 404, message: "No Discount Product Found"})
        }
        const discountProducts = formatProduct(products1)
        
        
        return successResponse(res, {
            statusCode: 200,
            message: "Carousel Products Fetch Successfully",
            payload: {
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


// ! GET PRICE RANGE PRODUCTS

const getPriceRange = async (req, res) => {
    try {
        const priceRange = {low: 0, high: 0}
        
        // LOW PRICE
        const lowPrice = await Product.find({}).sort({price: 1}).limit(1)
        if (!lowPrice) {
            return errorResponse(res, {statusCode: 404, message: "No low price product found"})
        }
        priceRange.low = lowPrice[0].price
        
        // HIGH PRICE
        const highPrice = await Product.find({}).sort({price: -1}).limit(1)
        if (!highPrice) {
            return errorResponse(res, {statusCode: 404, message: "No high price product found"})
        }
        priceRange.high = highPrice[0].price
        
        return successResponse(res, {
            statusCode: 200,
            message: "Price Range Fetch Successfully",
            payload: priceRange
        })
        
    } catch (e) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
}


//  ! GET QUERY PRODUCTS BY CATEGORY, RATINGS, PRICE RANGE, SORT PRICE, PAGE NUMBER

const getQueryProducts = async (req, res) => {
    try {
        // const {category,ratting ,lowPrice, highPrice, sortPrice, pageNumber, parPage} = req.query
        
        const products = await Product.find({}).sort({createdAt: -1})
        if (!products) {
            return errorResponse(res, {statusCode: 404, message: "No Products Found"})
        }
        
        req.query.parPage = parseInt(req.query.parPage) || 10
        
        
        const totalProduct = new queryProducts(products, req.query).categoryQuery().priceRangeQuery().rattingQuery().sortByPrice().countProducts().getProducts()
        
        if (totalProduct === 0) {
            return errorResponse(res, {
                statusCode: 404,
                message: "No Products Found"
            })
        }
        

        
        const result = new queryProducts(products, req.query).categoryQuery().rattingQuery().priceRangeQuery().sortByPrice().skipQuery().limit().getProducts()
        
        if (!result) {
            return errorResponse(res, {
                statusCode: 404,
                message: "No Products Found"
            })
        }
        
        // PAGINATION
        const totalPages = Math.ceil(totalProduct / parseInt(req.query.parPage));
        const currentPage = parseInt(req.query.pageNumber) || 1;
        const previousPage = currentPage - 1 > 0 ? currentPage - 1 : null;
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        
        return successResponse(res, {
            statusCode: 200,
            message: "Query Products Fetch Successfully",
            payload: {
                products: result,
                pagination: {
                    parPage: parseInt(req.query.parPage),
                    totalProduct: totalProduct,
                    totalPages: totalPages,
                    currentPage: currentPage,
                    previousPage: previousPage,
                    nextPage: nextPage
                }
            }
        })
        
    } catch (e) {
        errorResponse(res, {
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
}


module.exports = {
    getCategories,
    getFeatureProducts,
    getCarouselLatestProducts,
    getCarouselProducts,
    getPriceRange,
    getQueryProducts,
    
}