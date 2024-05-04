const {body} = require("express-validator");

// registration validator

const sellerValidRegister = [
    body("name").trim().notEmpty().withMessage("Enter your name").isLength({min: 3}).withMessage("Name must be at least 3 characters"),
    body("email").trim().notEmpty().withMessage("Enter your email address").isEmail().withMessage("Invalid email address"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Enter your password")
        .isLength({min: 6})
        .withMessage("Password should be at least 6 characters long")
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).+$/)
        .withMessage("Please enter strong password"),
    
];

const sellerValidLogin = [
    body("email").trim().notEmpty().withMessage("Enter your email address").isEmail().withMessage("Invalid email address"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Enter your password")
        .isLength({min: 6})
        .withMessage("Password should be at least 6 characters long")
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).+$/)
        .withMessage("Please enter strong password"),

];



const sellerProfileAddValidator = [
    body("shopName").trim().notEmpty().withMessage("Enter your shop name").isLength({min:3}).withMessage("Shop name must be at least 3 characters"),
     body("division").trim().notEmpty().withMessage("Enter your division").isLength({min:3}).withMessage("Division must be at least 3 characters"),
    body("district").trim().notEmpty().withMessage("Enter your district").isLength({min:3}).withMessage("District must be at least 3 characters"),
    body("thana").trim().notEmpty().withMessage("Enter your thana").isLength({min:3}).withMessage("Thana must be at least 3 characters"),
];

module.exports = {
    sellerValidRegister,
    sellerValidLogin,
    sellerProfileAddValidator
}

