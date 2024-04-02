const Category = require("../../models/categoryModal");
const Product = require("../../models/productModal");
const User = require("../../models/userModal");
const ReviewModal = require("../../models/reviewModal");
const WishListModal = require("../../models/wishListModal");
const {successResponse, errorResponse} = require("../../helper/responseHelper");
const queryProducts = require("../../utiles/queryProducts");
const {
	Types: {ObjectId},
} = require("mongoose");
const moment = require("moment");

// ! getCategories function for frontend
const getCategories = async (req, res) => {
	try {
		const categories = await Category.find({});
		if (!categories) {
			return errorResponse(res, {
				statusCode: 404,
				message: "No Categories Found",
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "categories",
			payload: categories,
		});
	} catch (e) {
		return errorResponse(res, {
			statusCode: 500,
			message: "Internal Server Error",
		});
	}
};

//  ! GET FEATURE PRODUCTS

const getFeatureProducts = async (req, res) => {
	try {
		const featureProducts = await Product.find({}).limit(20).sort({createdAt: -1});
		if (!featureProducts) {
			return errorResponse(res, {
				statusCode: 404,
				message: "No Feature Products Found",
			});
		}
		return successResponse(res, {
			statusCode: 200,
			message: "Feature Products Fetch Successfully",
			payload: featureProducts,
		});
	} catch (e) {
		return errorResponse(res, {
			statusCode: 500,
			message: "Internal Server Error",
		});
	}
};
// ! format product function
//  !  const products =[
//  !     [1,2,3],
//  !     [4,5,6],
//  ! ]  like this

const formatProduct = (products1) => {
	const products = [];
	let temp = [];
	products1.map((item, index) => {
		temp.push(item);
		if (temp.length === 3) {
			products.push(temp);
			temp = [];
		}
	});
	return products;
};

// ! GET CAROUSEL LATEST PRODUCTS

const getCarouselLatestProducts = async (req, res) => {
	try {
		const products = await Product.find({}).limit(9).sort({createdAt: -1});
		if (!products) {
			errorResponse(res, {
				statusCode: 404,
				message: "No Latest Product Found",
			});
		}
		const latestProducts = formatProduct(products);

		return successResponse(res, {
			statusCode: 200,
			message: "Latest Products Fetch Successfully",
			payload: latestProducts,
		});
	} catch (e) {
		return errorResponse(res, {
			statusCode: 500,
			message: "Internal Server Error",
		});
	}
};

//  ! GET CAROUSEL PRODUCTS

const getCarouselProducts = async (req, res) => {
	try {
		//  TOP RATED PRODUCTS
		const products = await Product.find({}).limit(9).sort({ratting: -1});
		if (!products) {
			return errorResponse(res, {
				statusCode: 404,
				message: "No Top Rated Product Found",
			});
		}
		const topRatedProducts = formatProduct(products);

		//  DISCOUNT PRODUCTS
		const products1 = await Product.find({}).limit(9).sort({discount: -1});
		if (!products1) {
			return errorResponse(res, {
				statusCode: 404,
				message: "No Discount Product Found",
			});
		}
		const discountProducts = formatProduct(products1);

		return successResponse(res, {
			statusCode: 200,
			message: "Carousel Products Fetch Successfully",
			payload: {
				topRatedProducts: topRatedProducts,
				discountProducts: discountProducts,
			},
		});
	} catch (e) {
		return errorResponse(res, {
			statusCode: 500,
			message: "Internal Server Error",
		});
	}
};

// ! GET PRICE RANGE PRODUCTS

const getPriceRange = async (req, res) => {
	try {
		const priceRange = {low: 0, high: 0};

		// LOW PRICE
		const lowPrice = await Product.find({}).sort({price: 1}).limit(1);
		if (!lowPrice) {
			return errorResponse(res, {
				statusCode: 404,
				message: "No low price product found",
			});
		}
		priceRange.low = lowPrice[0].price;

		// HIGH PRICE
		const highPrice = await Product.find({}).sort({price: -1}).limit(1);
		if (!highPrice) {
			return errorResponse(res, {
				statusCode: 404,
				message: "No high price product found",
			});
		}
		priceRange.high = highPrice[0].price;

		return successResponse(res, {
			statusCode: 200,
			message: "Price Range Fetch Successfully",
			payload: priceRange,
		});
	} catch (e) {
		return errorResponse(res, {
			statusCode: 500,
			message: "Internal Server Error",
		});
	}
};

//  ! GET QUERY PRODUCTS BY CATEGORY, RATINGS, PRICE RANGE, SORT PRICE, PAGE NUMBER

const getQueryProducts = async (req, res) => {
	try {
		// const {category,ratting ,lowPrice, highPrice, sortPrice, pageNumber, parPage} = req.query

		req.query.parPage = parseInt(req.query.parPage) || 12;

		const products = await Product.find({}).sort({createdAt: -1});

		if (!products) {
			return errorResponse(res, {
				statusCode: 404,
				message: "No Products Found",
			});
		}

		const result = new queryProducts(products, req.query).categoryQuery().rattingQuery().priceRangeQuery().searchQuery().sortByPrice().skipQuery().limit().getProducts();

		// ! Here some bug NO Products Found

		if (!result) {
			return errorResponse(res, {
				statusCode: 404,
				message: "No Products Found",
			});
		}

		const totalProduct = new queryProducts(products, req.query).categoryQuery().priceRangeQuery().rattingQuery().searchQuery().sortByPrice().countProducts().getProducts();

		if (totalProduct < 0) {
			return errorResponse(res, {
				statusCode: 404,
				message: "No Products Found",
			});
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
					nextPage: nextPage,
				},
			},
		});
	} catch (e) {
		errorResponse(res, {
			statusCode: 500,
			message: "Internal Server Error",
		});
	}
};

