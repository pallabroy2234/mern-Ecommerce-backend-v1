const {body} = require("express-validator");

const userSubmitValidator = [
	body("name").notEmpty().withMessage("User Name is required"),
	body("productId").notEmpty().withMessage("Product Id is required"),
	body("review").notEmpty().withMessage("Review is required"),
	body("ratting")
		.notEmpty()
		.withMessage("Ratting is required")
		.isNumeric()
		.withMessage("Ratting must be a number")
		.custom((value) => {
			if (value < 0 || value > 5) {
				throw new Error("Ratting must be between 0 to 5");
			}
			return true;
		}),
];

module.exports = {
	userSubmitValidator,
};
