const {body} = require("express-validator");

// registration validator

const validAdmin = [
    body("email").trim().notEmpty().withMessage("Enter your email address").isEmail().withMessage("Invalid email address"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Enter your password")
        .isLength({min: 6})
        .withMessage("Password should be at least 6 characters long")
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).+$/)
        .withMessage("Please enter strong password"),];
module.exports = {
    validAdmin
}


//body("name").trim().notEmpty().withMessage("Name is required. Enter your full name").isLength({
//     min: 3, max: 31
// }).withMessage("Name must be between 3 and 31 characters"),