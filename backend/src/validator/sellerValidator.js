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



module.exports = {
    sellerValidRegister,
    sellerValidLogin
}

