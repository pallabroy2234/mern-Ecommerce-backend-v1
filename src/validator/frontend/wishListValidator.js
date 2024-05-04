const {body} = require("express-validator");

const wishListValidator = [
	body("userId").trim().notEmpty().withMessage("User ID is required"),
	body("productId").trim().notEmpty().withMessage("Product ID is required"),
	body("name").trim().notEmpty().withMessage("Product name is required"),
	body("price").trim().notEmpty().withMessage("Product price is required").isNumeric().withMessage("Price must be a number"),
	body("image").notEmpty().withMessage("Product image is required"),
	body("discount").trim().notEmpty().withMessage("Product discount is required").isNumeric().withMessage("Discount must be a number"),
	body("ratting").trim().notEmpty().withMessage("Product ratting is required").isNumeric().withMessage("Ratting must be a number"),
	body("slug").trim().notEmpty().withMessage("Product slug is required"),
];

module.exports = {
	wishListValidator,
};
