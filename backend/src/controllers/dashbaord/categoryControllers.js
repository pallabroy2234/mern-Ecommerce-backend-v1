require("dotenv").config();
const {successResponse, errorResponse} = require("../../helper/responseHelper");
const slugify = require("slugify")
const Category = require("../../models/categoryModal");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

class categoryControllers {
// ! add category -> POST
    
    
    add_category = async (req, res, next) => {
        try {
            const {name} = req.body;
            const image = req.file;
            if (!image) return errorResponse(res, {statusCode: 400, message: "Image is required"})
            const slug = slugify(name, {lower: true})
            
            const slugExists = await Category.exists({slug})
            
            if (slugExists) {
                return errorResponse(res, {statusCode: 400, message: "Category already exists"})
            }
            let imageLink;
            let imageId;
            try {
                const result = await cloudinary.uploader.upload(image.path, {folder: "categories"})
                if (!result) {
                    return errorResponse(res, {statusCode: 400, message: "Image upload failed"})
                }
                imageLink = result.url;
                imageId = result.public_id;
                
            } catch (e) {
                return errorResponse(res, {statusCode: 400, message: "Image upload failed"})
            } finally {
                try {
                    const filepath = image.path;
                    fs.unlinkSync(filepath);
                    console.log("Image deleted successfully")
                } catch (unlinkError) {
                    console.error("Error unlinking image:", unlinkError);
                }
            }
            const category = await Category.create({
                name,
                image: imageLink,
                imageId,
                slug,
            })
            
            return successResponse(res, {statusCode: 201, message: "Category added successfully", payload: category})
            
        } catch (e) {
            return errorResponse(res, {
                statusCode: 500,
                message: "Something went wrong"
            })
        }
    }

// ! get all categories -> GET
    get_category = async (req, res, next) => {
        try {
            const {page, parPage, searchValue} = req.query;
            let skipPage = "";
            if(parPage && page){
                skipPage = (parseInt(page) - 1) * parseInt(parPage)
            }
            if (searchValue && page && parPage) {
                const categories = await Category.find({
                    name: {$regex: searchValue, $options: "i"}
                }).skip(skipPage).limit(parseInt(parPage)).sort({createdAt: -1})
                
                const totalCategories = await Category.find({
                    name: {$regex: searchValue, $options: "i"}
                }).countDocuments()
                
                return successResponse(res, {statusCode: 200, payload: {categories, totalCategories}})
            }else if(searchValue === "" && page && parPage) {
                const categories = await Category.find({}).skip(skipPage).limit(parseInt(parPage)).sort({createdAt: -1})
                const totalCategories = await Category.find({}).countDocuments()
                return successResponse(res, {statusCode: 200, payload: {categories, totalCategories}})
            }
            else {
                const categories = await Category.find({}).sort({createdAt: -1})
                const totalCategories = await Category.find({}).countDocuments()
                return successResponse(res, {statusCode: 200, payload: {categories, totalCategories}})
            }
            
        } catch (e) {
            return errorResponse(res, {
                statusCode: 500,
                message: "Something went wrong"
            })
        }
        
    }
}


module.exports = new categoryControllers();