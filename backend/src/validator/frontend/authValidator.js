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
    body("name").trim().notEmpty().withMessage("Name is required").isLength({min: 3}).withMessage("Name must be at least 3 characters").matches(/^[a-zA-Z ]+$/).withMessage("Name must be alphabets only")
];


const userLoginValidator = [
    body("email").trim().notEmpty().withMessage("Enter your email address").isEmail().withMessage("Invalid email address"),
];


module.exports = {
    userRegisterValidator,
    userLoginValidator
}