const {body} = require("express-validator");

const placeOrderValidator = [
	body("userId").notEmpty().withMessage("User Id is required"),
	body("price").trim().notEmpty().withMessage("Price is required").isNumeric().withMessage("Price should be a number"),
	body("shippingFee").trim().notEmpty().withMessage("Shipping Fee is required").isNumeric().withMessage("Shipping Fee should be a number"),

	// * Shipping Info
	body("shippingInfo").notEmpty().withMessage("Shipping Info is required").isObject().withMessage("Shipping Info should be an object"),
	body("shippingInfo.name").trim().notEmpty().withMessage("Name is required").isLength({min: 3}).withMessage("Name should be at least 3 characters").isString().withMessage("Name should be a string"),
	body("shippingInfo.address").trim().notEmpty().withMessage("Address is required").isLength({min: 3}).withMessage("Address should be at least 3 characters"),
	body("shippingInfo.phone").trim().notEmpty().withMessage("Phone number is required").isNumeric().withMessage("Phone number should be a number"),
	body("shippingInfo.post").trim().notEmpty().withMessage("Post code is required").isNumeric().withMessage("Post code should be a number"),
	body("shippingInfo.province").trim().notEmpty().withMessage("Province is required").isLength({min: 3}).withMessage("Province should be at least 3 characters"),
	body("shippingInfo.city").trim().notEmpty().withMessage("City is required").isLength({min: 3}).withMessage("City should be at least 3 characters"),
	body("shippingInfo.area").trim().notEmpty().withMessage("Area is required").isLength({min: 3}).withMessage("Area should be at least 3 characters"),

	// * Products
	body("products").notEmpty().withMessage("Product is required").isArray().withMessage("Products should be an array"),
	body("products.*.sellerId").notEmpty().withMessage("Seller Id is required").isString().withMessage("Seller Id should be a string"),
	body("products.*.shopName").notEmpty().withMessage("Shop Name is required").isString().withMessage("Shop Name should be a string"),
	body("products.*.price").notEmpty().withMessage("Price is required").isNumeric().withMessage("Price should be a number"),
	body("products.*.products").notEmpty().withMessage("Products is required").isArray().withMessage("Products should be an array"),
	body("products.*.products.*.cartId").notEmpty().withMessage("Cart Id is required").isString().withMessage("Cart Id should be a string"),
	body("products.*.products.*.quantity").notEmpty().withMessage("Quantity is required").isInt({min: 1}).withMessage("Set product quantity to at least 1"),
	body("products.*.products.*.productInfo").notEmpty().withMessage("Product Info is required").isObject().withMessage("Product Info should be an object"),
	body("products.*.products.*.productInfo._id").notEmpty().withMessage("Product Id is required").isString().withMessage("Product Id should be a string"),
	body("products.*.products.*.productInfo.name").notEmpty().withMessage("Product Name is required").isString().withMessage("Product Name should be a string"),
];

module.exports = {
	placeOrderValidator,
};