// * HANDLE GET PRODUCT DETAILS || GET || /api/frontend/get-product/details/:slug

const handleGetProductDetails = async (req, res) => {
	try {
		const {slug} = req.params;
		if (!slug) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Slug is not provided",
			});
		}
		const product = await Product.findOne({slug: slug});
		if (!product) {
			return errorResponse(res, {
				statusCode: 404,
				message: "No Product Found",
			});
		}

		const relatedProducts = await Product.find({
			$and: [
				{
					sellerId: {
						$ne: product.sellerId,
					},
				},
				{
					category: {
						$eq: product.category,
					},
				},
			],
		})
			.sort({createdAt: -1})
			.limit(20);

		if (!relatedProducts) {
			return errorResponse(res, {
				statusCode: 404,
				message: "No Related Products Found",
			});
		}

		const moreProducts = await Product.find({
			$and: [
				{
					_id: {
						$ne: product._id,
					},
				},
				{
					sellerId: {
						$eq: product.sellerId,
					},
				},
			],
		})
			.sort({createdAt: -1})
			.limit(3);

		if (!moreProducts) {
			return errorResponse(res, {
				statusCode: 404,
				message: "No More Products Found",
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Product Details Fetch Successfully",
			payload: {
				product: product,
				relatedProducts: relatedProducts,
				moreProducts: moreProducts,
			},
		});
	} catch (e) {
		console.log(e.message, "handleGetProductDetails");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

// * HANDLE SUBMIT USER REVIEW || POST || /api/frontend/submit-user-review
const handleSubmitReview = async (req, res) => {
	try {
		const {userId} = req;
		const {name, review, ratting, productId} = req.body;
		if (!ObjectId.isValid(userId) || !ObjectId.isValid(productId)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid  Id",
			});
		}
		const userExists = await User.findById(userId);
		if (!userExists) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Please Login First",
			});
		}
		const productExists = await Product.findById(productId);

		if (!productExists) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Invalid Product",
			});
		}

		// * CHECK REVIEW EXISTS OR NOT
		// const reviewExists = await ReviewModal.find({
		// 	$and: [
		// 		{
		// 			userId: userId,
		// 		},
		// 		{
		// 			productId: productId,
		// 		},
		// 	],
		// });
		// if (reviewExists.length > 2) {
		// 	return errorResponse(res, {
		// 		statusCode: 400,
		// 		message: "You already review this product",
		// 	});
		// }

		const reviewData = await ReviewModal.create({
			userId: userId,
			productId: productId,
			name: name,
			ratting: ratting,
			review: review,
			date: moment(Date.now()).format("LL"),
		});
		if (!reviewData) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Review Not Submitted",
			});
		}

		let totalProductRatting = 0;
		let averageRatting = 0;
		const totalProductReviews = await ReviewModal.find({productId: productId});
		for (let i = 0; i < totalProductReviews.length; i++) {
			totalProductRatting = totalProductRatting + totalProductReviews[i].ratting;
		}
		if (totalProductReviews.length > 0) {
			averageRatting = parseInt(totalProductRatting / totalProductReviews.length).toFixed(1);
		}

		// 	* UPDATE PRODUCT RATINGS
		const updateProduct = await Product.findByIdAndUpdate({_id: productId}, {ratting: averageRatting}, {new: true});
		if (!updateProduct) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Product Ratting Not Updated",
			});
		}
		// * UPDATE WISHLIST RATINGS
		const updateWishlist = await WishListModal.findOneAndUpdate(
			{
				$and: [
					{
						userId: {
							$eq: userId,
						},
					},
					{
						productId: {
							$eq: productId,
						},
					},
				],
			},
			{
				ratting: averageRatting,
			},
		);
		if (!updateWishlist) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Wishlist Ratting Not Updated",
			});
		}

		return successResponse(res, {
			statusCode: 201,
			message: "Review Submitted Successfully",
		});
	} catch (e) {
		console.log(e.message, "handleSubmitReview");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

module.exports = {
	getCategories,
	getFeatureProducts,
	getCarouselLatestProducts,
	getCarouselProducts,
	getPriceRange,
	getQueryProducts,
	handleGetProductDetails,
	handleSubmitReview,
};
