const {body} = require("express-validator");


const categoryValidator = [
    body("name")
        .trim()
        .notEmpty().withMessage("Category Name is required")
        .isLength({ min: 2 }).withMessage("Name must be at least 2 characters long")
        .matches(/^[\w\s,'-]+$/).withMessage("Name must contain only letters"),
];
module.exports = {
    categoryValidator,
}