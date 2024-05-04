const {body} = require("express-validator");

const userRegisterValidator = [
	body("email").trim().notEmpty().withMessage("Enter your email address").isEmail().withMessage("Invalid email address"),
	body("password")
		.trim()
		.notEmpty()
		.withMessage("Enter your password")
		.isLength({min: 6})
		.withMessage("Password should be at least 6 characters long")
		.matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).+$/)
		.withMessage("Please enter strong password"),
	body("name")
		.trim()
		.notEmpty()
		.withMessage("Name is required")
		.isLength({min: 3})
		.withMessage("Name must be at least 3 characters")
		.matches(/^[a-zA-Z ]+$/)
		.withMessage("Name must be alphabets only"),
];

const userLoginValidator = [body("email").trim().notEmpty().withMessage("Enter your email address").isEmail().withMessage("Invalid email address")];

const userChangePasswordValidator = [
	body("oldPassword").trim().notEmpty().withMessage("Enter your old password"),
	body("newPassword")
		.trim()
		.notEmpty()
		.withMessage("Enter your new password")
		.custom((value, {req}) => {
			// Check if the old and new passwords are the same
			if (value === req.body.oldPassword) {
				throw new Error("New password must be different from old password");
			}
			return true;
		})
		.isLength({min: 6})
		.withMessage("Password should be at least 6 characters long")
		.matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).+$/)
		.withMessage("Please enter a strong password"),
];

module.exports = {
	userRegisterValidator,
	userLoginValidator,
	userChangePasswordValidator,
};
