const {body} = require("express-validator");


const addProductValidator = [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({min: 2}).withMessage("Name must be at least 2 characters long"),
    body("brand").trim().notEmpty().withMessage("Brand is required").isLength({min: 2}).withMessage("Brand must be at least 2 characters long"),
    body("category").trim().notEmpty().withMessage("Category is required"),
    body("stock").trim().notEmpty().withMessage("Stock is required"),
    body("price").trim().notEmpty().withMessage("Price is required"),
    body("description").trim().notEmpty().withMessage("Description is required").isLength({min: 10}).withMessage("Description must be at least 10 characters long"),
    body("price").trim().notEmpty().withMessage("Price is required"),
    body("discount").trim().notEmpty().withMessage("Discount is required"),
   body("images").custom((value, {req}) => {
        if (!req.files || req.files.length === 0) {
            throw new Error("Image is required");
        }
        return true;
    }),
    // body("shopName").trim().notEmpty().withMessage("Shop name is required"),


]

module.exports = {
    addProductValidator
}





































