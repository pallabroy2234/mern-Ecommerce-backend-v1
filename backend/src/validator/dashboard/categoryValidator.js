const {body} = require("express-validator");



const categoryValidator = [
    body("name").trim().notEmpty().withMessage("Enter Category Name").isLength({min:2}),
    body("image").notEmpty().withMessage("Select Category Image"),
    
    ]

module.exports = {
    categoryValidator
}