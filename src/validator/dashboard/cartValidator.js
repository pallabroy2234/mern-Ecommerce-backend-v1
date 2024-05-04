const {body} = require("express-validator");


const cartValidator = [
    body("userId").trim().notEmpty().withMessage("User ID is required"),
    body("productId").trim().notEmpty().withMessage("Product ID is required"),
    body("quantity").trim().notEmpty().withMessage("Quantity is required"),
];
module.exports = {
    cartValidator,
}